var file = document.querySelector("#file");
var text = document.querySelector("#text");
var color = document.querySelector("#color");
var placement = document.querySelector("#placement");
var canvasWrapper = document.querySelector(".canvas-wrapper");
var canvas = canvasWrapper.querySelector("canvas");
var ctx = canvas.getContext("2d");
var downloadWrapper = document.querySelector(".download-wrapper");
var pngBtn = document.querySelector("#pngBtn");

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
      ctx.fillText(text.value, 28, 35);
      break;
    case "tr":
      ctx.textAlign = "right";
      ctx.fillText(text.value, canvas.width - 28, 35);
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
      ctx.fillText(text.value, canvas.width - 28, canvas.height - 35);
      break;
    case "bl":
      ctx.fillText(text.value, 28, canvas.height - 35);
      break;
    default:
      break;
  }
}

function createDownloadLinks() {
  downloadWrapper.style.display = "block";
}

function drawImage() {
  window.URL = window.URL || window.webkitURL;
  var imgPath = window.URL.createObjectURL(file.files[0]);

  var img = new Image();
  img.src = imgPath;

  img.onload = function() {
    if (img.width > window.innerWidth * 0.94) {
      var scale = (window.innerWidth * 0.94) / img.width;

      canvas.style.transform = "scale(" + scale + ")";
      canvas.style.transformOrigin = "top";
    }

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    fillText();
    createDownloadLinks();
  };
}

function saveImage(e) {
  e.preventDefault();

  canvas.toBlob(function(blob) {
    saveAs(blob, "text-on-img.png");
  });
}

file.addEventListener("change", drawImage);
text.addEventListener("input", drawImage);
placement.addEventListener("change", drawImage);
color.addEventListener("change", drawImage);
window.addEventListener("resize", drawImage);
pngBtn.addEventListener("click", saveImage);
