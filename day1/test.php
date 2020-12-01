<?php

$input = file('./foo.txt');

$numbers = [];
foreach($input as $line) {
  $numbers[] = trim($line, "\n");
}

foreach($numbers as $n1) {

  foreach($numbers as $n2) {

    foreach($numbers as $n3) {

      if ($n1 + $n2 + $n3 === 2020) {
        echo "$n1 $n2 $n3 ", ($n1 * $n2 * $n3), "\n";
      }

    }

  }

}
