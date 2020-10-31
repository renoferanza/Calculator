getHistory = () => {
  return document.querySelector("#history-value").innerText;
};

printHistory = (num) => {
  document.querySelector("#history-value").innerText = num;
};

getOutput = () => {
  return document.querySelector("#output-value").innerText;
};

printOutput = (num) => {
  num === ""
    ? (document.querySelector("#output-value").innerText = num)
    : (document.querySelector("#output-value").innerText = getFormattedNumber(
        num
      ));
};

getFormattedNumber = (num) => {
  if (num === "-") {
    return "";
  }
  let n = Number(num);
  let value = n.toLocaleString();
  return value;
};

reverseNumberFormat = (num) => {
  return Number(num.replace(/,/g, ""));
};

let operator = document.getElementsByClassName("operator");

for (let operatorValue of operator) {
  operatorValue.addEventListener("click", function () {
    if (this.id === "clear") {
      // saat menekan C
      printHistory("");
      printOutput("");
    } else if (this.id === "backspace") {
      // saat menekan CE
      let output = reverseNumberFormat(getOutput()).toString();
      if (output) {
        //if output has a value
        output = output.substr(0, output.length - 1);
        printOutput(output);
      }
    } else {
      // memulai perhitungan
      let output = getOutput();
      let history = getHistory();
      if (output === "" && history !== "") {
        // kalau ga masukin nilai setelah operator
        if (isNaN(history[history.length - 1])) {
          history = history.substr(0, history.length - 1);
        }
      }
      if (output !== "" || history !== "") {
        output = output === "" ? output : reverseNumberFormat(output);
        history = history + output;
        if (this.id === "=") {
          // calculate result
          let result = eval(history);
          printOutput(result);
          printHistory("");
        } else {
          history = history + this.id;
          printHistory(history);
          printOutput("");
        }
      }
    }
  });
}

let number = document.getElementsByClassName("number");
for (let numberValue of number) {
  numberValue.addEventListener("click", function () {
    let output = reverseNumberFormat(getOutput());
    if (output != NaN) {
      //if output is a number
      output = output + this.id;
      printOutput(output);
    }
  });
}
