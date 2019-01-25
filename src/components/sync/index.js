import { isArray } from "lodash-es";
import item from "./sync.css";
import test from "../common/test.js";
console.log("async引用", test.version);
const sync = function() {
  console.log("sync");
  fetch("/api/test")
    .then(response => response.json())
    .then(data => {
      console.log("fetch结果", data.message);
    });
  setTimeout(function() {
    document.getElementById("app").innerHTML = `<h1 class="${
      item.test
    }">Webpack</h1></h1>`;
  }, 2000);
};
const isArrayFun = function(args) {
  console.log(isArray(args));
};
export { sync, isArrayFun };
