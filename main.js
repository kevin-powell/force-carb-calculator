const inputs = document.querySelectorAll("input");
const pressureInput = document.querySelector("#pressure");
const tempInput = document.querySelector("#temp");
const timeInput = document.querySelector("#time");
const output = document.querySelector("output");

function handleInput(evt) {
  const input = evt.target;

  if(input.validity.valid) {
    localStorage.setItem(input.name, input.value);
    outputResult();
  }
  else {
    input.value = localStorage.getItem(input.name) ?? input.getAttribute("value");
  }
}

function outputResult() {
  const pa = pressureInput.value;
  const e = Math.E;
  const temp = tempInput.value;
  const t = timeInput.value;

  const result =
    (0.17 * pa * (1 - e ** (-0.014 * t)) + 3.04) *
    e ** ((0.0006 * Math.log(pa * (1 - e ** (-0.014 * t))) - 0.02) * temp);

  output.textContent = result.toFixed(2);
}


inputs.forEach(input => {
  input.value = localStorage.getItem(input.name) ?? input.getAttribute("value");
  input.oninput = handleInput;
});

outputResult();