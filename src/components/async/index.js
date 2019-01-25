import test from "../common/test.js";
console.log("async引用", test.version);
const asynctest = {
  init() {
    console.log("test");
  }
};
export default asynctest;
