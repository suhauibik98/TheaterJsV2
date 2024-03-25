var layout = document.querySelector(".layout");
var showFaceCreate = document.getElementById("showFaceCreate");
var human = document.querySelectorAll(".human");
var nameinput = document.querySelector(".input");
var imgs = showFaceCreate.querySelectorAll("img");
var sideImges = document.querySelector(".sideImges");
var sideCenterImge = document.querySelectorAll(".sideCenterImge");
var bothImage = document.getElementById("sideImges3");
var centerImgerChange = document.getElementById("centerImage");
var alertMasseges = document.getElementById("alertMasseges");
var alertMasseges2 = document.getElementById("alertMasseges2");
var dropdown = document.querySelector(".dropdown-content");
var mainDropdown = document.querySelector(".dropdown");
var mainNameinput = document.querySelector(".nameinput");
var clearData = document.querySelector(".clearData");
var btnBack = document.querySelectorAll("#btnBack");
// const colorPicker = document.getElementById('colorPicker');
// const svgimages= document.getElementById("svgs")
// console.log(svgimages.getAttribute("src"));
// const EYECOLOR = document.getElementById("EYECOLOR")
// EYECOLOR.setAttribute( "style","fill:red")
// Wait for the document to be fully loaded

var totalimages = [];

var checker = [];
var n = {
  gender: "",
  custum_url: "",
};
var custum_img_index = 3;

btnBack.forEach((e, i) => {
  e.addEventListener("click", () => {
    switch (i) {
      case 0:
        window.location.href = "../creat/index.html";
        break;

      default:
        break;
    }
    console.log(i);
    // window.location.href = "../index.html";
  });
});

function saveName() {
  var nameInput = document.getElementById("nameInput").value;
  if (nameInput.trim() !== "") {
    localStorage.setItem("user_name", nameInput);
    return 1;
  } else {
    nameinput.style.border = "1px solid rgb(210 111 111)";
    nameinput.style.background = "#bb6b72";
    alertMasseges.style.display = "inline-block";
    return 0;
  }
}
human.forEach((h) => {
  h.onclick = () => {
    n.gender = h.id;
    n.custum_url = `imges/${n.gender}/${n.gender}${custum_img_index}.png`;
    if (!saveName()) return;
    if (checkname()) return;
    localStorage.removeItem("imagePositions");
    localStorage.setItem("choiseGender", n.gender);
    saveName();
    alertMasseges.style.display = "none";
    mainDropdown.style.display = "none";
    btnBack[0].style.display = "none";
    mainNameinput.style.display = "none";
    clearData.style.display = "none";
    imgs.forEach((img, i) => {
      switch (i) {
        case 0:
          img.src = `imges/${n.gender}/RightEye.png`;
          //  img.style.fill("red")
          // console.log(img.style.fill);
          break;
        case 1:
          img.src = `imges/${n.gender}/LeftEye.png`;
          break;
        case 2:
          img.src = `imges/${n.gender}/Mouth.png`;
          break;
        case 3:
          img.src = `imges/${n.gender}/Nose.png`;
          break;
        case 4:
          img.src = `imges/${n.gender}/mouth1.png`;
          break;
        case 5:
          img.src = `imges/${n.gender}/mouth2.png`;
          break;
        case 6:
          img.src = `imges/${n.gender}/happyEyeleft.png`;
          break;
        case 7:
          img.src = `imges/${n.gender}/happyEyeright.png`;
          break;
        case 8:
          img.src = `imges/${n.gender}/engryeye1.png`;
          break;
        case 9:
          img.src = `imges/${n.gender}/engryeye2.png`;
          break;
        case 10:
          img.src = n.custum_url;
          break;
        default:
          break;
      }
      bothImage.src = n.custum_url;
    });
    mainDropdown.style.display = "none";
    layout.style.display = "none";
    showFaceCreate.style.display = "block";
    nameInput.style.display = "none";
    konva();
  };
});

