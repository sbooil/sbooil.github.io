var myHeading = document.querySelector("h1");
myHeading.textContent = "Hello world!";

//alert("hello");

document.querySelector("h1").onclick = function () {
    alert("Ouch! Stop poking me!");
};

var myImage = document.querySelector("img");

myImage.onclick = function () {
  let mySrc = myImage.getAttribute("src");
  if (mySrc === "images/firefox-icon.png") {
    myImage.setAttribute("src", "images/testimage.jpg");
  } else {
    myImage.setAttribute("src", "images/firefox-icon.png");
  }
};

var myButton = document.querySelector("button");
var myHeading = document.querySelector("h1");

function setUserName() {
    let myName = prompt("Please enter your name.");
    localStorage.setItem("name", myName);
    myHeading.innerHTML = "Mozilla is cool, " + myName;
}

if (!localStorage.getItem("name")) {
    setUserName();
} 
else {
    let storedName = localStorage.getItem("name");
    myHeading.innerHTML = "Mozilla is cool, " + storedName;
}

myButton.onclick = function () {
    setUserName();
};  
