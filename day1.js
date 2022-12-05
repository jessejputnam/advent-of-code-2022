"use strict";

const data = require("./day1-data");

function findElfWithMostCalories(elves) {
  let first = 0;
  let second = 0;
  let third = 0;

  for (let elf of elves) {
    const calories = elf.reduce((acc, cur) => acc + Number(cur), 0);

    if (calories < third) {
      continue;
    } else if (calories < second) {
      third = calories;
    } else if (calories < first) {
      third = second;
      second = calories;
    } else {
      third = second;
      second = first;
      first = calories;
    }
  }

  return first + second + third;
}

console.log(findElfWithMostCalories(data));