function updateCustem(newUrl) {
  var current_Record = JSON.parse(localStorage.getItem("imagePositions"));
  if (current_Record) {
    current_Record[0].custum_url = newUrl;
    localStorage.setItem("imagePositions", JSON.stringify(current_Record));
  }
}
updateCustem();
function konva() {
  var imagePositions = [];
  imagePositions.push(n);

  var layer = new Konva.Layer();
  var stage = new Konva.Stage({
    container: "container",
    width: window.innerWidth,
    height: window.innerHeight,
  });
  function setSrcImge() {
    sideCenterImge.forEach((current, i) => {
      current.src = `imges/${n.gender}/Asset${i}.png`;
    });
  }
  localStorage.setItem("imagePositions", JSON.stringify(imagePositions));
  setSrcImge();
  for (var i = 0; i < 4; i++) {
    var sideImges = new Konva.Image({
      id: i,
      x: 50 + i * 100,
      y: 810,
      width: 100,
      height: 200,
      draggable: false,
      image: document.getElementById("sideImges" + i),
    });
    sideImges.shadowBlur(20);

    sideImges.on("touchstart", function (t) {
      t.target.attrs.image.src = `imges/${n.gender}/${n.gender}${
        t.target.index - 1
      }.png`;
      centerImgerChange.src = t.target.attrs.image.src;
      setSrcImge();
    });
    sideImges.on("click", function (t) {
      custum_img_index = t.target.attrs.id;
      n.custum_url = `imges/${n.gender}/${n.gender}${custum_img_index}.png`;
      updateCustem(n.custum_url);

      console.log(custum_img_index);

      t.target.attrs.image.src = `imges/${n.gender}/${n.gender}${
        t.target.index - 1
      }.png`;

      centerImgerChange.src = t.target.attrs.image.src;
      setSrcImge();
    });
    sideImges.on("mouseover", function () {
      document.body.style.cursor = "pointer";
    });
    sideImges.on("mouseout", function () {
      document.body.style.cursor = "default";
    });
    // sideImges.moveToTop();
    layer.add(sideImges);
  }

  var colorPicker = document.getElementById("colorPicker");
  var selectedColor = "#fff";

  colorPicker.addEventListener("input", changeColor);
  function changeColor() {
    selectedColor = colorPicker.value;
    // console.log(selectedColor);
    // document.body.style.backgroundColor = selectedColor;
    // updateImageColors(selectedColor); // Update the fill color of the images
  }

  const shape = [
    {
      round:
        "M63.1 30.9C62.6 30.1 50 12.5 32 12.5S1.4 30.1.9 30.9L.1 32l.8 1.1c.5.8 13.1 18.4 31.1 18.4s30.6-17.6 31.1-18.4l.8-1.1zM32 47.5C18.5 47.5 8 35.8 5 32c3-3.8 13.5-15.5 27-15.5S56 28.2 59 32c-3 3.8-13.5 15.5-27 15.5z",
      inside:
        "M32 19.5a12 12 0 1 0 12 12 12 12 0 0 0-12-12zm0 18a6 6 0 0 1-5.2-9 2 2 0 0 1 3.5 2 2 2 0 0 0-.3 1 2 2 0 0 0 2 2 2 2 0 1 1 0 4z",
    },
    {
      round:
        "M63.1 30.9C62.6 30.1 50 12.5 32 12.5S1.4 30.1.9 30.9L.1 32l.8 1.1c.5.8 13.1 18.4 31.1 18.4s30.6-17.6 31.1-18.4l.8-1.1zM32 47.5C18.5 47.5 8 35.8 5 32c3-3.8 13.5-15.5 27-15.5S56 28.2 59 32c-3 3.8-13.5 15.5-27 15.5z",
      inside:
        "M32 19.5a12 12 0 1 0 12 12 12 12 0 0 0-12-12zm0 18a6 6 0 0 1-5.2-9 2 2 0 0 1 3.5 2 2 2 0 0 0-.3 1 2 2 0 0 0 2 2 2 2 0 1 1 0 4z",
    },
    {
      round: "",
      // "M82.88,80.19c1.49-13.55,2.98-27.11,4.47-40.66-1.6-2.42-11.25-16.49-30.24-19.89-19.02-3.4-32.96,6.5-35.3,8.22-2.38,3.06-4.86,6.78-7.07,11.2-6.06,12.08-7.23,23.5-7.3,30.82-1.24-1.8-11.77-17.65-5.41-35.16C7.25,20.35,20.28,14.66,25.94,12.2c22.94-10.01,44.72,1.18,48.16,3.01,6.58,3.52,17.8,9.53,22.13,22.22,7.15,20.95-12.29,41.67-13.34,42.75Z",
      // inside:      "M65.29,.59c18.48,3.37,35.26,19.63,37.46,37.84,1.54,12.77-3.85,28.4-10.5,29.46-2.55,.4-5.12-1.34-5.95-1.94-2.96-2.14-4.52-6.18-6.1-13.06-1.22-5.29-.47-10.85-.16-14.88-.76,.55-1.8,1.29-3.07,2.12-1.98,1.3-3.96,2.46-6.55,3.85-3.67,1.96-7.27,3.57-9.11,4.43-11.01,5.15-26.87,6.57-28.28,3.19-.58-1.39,.4-4.03,2.13-6.28-3.05,.48-7.67,.38-8.36,.37C12.06,45.42,.21,36.54,2.45,27.07c1.9-8.01,14.78-16.41,33.3-22.03C47.21,1.56,55.07-1.27,65.29,.59Z",
      inside:
        "M270.46,159.16c-2.68,7.43-6.2,14.64-10.53,21.58-.65,1.06-1.32,2.11-2.01,3.15-8.56-3.15-17.4-7.45-26.53-12.91-1.32-.79-2.61-1.6-3.86-2.41-15.59-10.04-26.72-21.14-33.38-33.31-1.64-2.98-3.22-6.36-4.72-10.16-1.27-3.15-2.5-6.55-3.68-10.25-3.05-9.48-5.18-19.08-6.34-28.8-.07-.46-.12-.9-.16-1.36l-.21,1.34-.51,3.17c-.62,3.59-1.37,6.92-2.22,9.95-.97,3.54-2.66,6.85-5.04,9.92-1.27,1.64-2.8,3.31-4.6,5.07-3.91,4.4-7.06,10.16-9.41,17.3-2.13,6.34-3.66,13.76-4.56,22.3-25.98-10.64-42.43-24.57-49.32-41.78-3.15-7.87-6.45-20.31-9.9-37.31-2.89,4.16-5.3,8.7-7.24,13.63-3.15,7.93-4.67,16.1-4.56,24.52,.19,11.24,3.08,21.72,8.67,31.46-15.34-5.58-28.18-14.44-38.54-26.6-.81-.95-1.57-1.9-2.34-2.87-5.02-6.41-9.18-13.65-12.49-21.75,.76,3.84,1.09,7.8,.93,11.82-.16,4.4-.86,8.65-2.13,12.72-.65,2.15-1.46,4.26-2.43,6.32-2.06,4.37-4.7,8.33-7.96,11.89-1.69,1.87-3.54,3.63-5.58,5.27-3.28,2.66-6.85,4.88-10.66,6.69-.05-.12-.09-.23-.14-.35-3.22-7.26-5.58-14.83-7.08-22.69-2.48-12.63-2.57-25.12-.28-37.48,1.8-9.74,4.97-18.97,9.55-27.67,.32-.65,.65-1.27,1.02-1.9,3.01-5.51,6.62-10.8,10.76-15.87,6.22-7.61,13.53-14.46,21.91-20.54C59.81,10.34,77.09,3.63,96.66,1.11c11.13-1.46,25.19-1.48,42.24-.07,13.81,1.09,26.19,3.24,37.15,6.45,19.15,5.57,36.23,14.46,51.22,26.67,12.1,9.88,21.58,19.43,28.45,28.62,12.65,16.84,19.62,34.95,20.94,54.39,.93,14.11-1.16,28.11-6.2,41.99Z",
    },
    {
      round: "",
      // "M82.88,80.19c1.49-13.55,2.98-27.11,4.47-40.66-1.6-2.42-11.25-16.49-30.24-19.89-19.02-3.4-32.96,6.5-35.3,8.22-2.38,3.06-4.86,6.78-7.07,11.2-6.06,12.08-7.23,23.5-7.3,30.82-1.24-1.8-11.77-17.65-5.41-35.16C7.25,20.35,20.28,14.66,25.94,12.2c22.94-10.01,44.72,1.18,48.16,3.01,6.58,3.52,17.8,9.53,22.13,22.22,7.15,20.95-12.29,41.67-13.34,42.75Z",
      // inside:      "M65.29,.59c18.48,3.37,35.26,19.63,37.46,37.84,1.54,12.77-3.85,28.4-10.5,29.46-2.55,.4-5.12-1.34-5.95-1.94-2.96-2.14-4.52-6.18-6.1-13.06-1.22-5.29-.47-10.85-.16-14.88-.76,.55-1.8,1.29-3.07,2.12-1.98,1.3-3.96,2.46-6.55,3.85-3.67,1.96-7.27,3.57-9.11,4.43-11.01,5.15-26.87,6.57-28.28,3.19-.58-1.39,.4-4.03,2.13-6.28-3.05,.48-7.67,.38-8.36,.37C12.06,45.42,.21,36.54,2.45,27.07c1.9-8.01,14.78-16.41,33.3-22.03C47.21,1.56,55.07-1.27,65.29,.59Z",
      inside:
        "M155,117.63c-1.48-2.39-3.6-3.8-6.33-4.21-1.09-.17-2.2-.21-3.29-.11-5.62,9.12-11.25,15.09-11.94,15.81,.1-3.59,.4-7.11,.9-10.59,.21-1.48,.47-2.95,.74-4.41,.38-3.49,.77-6.98,1.16-10.49-3.12-3.78-5.11-9.69-7.13-18.46-1.96-8.53-.75-17.48-.26-23.97-1.21,.88-2.89,2.08-4.94,3.42-3.18,2.08-6.37,3.97-10.55,6.19-5.92,3.15-11.72,5.74-14.68,7.12-17.73,8.3-43.26,10.59-45.54,5.13-.93-2.24,.64-6.5,3.43-10.12-4.92,.77-12.36,.62-13.46,.59-8.17-.14-15.79-1.93-22.11-4.83-5.83,13.55-8.02,26.3-8.74,36.28-.12-.44-.23-.88-.33-1.32-3.18-13.1-2.81-27.11,.5-40.2,4.3-17.05,13.57-32.57,26.46-42.57,36.39-28.22,99.15-10.65,122.21,24.98,3.46,5.36,6.04,11.13,7.48,17.21,4.32,18.18-1.66,38.04-13.6,54.55c-.28,.05-.56,.07-.83,.08-3.83,.19-7.51-2.31-8.75-3.21-.55-.4-1.07-.85-1.57-1.34-.4-.38-.76-.78-1.12-1.23-3.12-3.78-5.11-9.69-7.13-18.46-1.96-8.53-.75-17.48-.26-23.97-1.21,.88-2.89,2.08-4.94,3.42-3.18,2.08-6.37,3.97-10.55,6.19-5.92,3.15-11.72,5.74-14.68,7.12-17.73,8.3-43.26,10.59-45.54,5.13-.93-2.24,.64-6.5,3.43-10.12-4.92,.77-12.36,.62-13.46,.59-8.17-.14-15.79-1.93-22.11-4.83-5.83,13.55-8.02,26.3-8.74,36.28-.2,2.73-.29,5.25-.31,7.52-1.99-2.89-18.96-28.41-8.71-56.61,.38-1.04,.79-2.07,1.21-3.06,8.19-18.84,24.86-27.62,34.44-31.95,1.04-.47,1.99-.89,2.85-1.26,36.94-16.12,72.01,1.89,77.55,4.85,10.59,5.66,28.65,15.34,35.62,35.78,6.17,18.09,.04,36.07-7.24,49.12h0Z",
    },
    {
      round: "",
      // "M82.88,80.19c1.49-13.55,2.98-27.11,4.47-40.66-1.6-2.42-11.25-16.49-30.24-19.89-19.02-3.4-32.96,6.5-35.3,8.22-2.38,3.06-4.86,6.78-7.07,11.2-6.06,12.08-7.23,23.5-7.3,30.82-1.24-1.8-11.77-17.65-5.41-35.16C7.25,20.35,20.28,14.66,25.94,12.2c22.94-10.01,44.72,1.18,48.16,3.01,6.58,3.52,17.8,9.53,22.13,22.22,7.15,20.95-12.29,41.67-13.34,42.75Z",
      // inside:      "M65.29,.59c18.48,3.37,35.26,19.63,37.46,37.84,1.54,12.77-3.85,28.4-10.5,29.46-2.55,.4-5.12-1.34-5.95-1.94-2.96-2.14-4.52-6.18-6.1-13.06-1.22-5.29-.47-10.85-.16-14.88-.76,.55-1.8,1.29-3.07,2.12-1.98,1.3-3.96,2.46-6.55,3.85-3.67,1.96-7.27,3.57-9.11,4.43-11.01,5.15-26.87,6.57-28.28,3.19-.58-1.39,.4-4.03,2.13-6.28-3.05,.48-7.67,.38-8.36,.37C12.06,45.42,.21,36.54,2.45,27.07c1.9-8.01,14.78-16.41,33.3-22.03C47.21,1.56,55.07-1.27,65.29,.59Z",
      inside:
        "M155,117.63c-1.48-2.39-3.6-3.8-6.33-4.21-1.09-.17-2.2-.21-3.29-.11-5.62,9.12-11.25,15.09-11.94,15.81,.1-3.59,.4-7.11,.9-10.59,.21-1.48,.47-2.95,.74-4.41,.38-3.49,.77-6.98,1.16-10.49-3.12-3.78-5.11-9.69-7.13-18.46-1.96-8.53-.75-17.48-.26-23.97-1.21,.88-2.89,2.08-4.94,3.42-3.18,2.08-6.37,3.97-10.55,6.19-5.92,3.15-11.72,5.74-14.68,7.12-17.73,8.3-43.26,10.59-45.54,5.13-.93-2.24,.64-6.5,3.43-10.12-4.92,.77-12.36,.62-13.46,.59-8.17-.14-15.79-1.93-22.11-4.83-5.83,13.55-8.02,26.3-8.74,36.28-.12-.44-.23-.88-.33-1.32-3.18-13.1-2.81-27.11,.5-40.2,4.3-17.05,13.57-32.57,26.46-42.57,36.39-28.22,99.15-10.65,122.21,24.98,3.46,5.36,6.04,11.13,7.48,17.21,4.32,18.18-1.66,38.04-13.6,54.55,-5.62,9.12-11.25,15.09-11.94,15.81,.1-3.59,.4-7.11,.9-10.59,.09-.08,.19-.17,.29-.24,.46-.38,.94-.76,1.44-1.13,3.1-2.32,6.2-3.6,9.31-3.84,.4-3.61,.79-7.22,1.2-10.83,.14-1.39,.31-2.77,.45-4.17,.38-3.49,.77-6.98,1.16-10.49,.95-8.62,1.89-17.23,2.84-25.86,.52-4.7,1.04-9.42,1.56-14.12-2.32-3.53-15.28-22.42-40.39-30.02-2.64-.8-5.4-1.48-8.31-1.99-30.63-5.48-53.07,10.47-56.84,13.23-3.83,4.94-7.82,10.92-11.39,18.04-.98,1.96-1.87,3.9-2.7,5.83-5.83,13.55-8.02,26.3-8.74,36.28-.2,2.73-.29,5.25-.31,7.52-1.99-2.89-18.96-28.41-8.71-56.61,.38-1.04,.79-2.07,1.21-3.06,8.19-18.84,24.86-27.62,34.44-31.95,1.04-.47,1.99-.89,2.85-1.26,36.94-16.12,72.01,1.89,77.55,4.85,10.59,5.66,28.65,15.34,35.62,35.78,6.17,18.09,.04,36.07-7.24,49.12-.28,.05-.56,.07-.83,.08-3.83,.19-7.51-2.31-8.75-3.21-.55-.4-1.07-.85-1.57-1.34-.4-.38-.76-.78-1.12-1.23-3.12-3.78-5.11-9.69-7.13-18.46-1.96-8.53-.75-17.48-.26-23.97-1.21,.88-2.89,2.08-4.94,3.42-3.18,2.08-6.37,3.97-10.55,6.19-5.92,3.15-11.72,5.74-14.68,7.12-17.73,8.3-43.26,10.59-45.54,5.13-.93-2.24,.64-6.5,3.43-10.12-4.92,.77-12.36,.62-13.46,.59-8.17-.14-15.79-1.93-22.11-4.83-2.2-1.01-4.25-2.16-6.11-3.43-.86-.58-1.68-1.18-2.46-1.82-3.83-3.09-6.61-6.72-7.97-10.62-1.04-2.97-1.28-6.09-.52-9.26C7,30.69,27.74,17.17,57.56,8.12,76.02,2.51,88.67-2.05,105.12,.95c24.18,4.41,46.57,22.54,56,44.92,2.17,5.15,3.66,10.52,4.32,16,2.48,20.56-6.2,45.73-16.92,47.43h0Z",
    },
  ];
  // const shap1 = {
  //   round:"M63.1 30.9C62.6 30.1 50 12.5 32 12.5S1.4 30.1.9 30.9L.1 32l.8 1.1c.5.8 13.1 18.4 31.1 18.4s30.6-17.6 31.1-18.4l.8-1.1zM32 47.5C18.5 47.5 8 35.8 5 32c3-3.8 13.5-15.5 27-15.5S56 28.2 59 32c-3 3.8-13.5 15.5-27 15.5z",
  //   inside:"M32 19.5a12 12 0 1 0 12 12 12 12 0 0 0-12-12zm0 18a6 6 0 0 1-5.2-9 2 2 0 0 1 3.5 2 2 2 0 0 0-.3 1 2 2 0 0 0 2 2 2 2 0 1 1 0 4z"
  // }

  for (let i = 0; i < shape.length; i++) {
    (function (i) {
      var groupId = "shapSVG" + i; // Generate unique group ID

      var group = new Konva.Group({
        id: groupId,
        x: 80 + i * 180,
        y: 500,
        draggable: true,
      });
      layer.add(group);
      var roundEye = new Konva.Path({
        id: "round" + i,
        data: shape[i].round,
        fill: "#000",
      });
      group.add(roundEye);

      var InsideEye = new Konva.Path({
        id: "inside" + i,
        data: shape[i].inside,
        fill: "#fff",
      });

      group.add(InsideEye);
      //  totalimages.push(InsideEye)
      totalimages.push({ InsideEye, selectedColor });

      group.on("click", (p) => {
        if (
          group.attrs.y >= 180 &&
          group.attrs.y <= 360 &&
          group.attrs.x >= 880 &&
          group.attrs.x <= 1100
        ) {
          // selectedColor = colorPicker.value;

          p.target.fill(selectedColor);
          // p.target.stroke();
          console.log(roundEye); // Change fill color
          console.log(p.target.attrs.id); // Change fill color
          layer.draw(); // Redraw layer
          // console.log(totalimages,p);

          if (imagePositions.length) {
            for (let i = 1; i < imagePositions.length + 1; i++) {
              if (group.attrs.id == imagePositions[i]?.id) {
                imagePositions.splice(i, 1);
              }
            }
            imagePositions.push({
              id: group.attrs.id,
              x: group.attrs.x,
              y: group.attrs.y,
              round: roundEye.id(),
              roundFill: roundEye.fill(),
              roundData: roundEye.data(),
              inside: InsideEye.id(),
              insideFill: InsideEye.fill(),
              insideData: InsideEye.data(),
            });
            localStorage.setItem(
              "imagePositions",
              JSON.stringify(imagePositions)
            );
          } else {
            console.log("init");
            imagePositions.push(n.gender);
            imagePositions.push({
              id: group.attrs.id,
              x: group.attrs.x,
              y: group.attrs.y,
              round: roundEye.id(),
              roundFill: roundEye.fill(),
              roundData: roundEye.data(),
              inside: InsideEye.id(),
              insideFill: InsideEye.fill(),
              insideData: InsideEye.data(),
            });
            localStorage.setItem(
              "imagePositions",
              JSON.stringify(imagePositions)
            );
          }
          layer.draw();
        }else {
          imagePositions = imagePositions.filter(
            (item) => item.id !== group.attrs.id
          );
          localStorage.setItem(
            "imagePositions",
            JSON.stringify(imagePositions)
          );
        }
      });
      // console.log(group.attrs.y);
      group.on("dragend", (p) => {
        if (
          group.attrs.y >= 200 &&
          group.attrs.y <= 360 &&
          group.attrs.x >= 880 &&
          group.attrs.x <= 1100
        ) {
          // selectedColor = colorPicker.value;

          // p.target.fill(selectedColor);
          // console.log(group.attrs); // Change fill color
          // console.log(p.target.attrs.id); // Change fill color
          layer.draw(); // Redraw layer
          // console.log(totalimages,p);

          if (imagePositions.length) {
            for (let i = 1; i < imagePositions.length + 1; i++) {
              if (group.attrs.id == imagePositions[i]?.id) {
                imagePositions.splice(i, 1);
              }
            }
            imagePositions.push({
              id: group.attrs.id,
              x: group.attrs.x,
              y: group.attrs.y,
              round: roundEye.id(),
              roundFill: roundEye.fill(),
              roundData: roundEye.data(),

              inside: InsideEye.id(),
              insideFill: InsideEye.fill(),
              insideData: InsideEye.data(),
            });
            localStorage.setItem(
              "imagePositions",
              JSON.stringify(imagePositions)
            );
          } else {
            console.log("init");
            imagePositions.push(n.gender);
            imagePositions.push({
              id: group.attrs.id,
              x: group.attrs.x,
              y: group.attrs.y,
              round: roundEye.id(),
              roundFill: roundEye.fill(),
              roundData: roundEye.data(),

              inside: InsideEye.id(),
              insideFill: InsideEye.fill(),
              insideData: InsideEye.data(),
            });
            localStorage.setItem(
              "imagePositions",
              JSON.stringify(imagePositions)
            );
          }
          layer.draw();
          // console.log(group.attrs.id);
        } else {
          imagePositions = imagePositions.filter(
            (item) => item.id !== group.attrs.id
          );
          localStorage.setItem(
            "imagePositions",
            JSON.stringify(imagePositions)
          );
        }
      });
      // group.on("dragend", function (e) {
      //   // Save the position of the image
      //   //  this.scaleX;
      //   // console.log(e);
      //   // imagePositions.push(group)
      //   console.log(e);
      //   if (imagePositions.length) {
      //     for (let i = 1; i < imagePositions.length + 1; i++) {
      //       if (e.target.attrs.id == imagePositions[i]?.id) {
      //         imagePositions.splice(i, 1);
      //       }
      //     }
      //     imagePositions.push({
      //       id: this.id(),
      //       x: this.x(),
      //       y: this.y(),
      //       round:roundEye.id(),
      //       roundFill:roundEye.fill(),
      //       inside:InsideEye.id(),
      //       insideFill:InsideEye.fill(),

      //     });
      //     localStorage.setItem("imagePositions", JSON.stringify(imagePositions));
      //   } else {
      //     console.log("init");
      //     imagePositions.push(n.gender);
      //     imagePositions.push({
      //       id: this.id(),
      //       x: this.x(),
      //       y: this.y(),
      //       round:roundEye.id(),
      //       roundFill:roundEye.fill(),
      //       inside:InsideEye.id(),
      //       insideFill:InsideEye.fill(),
      //     });
      //     localStorage.setItem("imagePositions", JSON.stringify(imagePositions));
      //   }
      // });
      group.on("mouseover", function () {
        document.body.style.cursor = "pointer";
      });
      group.on("mouseout", function () {
        document.body.style.cursor = "default";
      });
      // layer.add(group);

      layer.draw();
    })(i);
  }

  // var svgPaths = [

  //   `<svg >

  //     <path data-name="layer2"
  //     d="M63.1 30.9C62.6 30.1 50 12.5 32 12.5S1.4 30.1.9 30.9L.1 32l.8 1.1c.5.8 13.1 18.4 31.1 18.4s30.6-17.6 31.1-18.4l.8-1.1zM32 47.5C18.5 47.5 8 35.8 5 32c3-3.8 13.5-15.5 27-15.5S56 28.2 59 32c-3 3.8-13.5 15.5-27 15.5z"
  //     fill="#000"></path>
  //     <path id="EYECOLOR" data-name="layer1" d="M32 19.5a12 12 0 1 0 12 12 12 12 0 0 0-12-12zm0 18a6 6 0 0 1-5.2-9 2 2 0 0 1 3.5 2 2 2 0 0 0-.3 1 2 2 0 0 0 2 2 2 2 0 1 1 0 4z"
  //     fill="#003671"></path>
  //   </svg>`

  // ];

  // svgPaths.forEach((pathData, index)=> {
  //   var path = new Konva.Path({
  //     id:"image"+index,
  //     x:50,
  //     y:100,
  //     data: pathData,
  //     fill: 'transparent',
  //     stroke: 'black',
  //     strokeWidth: 0.2
  //   });

  //   // console.log(path);
  //   if (index === 0) {
  //     totalimages.push(path)
  //     path.fill(selectedColor);
  //   }

  //   group.add(path);

  // });
  // function updateImageColors(color) {
  //   // console.log(totalimages);
  //   totalimages.forEach((image) => {
  //     image.fill(color);
  //     layer.batchDraw();
  //   });
  // }

  for (var i = 0; i < 10; i++) {
    // for (var i = 0; i < 0; i++) {

    var image = new Konva.Image({
      id: document.getElementById("image" + i).className,
      x: i + 1 * 100,
      y: 400,
      // width: 45,
      //  height: 38,
      // fill: selectedColor,
      // stroke:"red",
      draggable: true,
      image: document.getElementById("image" + i),
    });
    // console.log(image.attrs);

    // image.add(path)

    // console.log(image.contentDocument);
    // totalimages.push(image)

    if (i == 0) {
      image.attrs.y = 265;
      image.attrs.x = 100;

      totalimages.push(image);
      // console.log(image);
    }
    if (i == 1) {
      image.attrs.y = 265;
      image.attrs.x = 250;
      // totalimages.push(image)
    }
    // smiling mouth
    if (i == 2) {
      image.attrs.y = 585;
      image.attrs.x = 70;
    }
    // Nose
    if (i == 3) {
      image.attrs.y = 595;
      image.attrs.x = 290;
    }
    // happy mouth
    if (i == 4) {
      image.attrs.y = 595;
      image.attrs.x = 227;
    }
    // shouting mouth
    if (i == 5) {
      image.attrs.y = 592;
      image.attrs.x = 142;
    }
    // smiling eye 1
    if (i == 6) {
      image.attrs.y = 360;
      image.attrs.x = 100;
    }
    // smiling eye 2
    if (i == 7) {
      image.attrs.y = 360;
      image.attrs.x = 250;
    }

    if (i == 8) {
      image.attrs.y = 450;
      image.attrs.x = 100;
    }
    if (i == 9) {
      image.attrs.y = 450;
      image.attrs.x = 250;
    }
    image.on("dragend", function (e) {
      // Save the position of the image
      //  this.scaleX;
      if (imagePositions.length) {
        for (let i = 1; i < imagePositions.length + 1; i++) {
          if (e.target.attrs.image.className == imagePositions[i]?.id) {
            imagePositions.splice(i, 1);
          }
        }
        imagePositions.push({
          id: this.id(),
          x: this.x(),
          y: this.y(),
        });
        localStorage.setItem("imagePositions", JSON.stringify(imagePositions));
      } else {
        console.log("init");
        imagePositions.push(n.gender);
        imagePositions.push({
          id: this.id(),
          x: this.x(),
          y: this.y(),
        });
        localStorage.setItem("imagePositions", JSON.stringify(imagePositions));
      }
    });
    image.on("mouseover", function () {
      document.body.style.cursor = "pointer";
    });
    image.on("mouseout", function () {
      document.body.style.cursor = "default";
    });

    layer.add(image);
  }
  // var path = new Konva.Path({
  //   x: 50,
  //   y: 40,
  // data:"M32 19.5a12 12 0 1 0 12 12 12 12 0 0 0-12-12zm0 18a6 6 0 0 1-5.2-9 2 2 0 0 1 3.5 2 2 2 0 0 0-.3 1 2 2 0 0 0 2 2 2 2 0 1 1 0 4z",
  //   fill: selectedColor,
  //   draggable:true,
  //   scaleX: 1.5,
  //   scaleY: 1.5,
  // });

  // totalimages.push(path)
  // layer.add(path)

  // Create one image in the center
  var centerImage = new Konva.Image({
    x: 820,
    y: 200,
    // width: 250,
    // height: 500,
    draggable: false,
    image: document.getElementById("centerImage"),
  });
  layer.add(centerImage);
  centerImage.moveToBottom();
  // Add the layer to the stage
  stage.add(layer);
  const btn = document.getElementById("btn");
  btn.addEventListener("click", () => {
    window.location.href = "theaterReciver/index.html";
  });
}

