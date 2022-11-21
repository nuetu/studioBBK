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
      <img class="aiKnob selector" id="kn${i}" src="dial.svg" alt="Audio Interface volume dial" onClick="rotateKnob(${i})" style="transform: rotate(-150deg);"/>
      <div class="aiBar" id="br${i}"></div>
      <div>
         <button id="btn${i}" class="aiPhantom" onClick="clickPhantom(${i})"></button><span class="pha">48V</span>
      </div>
    </div>`;
}

function rotateKnob(i) {
  const knob = document.getElementById("kn" + i);
  let centerX = knob.offsetLeft + knob.offsetWidth / 2;
  let centerY = knob.offsetTop + knob.offsetHeight / 2;
  const end = (5 / 6) * Math.PI;
  knob.addEventListener("mousemove", (event) => {
    rotate(event);
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
    } else if (theta > end) {
      theta = end;
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
  }
}
function clickPhantom(i) {
  const button = document.getElementById(`btn${i}`);
  button.classList.toggle("aiPhantom");
  button.classList.toggle("btnActive");
  button.nextElementSibling.classList.toggle("phaRed");
}
