var inPostion = JSON.parse(localStorage.getItem("imagePositions"));
var nameInput = localStorage.getItem("user_name");
var captureImge = document.querySelector(".capture");
var pullimges = document.getElementById("pullimges");
const imgs = pullimges.querySelectorAll("img");
var centerImge = document.getElementById("centerImage");
var reload = document.getElementById("reload");
var getsideImges = localStorage.getItem("sideImges");
var choiseGender = localStorage.getItem("choiseGender");
var pHidenafter2s = document.getElementById("pHidenafter2s");
var AddnewShap = document.getElementById("AddnewShap");
var path = `../imges/${inPostion[0].gender}/gender.png`;
// var btnBack = document.querySelector("#btnBack");

// btnBack.addEventListener("click", () => {
//   window.location.href = "../index.html";
// });

reload.addEventListener("click", () => {
  window.location.href = "../index.html";
  // localStorage.removeItem("imagePositions");
});
var currentLength = localStorage.length - 3;
AddnewShap.addEventListener("click", () => {
  // checkLocal();

  var newArray = [...inPostion];
  console.log(newArray);

  newArray.push(nameInput);
  newArray.push(path);

  if (localStorage.getItem("imagePositions" + currentLength)) {
    currentLength++;
    AddnewShap.style.display = "none";
    console.log("oih");
  }
  localStorage.setItem(
    "imagePositions" + currentLength,
    JSON.stringify(newArray)
  );
  console.log(currentLength);
  window.location.href = "../index.html";
});

// function checkLocal(){
//   if (localStorage.getItem("imagePositions" + currentLength)) {
//     window.alert("هاذا الشكل موجود مسبقا")
//   }
//   else{

//   }
// }

centerImge.src = `../${inPostion[0].custum_url}`;

imgs.forEach((img, i) => {
  switch (i) {
    case 0:
      img.src = `../imges/${inPostion[0].gender}/RightEye.png`;
      break;
    case 1:
      img.src = `../imges/${inPostion[0].gender}/LeftEye.png`;
      break;
    case 2:
      img.src = `../imges/${inPostion[0].gender}/Mouth.png`;
      break;
    case 3:
      img.src = `../imges/${inPostion[0].gender}/Nose.png`;
      break;
    case 4:
      img.src = `../imges/${inPostion[0].gender}/mouth1.png`;
      break;
    case 5:
      img.src = `../imges/${inPostion[0].gender}/mouth2.png`;
      break;
    case 6:
      img.src = `../imges/${inPostion[0].gender}/happyEyeleft.png`;
      break;
    case 7:
      img.src = `../imges/${inPostion[0].gender}/happyEyeright.png`;
      break;
    case 8:
      img.src = `../imges/${inPostion[0].gender}/engryeye1.png`;
      break;
    case 9:
      img.src = `../imges/${inPostion[0].gender}/engryeye2.png`;
      break;
  }
});

function capture() {
  captureImge.style.display = "none";
  reload.style.display = "none";
  pHidenafter2s.style.display = "none";
  AddnewShap.style.display = "none";
  if (typeof html2canvas !== "undefined") {
    html2canvas(document.body).then(function (canvas) {
      var dataUrl = canvas.toDataURL();
      var link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${nameInput}.png`;
      link.click();
    });
  } else {
    alert("Screenshot capture is not supported on this browser.");
  }
  captureImge.style.display = "inline-block";
  reload.style.display = "inline-block";
  pHidenafter2s.style.display = "inline-block";
  AddnewShap.style.display = "inline-block";
}

var width = window.innerWidth;
var height = window.innerHeight;
var stage = new Konva.Stage({
  container: "container",
  width: width,
  height: height,
});
var layer = new Konva.Layer();

// for (let i=0; i<loopIn ; i++ ){

//  }
var renderImgecenter = new Konva.Image({
  id: "centerImage",
  x: 819,
  y: 200,
  // width: 250,
  // height: 500,
  draggable: false,
  image: centerImge,
});
layer.add(renderImgecenter);
// inPostion.shift()
inPostion.forEach((event,index)=>{
if(event.id){
  console.log(event);
  var group = new Konva.Group({
    id: event.id,
    x: event.x,
    y: event.y,
    draggable: false,
  });
  layer.add(group);
  console.log(group);

  var roundEye = new Konva.Path({
    id: event.round,
    data: event.roundData,
    fill: event.roundFill,
  });
  group.add(roundEye);

  var InsideEye = new Konva.Path({
    id: event.inside,
    data: event.insideData,
    fill: event.insideFill,
  });

  group.add(InsideEye);
  
  }
})

var renderImge;
inPostion.forEach((pos) => {
  renderImge = new Konva.Image({
    id: pos.id,
    x: pos.x,
    y: pos.y,
    // width: 45,
    // height: 38,
    draggable: false,
    image: document.querySelector("." + pos.id),
  });
  layer.add(renderImge);
});

layer.setDraggable(true);

stage.add(layer);