function checkname() {
  checker = [];
  asAnchor.forEach((lop) => {
    if (nameInput.value == lop.innerText) {
      alertMasseges2.style.display = "inline-block";
      window.alert("تم انشاءه مسبقا");
      checker.push(true);
    } else checker.push(false);
  });
  if (checker.includes(true)) {
    return true;
  } else return false;
}

var loopIn = 0;
function repeted() {
  if (JSON.parse(localStorage.getItem("imagePositions" + loopIn))) {
    //  while (loopIn) {

    var anchorTag = document.createElement("a");
    var icon = document.createElement("i");
    var eyeIcon = document.createElement("i");
    {
      /* <i class="fa-regular fa-eye"></i> */
    }
    var inPostionnew = JSON.parse(
      localStorage.getItem("imagePositions" + loopIn)
    );
    var nameIndex = inPostionnew[inPostionnew.length - 2];
    dropdown.appendChild(anchorTag);

    anchorTag.innerHTML = nameIndex;
    anchorTag.href = "#";
    anchorTag.id = loopIn;
    anchorTag.className = "bad";
    anchorTag.appendChild(icon);
    anchorTag.appendChild(eyeIcon);

    icon.className = "fa-regular fa-circle-xmark fa-xl";
    icon.style.position = "absolute";
    icon.style.right = "10px";
    icon.style.marginTop = "16px";
    icon.style.zIndex = "2";
    icon.id = "delete";
    eyeIcon.className = "fa-regular fa-eye fa-xl";
    eyeIcon.style.position = "absolute";
    eyeIcon.style.right = "40px";
    eyeIcon.style.marginTop = "16px";
    eyeIcon.style.zIndex = "2";
    eyeIcon.id = "viwe";
    eyeIcon.style.h;
    loopIn++;
  } else {
    if (loopIn < localStorage.length) {
      loopIn++;
    } else {
      return;
    }
  }
}

