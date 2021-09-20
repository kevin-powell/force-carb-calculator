const inputs = document.querySelectorAll("input");
const pressureInput = document.querySelector("#pressure");
const tempInput = document.querySelector("#temp");
const timeInput = document.querySelector("#time");
const output = document.querySelector("output");

inputs.forEach((input) => {
  input.oninput = outputResult;
});

function outputResult() {
  // get the values for each input
  const pa = pressureInput.value;
  const e = Math.E;
  const temp = tempInput.value;
  const t = timeInput.value;
  
  const result = ((0.17*pa*(1 - e ** (-0.014*t)))+3.04)* e ** ((0.0006 * Math.log(pa * (1 - e **(-0.014 * t)))-0.02) * temp);

  output.innerHTML = result.toFixed(2);
}

outputResult();