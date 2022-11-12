const canvas = document.getElementById("canvas");
const wrap = document.getElementById("wrap");
const wrapper = document.getElementById("wrapper");
const btn = document.getElementById("btn");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

btn.onclick = () => {
    wrap.style.display = "none";
    canvas.style.display = "flex";
}