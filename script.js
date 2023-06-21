// Let's go

const operation = document.querySelector(".operations-line");
const result = document.querySelector(".result-line");
const clearBtn = document.querySelector(".clear-btn");
const deleteBtn = document.querySelector(".delete-btn");
const numbers = document.querySelectorAll(".number-btn");
const symbols = document.querySelectorAll(".symbol-btn");
const equal = document.querySelector(".equal-btn");
const dot = document.querySelector(".dot-btn");

let operator = "";

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    if (!result.innerText.length) {
      operation.innerText += number.innerText;
    }
    if (result.innerText.length) {
      if (!operator.length) {
        return;
      }
      if (
        operation.innerText
          .split("")
          .some((i) => ["/", "+", "-", "x"].includes(i))
      ) {
        operation.innerText += number.innerText;
      } else {
        operation.innerText = result.innerText + operator + number.innerText;
      }
    }
  });
});

symbols.forEach((symbol) => {
  symbol.addEventListener("click", (e) => {
    if (!operation.innerText.length && symbol.innerText !== "-") {
      return;
    }
    if (
      operation.innerText
        .split("")
        .some((i) => ["/", "+", "-", "x"].includes(i))
    ) {
      handleEqual();
    }
    if (!result.innerText.length) {
      operation.innerText += `${symbol.innerText}`;
    }
    if (result.innerText.length) {
      console.log("result?");
      operation.innerText = result.innerText + symbol.innerText;
    }

    operator = symbol.innerText;
    console.log(operator);
  });
});

equal.addEventListener("click", (e) => {
  handleEqual();
  operator = "";
});

dot.addEventListener("click", (e) => {
  if (
    operation.innerText.split("").some((i) => ["/", "+", "-", "x"].includes(i))
  ) {
    console.log(operation.innerText);
    let lastNumberArr = operation.innerText.split(/[-+/x]/);
    let lastNumber =
      operation.innerText.split(/[-+/x]/)[lastNumberArr.length - 1];
    console.log("lastNum", lastNumber);
    if (lastNumber.includes(".")) {
      return;
    } else {
      operation.innerText += ".";
    }
  } else {
    if (operation.innerText.includes(".")) {
      return;
    } else {
      operation.innerText += ".";
    }
  }
});

function handleEqual() {
  if (!operation.innerText.length) {
    return;
  }
  const twoNumbers = operation.innerText.split(/[-+/x]/);
  console.log("two numbers", twoNumbers);

  if (operator === "+") {
    console.log("in +");
    result.innerText = Number(twoNumbers[0]) + Number(twoNumbers[1]);
  } else if (operator === "-") {
    console.log("in -");
    result.innerText = Number(twoNumbers[0]) - Number(twoNumbers[1]);
  } else if (operator === "x") {
    console.log("in x");
    result.innerText = Number(twoNumbers[0]) * Number(twoNumbers[1]);
  } else if (operator === "/") {
    console.log("in /");
    if (Number(twoNumbers[1]) === 0) {
      alert("cannot divide by 0");
      return;
    }
    result.innerText = Number(twoNumbers[0] / Number(twoNumbers[1]));
  }
}

clearBtn.addEventListener("click", (e) => {
  operator = "";
  operation.innerText = "";
  result.innerText = "";
});

deleteBtn.addEventListener("click", () => {
  if (operator === "") {
    return;
  }
  operation.innerText = operation.innerText.slice(0, -1);
});
