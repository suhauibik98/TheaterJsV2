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
      round:
        "M14.16,70.81s6.4,1.01,15.52-2.95c62.87,14.96,104.8,7.3,127.32-5.73C139.26,13.2,106.8-.68,53.51,26.48,18.03,44.61,10.48,70.67,14.16,70.81Z",
      inside:
        "M88.82,5.09c-19.17,0-34.71,15.54-34.71,34.71s15.54,34.71,34.71,34.71,34.71-15.54,34.71-34.71S108,5.09,88.82,5.09Z",
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
      });
console.log(group);
      if(group.attrs.y>= 250)
      group.on("dragend", (p) => {
        // selectedColor = colorPicker.value;

        // p.target.fill(selectedColor);
        console.log(group.attrs); // Change fill color
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
