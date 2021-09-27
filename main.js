const inputs = document.querySelectorAll("input");
const pressureInput = document.querySelector("#pressure");
const tempInput = document.querySelector("#temp");
const timeInput = document.querySelector("#time");
const output = document.querySelector("output");

inputs.forEach((input) => {
  validateInput(input);
  input.oninput = outputResult;
});

function setInitialValues() {
  pressureInput.value = localStorage.getItem("pressure") ?? 12;
  tempInput.value = localStorage.getItem("temp") ?? 36;
  timeInput.value = localStorage.getItem("time") ?? 120;
}

function storeUserValues() {
  localStorage.setItem("pressure", pressureInput.value);
  localStorage.setItem("temp", tempInput.value);
  localStorage.setItem("time", timeInput.value);
}

function validateInput(input) {
  input.addEventListener("beforeinput", function (e) {
    let beforeValue = input.value;
    e.target.addEventListener(
      "input",
      function () {
        if (input.validity.badInput) {
          input.value = beforeValue;
        }
      },
      { once: true }
    );
  });
}

function outputResult() {
  const pa = pressureInput.value;
  const e = Math.E;
  const temp = tempInput.value;
  const t = timeInput.value;

  const result =
    (0.17 * pa * (1 - e ** (-0.014 * t)) + 3.04) *
    e ** ((0.0006 * Math.log(pa * (1 - e ** (-0.014 * t))) - 0.02) * temp);

  storeUserValues();
  output.innerHTML = result.toFixed(2);
}

setInitialValues();
outputResult();
