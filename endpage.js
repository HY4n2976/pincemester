const canvas = document.getElementById("oklevelCanvas");
const ctx = canvas.getContext("2d");
const bg = new Image();

bg.src = "Frame 1.png";

bg.onload = () => {
  drawCertificate();
};

function drawCertificate(name = "Név helye", date = getToday()) {

  const ratio = bg.width / bg.height;
  const displayWidth = 350;
  canvas.style.width = displayWidth + "px";
  canvas.style.height = (displayWidth / ratio) + "px";
  const maxWidth = 800;
  canvas.width = maxWidth;
  canvas.height = maxWidth / ratio;

  
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  
  ctx.font = `${canvas.width * 0.045}px Georgia`;
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.fillText(name, canvas.width / 2, canvas.height * 0.4);

 
  ctx.font = `${canvas.width * 0.03}px Georgia`;
  ctx.fillStyle = "#444";
  ctx.fillText("Kelt: " + date, canvas.width / 2, canvas.height * 0.865);
}

function getToday() {
  const d = new Date();
  return d.getFullYear() + "." +
         String(d.getMonth()+1).padStart(2,"0") + "." +
         String(d.getDate()).padStart(2,"0") + ".";
}

document.getElementById("generateBtn").addEventListener("click", () => {
  const name = document.getElementById("nameInput").value.trim() || "Név helye";
  drawCertificate(name, getToday());
});

document.getElementById("downloadBtn").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "oklevel.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});