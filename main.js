const inputEls = document.querySelectorAll("input");
const pressureEl = document.querySelector("#pressure");
const timeEl = document.querySelector("#time");
const tempEl = document.querySelector("#temp");
const resultEl = document.querySelector(".result span");
const formula = (e,Pa,t,T) => ((0.17*Pa*(1-e**(-0.014*t)))+3.04)*e**((0.0006*Math.log(Pa*(1-e**(-0.014*t)))-0.02)*T);

inputEls.forEach(inputEl =>{
    inputEl.addEventListener("keyup", calculate);
    inputEl.addEventListener("change", calculate);
}) 

init();
function init(){
    if(getLocalStorage()){
        const {pressure, time, temp} = getLocalStorage();
        pressureEl.value = pressure;
        timeEl.value = time;
        tempEl.value = temp;
    }
    calculate()
}

function calculate(){
    const e = Math.exp(1);
    const pressure = pressureEl.value;
    const time = timeEl.value;
    const temp = tempEl.value;
    const result = formula(e,pressure,time,temp).toFixed(2);
    resultEl.innerText = result;
    setLocalStorage(pressure,time,temp)
}

function setLocalStorage(pressure,time,temp){
    const fcc = { pressure, time, temp }
    window.localStorage.setItem('fcc', JSON.stringify(fcc));
}

function getLocalStorage(){
    return JSON.parse(window.localStorage.getItem('fcc'));
}
