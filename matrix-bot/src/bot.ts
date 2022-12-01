import sdk from 'matrix-js-sdk';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';

dotenv.config();

const USER_ID = process.env.USER_ID || 'adventbot';
const AOC_SESSION = process.env.AOC_SESSION;
const AOC_STATS_URI = process.env.AOC_STATS_URI;
const MATRIX_ACCESS_TOKEN = process.env.MATRIX_ACCESS_TOKEN;
const MATRIX_HOMESERVER = process.env.MATRIX_HOMESERVER;

const client = sdk.createClient({
  baseUrl: MATRIX_HOMESERVER!,
  accessToken: MATRIX_ACCESS_TOKEN,
  userId: USER_ID,
});

client.on("RoomMember.membership", async (event:any, member:any) => {
  if (member.membership === "invite" && member.userId === USER_ID) {
    await client.joinRoom(member.roomId);
    console.log("Auto-joined %s", member.roomId);
  }
});

type Stats = Record<string, Record<number, number>>;

let lastStats: Stats = {}; 

async function main() {

  lastStats = await getStats();
  setInterval(checkNewStats, 900*1000);
  await checkNewStats();

}
main().catch( err => console.error(err) );

async function checkNewStats() {

  const newStats = await getStats();

  for(const [name, dayPoints] of Object.entries(newStats)) {

    for(const [day, points] of Object.entries(dayPoints) as any) {

      if (lastStats[name] === undefined || lastStats[name][day] !== points) {
        await sendMessage(`${name} has just obtained ${points == 1 ? 'silver' : 'gold'} on Day ${day}`);
      }

    }

  }
  
  lastStats = newStats;

}

async function sendMessage(msg: string) {

  for(const roomId of (await client.getJoinedRooms()).joined_rooms) {

    await client.sendEvent(roomId, "m.room.message", {
      body: msg,
      msgtype: 'm.text',
    });
    break;

  }

}

async function getStats() {

  const members: Stats= {};
  const response = await fetch(AOC_STATS_URI!, {
    headers: {
      'Cookie': `session=${AOC_SESSION}`
    }
  });
  const json = await response.json();

  for(const member of Object.values(json.members) as any) {
    members[member.name] = {};
    for(const [dayNum, points] of Object.entries(member.completion_day_level) as any) {
      members[member.name][dayNum] = 2 in points ? 2 : 1;
    }

  }

  return members;

}
