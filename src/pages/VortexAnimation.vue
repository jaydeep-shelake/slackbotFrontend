<template>
  <canvas id="myCanvas" style="border: 1px solid #c3c3c3; color: #fff"></canvas>
</template>

<script setup>
import { onMounted } from "vue";
onMounted(() => {
  const canvas = document.getElementById("myCanvas");
  const context = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  let i = 0;
  let r;
  let angle;
  let dotColor = " rgb(207, 100, 217)";
  let lineColor = " rgb(225, 149, 232)";

  function timing() {
    i = i + 0.1;
    r = 5 * i;
    angle = 62.5;
    context.beginPath();
    context.moveTo(canvas.width / 2, canvas.height / 2);
    let x = canvas.width / 2 + r * Math.sin(i);
    let y = canvas.height / 2 + r * Math.cos(i);
    context.font = "30px Georgia";
    context.textAlign = "center";
    context.fillText(".", x, y);
    context.fillStyle = dotColor;
    context.lineTo(x, y);
    context.strokeStyle = lineColor;
    context.stroke();
    if (i > angle) {
      window.clearTimeout(p);
    } else {
      window.setTimeout(timing(), 50);
    }
  }
  let p = window.setTimeout(timing(), 50);
});
</script>

<style>
body {
  background: #fff !important;
}
</style>
