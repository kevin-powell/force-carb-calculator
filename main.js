const inputs = document.querySelectorAll("input");
const pressureInput = document.querySelector("#pressure");
const tempInput = document.querySelector("#temp");
const timeInput = document.querySelector("#time");
const output = document.querySelector("output");
const unitToggleContainer = document.querySelector(".unit-toggle");
const unitToggleButton = unitToggleContainer.querySelector("button");
const celInput = unitToggleContainer.querySelector("#cel");
const fahInput = unitToggleContainer.querySelector("#fah");

unitToggleButton.addEventListener("click", toggleUnit);
celInput.addEventListener("click", toggleUnit(e));
fahInput.addEventListener("click", toggleUnit(e));

inputs.forEach((input) => {
  validateInput(input);
  input.oninput = outputResult;
});

function setInitialValues() {
  pressureInput.value = localStorage.getItem("pressure") ?? 12;
  tempInput.value = localStorage.getItem("temp") ?? 36;
  timeInput.value = localStorage.getItem("time") ?? 120;
  // celInput.checked = localStorage.getItem("cel") === "true" ?? true;
}

function storeUserValues() {
  localStorage.setItem("pressure", pressureInput.value);
  localStorage.setItem("temp", tempInput.value);
  localStorage.setItem("time", timeInput.value);
  // localStorage.setItem("cel", celInput.checked);
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
  let temp = tempInput.value;
  const t = timeInput.value;

  if (celInput.checked) {
    temp = toFahrenheit(temp);
  }

  const result =
    (0.17 * pa * (1 - e ** (-0.014 * t)) + 3.04) *
    e ** ((0.0006 * Math.log(pa * (1 - e ** (-0.014 * t))) - 0.02) * temp);

  storeUserValues();
  output.innerHTML = result.toFixed(2);
}

function toggleUnit(e) {
  e.preventDefault;
  const currentTemp = tempInput.value;
  const unitLabel = document.querySelector("[data-unit]");

  if (celInput.checked) {
    fahInput.checked = true;
    tempInput.value = toFahrenheit(currentTemp);
    unitToggleButton.setAttribute("aria-label", "switch to Celsius");
    unitLabel.innerHTML = "F";
  } else {
    celInput.checked = true;
    tempInput.value = toCelsius(currentTemp);
    unitToggleButton.setAttribute("aria-label", "switch to Fahrenheit");
    unitLabel.innerHTML = "C";
  }

  storeUserValues();
}

function toCelsius(value) {
  const result = (value - 32) * (5 / 9);
  return result.toFixed(2);
}

function toFahrenheit(value) {
  const result = (value * 9) / 5 + 32;
  return result.toFixed(2);
}

setInitialValues();
outputResult();
