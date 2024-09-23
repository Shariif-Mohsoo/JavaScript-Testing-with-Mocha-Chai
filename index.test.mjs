import assert from "assert";
import methods from "./index.mjs";
import chalk from "chalk";
const { forEach, map } = methods;
// const test = (desc, fn) => {
//   console.log(chalk.bold.greenBright("--------", desc, "------"));
//   try {
//     fn();
//   } catch (err) {
//     console.log(chalk.bold.redBright(err.message));
//   }
// };

//USING THE mocha testing library
it("The forEach function test", () => {
  let sum = 0;
  forEach([1, 2, 3], (value) => {
    sum += value;
  });
  //   if (sum !== 6) console.log("Expected sum array is equal to six");
  // best alternative is
  assert.strictEqual(sum, 6, "Expected forEach to sum an array");
});

it("The map function function", () => {
  const arr = map([1, 2, 3], (value) => {
    return value * 2;
  });
  //   if (arr[0] !== 2) throw new Error(`Expected to get 2 but get ${arr[0]}`);
  //   if (arr[1] !== 4) throw new Error(`Expected to get 4 but get ${arr[1]}`);
  //   if (arr[2] !== 6) throw new Error(`Expected to get 6 but get ${arr[2]}`);
  // TODO: BEST ALTERNATIVE
  assert.deepStrictEqual(arr, [2, 4, 6]);
});
