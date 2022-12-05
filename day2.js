// import data from "./day2-data.js";

/**
 * OPPONENT
 * a = rock
 * b = paper
 * c = scissors
 *
 * PLAYER
 * rock = 1
 * paper = 2
 * scissors = 3
 *
 * OUTCOME
 * x = lose
 * y = draw
 * z = win
 *
 * OUTCOME POINTS
 * loss = 0
 * draw = 3
 * win = 6
 *
 */

const score_outcome = {
  Z: 6,
  Y: 3,
  X: 0
};

// const score_shape = {
//   X: 1,
//   Y: 2,
//   Z: 3
// };

const score_choice = {
  A: {
    X: 3,
    Y: 1,
    Z: 2
  },
  B: {
    X: 1,
    Y: 2,
    Z: 3
  },
  C: {
    X: 2,
    Y: 3,
    Z: 1
  }
};

function runGames(rounds) {
  let score = 0;

  rounds.forEach((round) => {
    const choice_score = score_choice[round[0]][round[1]];
    const outcome_score = score_outcome[round[1]];
    const round_score = choice_score + outcome_score;
    score += round_score;
  });

  return score;
}

const result = runGames(data);
console.log(result);
