const inputs = document.querySelectorAll("#main-controls input");
const pressureInput = document.querySelector("#pressure");
const tempInput = document.querySelector("#temp");
const timeInput = document.querySelector("#time");
const output = document.querySelector("output");
const unitToggleContainer = document.querySelector(".unit-toggle");
const unitToggleButton = unitToggleContainer.querySelector("button");
const unitToggleLabels = unitToggleContainer.querySelectorAll("label");
// const celInputLabel = unitToggleContainer.querySelector('[for="cel"]');
// const fahInputLabel = unitToggleContainer.querySelector('[for="fah"]');
const celInput = unitToggleContainer.querySelector("#cel");
const fahInput = unitToggleContainer.querySelector("#fah");
const unitLabel = document.querySelector("[data-unit]");

inputs.forEach((input) => {
  validateInput(input);
  input.oninput = outputResult;
});

unitToggleButton.addEventListener("click", toggleButton);

celInput.addEventListener("change", toggleUnit);
fahInput.addEventListener("change", toggleUnit);

function setInitialValues() {
  pressureInput.value = localStorage.getItem("pressure") ?? 12;
  tempInput.value = localStorage.getItem("temp") ?? 36;
  timeInput.value = localStorage.getItem("time") ?? 120;
  celInput.checked = localStorage.getItem("cel") ?? false;

  if (celInput.checked) {
    unitLabel.innerText = "(C)";
  }
}

function storeUserValues() {
  localStorage.setItem("pressure", pressureInput.value);
  localStorage.setItem("temp", tempInput.value);
  localStorage.setItem("time", timeInput.value);
  if (celInput.checked === true) {
    localStorage.setItem("cel", celInput.checked);
  } else {
    localStorage.removeItem("cel");
  }
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
    temp = unitsToFahrenheit(temp);
  }

  const result =
    (0.17 * pa * (1 - e ** (-0.014 * t)) + 3.04) *
    e ** ((0.0006 * Math.log(pa * (1 - e ** (-0.014 * t))) - 0.02) * temp);

  storeUserValues();
  output.innerText = result.toFixed(2);
}

function toggleUnit(e) {
  const currentTemp = tempInput.value;

  if (celInput.checked) {
    labelsToCelsius();
    tempInput.value = unitsToCelsius(currentTemp);
  } else if (fahInput.checked) {
    labelsToFahrenheit();
    tempInput.value = unitsToFahrenheit(currentTemp);
  }
  storeUserValues();
}

function toggleButton() {
  const currentTemp = tempInput.value;
  if (celInput.checked) {
    fahInput.checked = true;
    labelsToFahrenheit();
    tempInput.value = unitsToFahrenheit(currentTemp);
  } else if (fahInput.checked) {
    celInput.checked = true;
    labelsToCelsius();
    tempInput.value = unitsToCelsius(currentTemp);
  }
  storeUserValues();
}

function unitsToCelsius(value) {
  const result = (value - 32) * (5 / 9);
  return result.toFixed(2);
}

function unitsToFahrenheit(value) {
  const result = (value * 9) / 5 + 32;
  return result.toFixed(2);
}

function labelsToCelsius() {
  unitToggleButton.setAttribute("aria-label", "switch to Fahrenheit");
  unitLabel.innerText = "(C)";
}

function labelsToFahrenheit() {
  unitToggleButton.setAttribute("aria-label", "switch to Celsius");
  unitLabel.innerText = "(F)";
}

setInitialValues();
outputResult();
