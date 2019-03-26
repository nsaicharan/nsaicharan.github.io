const file = document.querySelector("#file");
const text = document.querySelector("#text");
const color = document.querySelector("#color");
const placement = document.querySelector("#placement");
const canvasWrapper = document.querySelector(".canvas-wrapper");
const canvas = canvasWrapper.querySelector("canvas");
const ctx = canvas.getContext("2d");
const downloadWrapper = document.querySelector(".download-wrapper");
const pngBtn = document.querySelector("#pngBtn");

function fillText() {
  ctx.fillStyle = "#" + color.value;
  ctx.textBaseline = "middle";
  ctx.font = "35px 'Arial'";

  switch (placement.value) {
    case "t":
      ctx.textAlign = "center";
      ctx.fillText(text.value, canvas.width - canvas.width / 2, 35);
      break;
    case "tl":
      ctx.fillText(text.value, 30, 35);
      break;
    case "tr":
      ctx.textAlign = "right";
      ctx.fillText(text.value, canvas.width - 30, 35);
      break;
    case "b":
      ctx.textAlign = "center";
      ctx.fillText(
        text.value,
        canvas.width - canvas.width / 2,
        canvas.height - 35
      );
      break;
    case "br":
      ctx.textAlign = "right";
      ctx.fillText(text.value, canvas.width - 30, canvas.height - 35);
      break;
    case "bl":
      ctx.fillText(text.value, 30, canvas.height - 35);
      break;
    default:
      break;
  }
}

function createDownloadLinks() {
  downloadWrapper.style.display = "block";

  const dataURL = canvas.toDataURL("image/png");
  pngBtn.href = dataURL;
}

function drawImage() {
  window.URL = window.URL || window.webkitURL;
  const path = window.URL.createObjectURL(file.files[0]);

  const img = new Image();
  img.src = path;

  img.onload = function() {
    console.log("screenWidth:", window.innerWidth);
    console.log("imgWidth:", img.width);

    if (img.width > window.innerWidth * 0.94) {
      const scale = (window.innerWidth * 0.94) / img.width;

      canvas.style.transform = `scale(${scale})`;
      canvas.style.transformOrigin = "top";
    }

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    fillText();
    createDownloadLinks();
  };
}

function checkIfIE(e) {
  if (canvas.msToBlob) {
    e.preventDefault();
    var blob = canvas.msToBlob();
    window.navigator.msSaveBlob(blob, "text-on-img.png");
  }
}

file.addEventListener("change", drawImage);
text.addEventListener("input", drawImage);
placement.addEventListener("change", drawImage);
color.addEventListener("change", drawImage);
window.addEventListener("resize", drawImage);
pngBtn.addEventListener("click", checkIfIE);
