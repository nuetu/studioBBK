var main = document.getElementById("main");
main.innerHTML = `
<link rel="stylesheet" href="audioInterface.css" />
<div id="audioInterface">
</div>
  `;
var ai = document.getElementById("audioInterface");
for (let i = 0; i < 4; i++) {
  ai.innerHTML += `
    <div class="aiSection" id="ai${i}">
      <img class="aiKnob selector" id="kn${i}" src="dial.svg" alt="Audio Interface volume dial" onmouseover="rotateKnob(${i})" style="transform: rotate(-150deg);"/>
      <div class="aiBar" id="br${i}"></div>
      <div>
         <button id="btn${i}" class="aiPhantom" onClick="clickPhantom(${i})"></button><span class="pha">48V</span>
      </div>
    </div>`;
}
ai.innerHTML += '<div id="master"></div>';
var thetaTot = [];
function rotateKnob(i) {
  const knob = document.getElementById("kn" + i);
  let centerX = knob.offsetLeft + knob.offsetWidth / 2;
  let centerY = knob.offsetTop + knob.offsetHeight / 2;
  const end = (5 / 6) * Math.PI;
  knob.addEventListener("mousedown", (event) => {
    knob.onmousemove = function (e) {
      rotate(e);
    };
  });
  knob.addEventListener("mouseup", function (e) {
    knob.onmousemove = null;
  });
  function rotate(e) {
    var theta = 0;
    if (e.clientX - centerX > 0) {
      theta =
        Math.atan((e.clientY - centerY) / (e.clientX - centerX)) + Math.PI / 2;
    } else if (e.clientX - centerX < 0) {
      theta =
        Math.atan((e.clientY - centerY) / (e.clientX - centerX)) - Math.PI / 2;
    } else if (e.clientX - centerX == 0 && e.clientY - centerY > 0) {
      theta = Math.PI;
    }
    if (theta < -1 * end) {
      theta = -1 * end;
      knob.onmousemove = null;
    } else if (theta > end) {
      theta = end;
      knob.onmousemove = null;
    }
    knob.style.transform = `rotate(${theta}rad)`;
    var val = Math.round(((theta + end) / (end + end)) * 100);
    const bar = document.getElementById("br" + i);
    bar.style.background =
      "linear-gradient(0deg, #d540e8 0%, #40dae8 " +
      val +
      "%, rgba(0,0,0,0) " +
      val +
      "%)";
    thetaTot[i] = val;
    setMaster();
  }
}
function clickPhantom(i) {
  const button = document.getElementById(`btn${i}`);
  button.classList.toggle("aiPhantom");
  button.classList.toggle("btnActive");
  button.nextElementSibling.classList.toggle("phaRed");
  setMaster();
}

function setMaster() {
  var thetaTotVal = 0;
  const master = document.getElementById("master");
  for (let i in thetaTot) {
    if (document.getElementById(`btn${i}`).classList.contains("btnActive")) {
      thetaTotVal += thetaTot[i];
    }
  }
  thetaTotVal = thetaTotVal / 4;
  if (thetaTotVal < 50) {
    master.style.background =
      "linear-gradient(0deg, #60e840 " +
      thetaTotVal +
      "%, rgba(0,0,0,0) " +
      thetaTotVal +
      "%)";
  } else if (thetaTotVal >= 50 && thetaTotVal < 80) {
    master.style.background =
      "linear-gradient(0deg, #60e840 50%, #e8c740 " +
      thetaTotVal +
      "%, rgba(0,0,0,0) " +
      thetaTotVal +
      "%)";
  } else {
    master.style.background =
      "linear-gradient(0deg, #60e840 50%, #e8c740 80%, #e84040 " +
      thetaTotVal +
      "%, rgba(0,0,0,0) " +
      thetaTotVal +
      "%)";
  }
}