for (let i = 0; i < localStorage.length; i++) {
  repeted();
}

var main = JSON.parse(localStorage.getItem("imagePositions"));
const asAnchor = dropdown.querySelectorAll("a");
asAnchor.forEach((a, i) => {
  var viwe = a.querySelector("#viwe");
  var pasrr = JSON.parse(localStorage.getItem("imagePositions" + a.id));
  viwe.addEventListener("click", () => {
    main = pasrr;
    localStorage.setItem("imagePositions", JSON.stringify(main));
    window.location.href = "theaterReciver/index.html";
  });

  var Iall = a.querySelector("#delete");
  Iall.addEventListener("click", () => {
    localStorage.removeItem("imagePositions" + a.id);
    window.location.href = ".../index.html";
    location.reload();
  });
});

function clearShapes() {
  window.alert("هل انت متاكد من حذف جميع الرسمات");

  localStorage.clear();
  location.reload();
}
var overlay = document.getElementById("overlay");
// Get emoji container element
var emojiContainer = document.getElementById("emojiContainer");
// Store the default emoji
var defaultEmoji = emojiContainer.innerHTML;

// Show overlay
function showOverlay() {
  overlay.style.display = "flex";
}

// Hide overlay
function hideOverlay() {
  overlay.style.display = "none";
  resetEmoji(); // Reset emoji when hiding overlay
}

// Show emoji
function showEmoji(emoji) {
  emojiContainer.innerHTML = emoji;
}

// Reset emoji to default
function resetEmoji() {
  emojiContainer.innerHTML = defaultEmoji;
}

// Handle "Okay" button click
function handleOkay() {
  console.log("Okay button clicked");
  localStorage.clear();
  location.reload();
  hideOverlay();
}

// Handle "Quit" button click
function handleQuit() {
  console.log("Quit button clicked");
  // Add your logic for the "Quit" button action
  hideOverlay();
}
