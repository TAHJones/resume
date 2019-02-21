
// get the navbar element
var dropdownMenu = document.getElementById("dropdownMenuId");

//get the hamburger icon anchor element
var hamburgerIcon = document.getElementById("hamburgeIconId");

// Toggle between adding and removing the "mobileMenu" class to topnav when the user clicks on the hamburgericon
function dropDown() {
  if (dropdownMenu.className === "dropdownMenu") {
    dropdownMenu.className = "dropdownMobile";
  }
  else {
    dropdownMenu.className = "dropdownMenu";
  }
}

// trigger the dropDown function when the hamburger icon anchor element is clicked
hamburgerIcon.addEventListener("click", dropDown, false);

// replaces mobileMenu class with dropdownMenu on window resize event
function removeDropdown() {
  dropdownMenu.className = "dropdownMenu";
}

// trigger removeDropdown function on window resize event
window.addEventListener("resize", removeDropdown, false);

// reassign dropDownMenu variable for navbar element as fixedMenu
var fixedMenu = dropdownMenu;

// get the section of the page where the fixed menu will appear
var profile = document.getElementById("profile");

// get the offset position of the navbar
var fixedPosition = profile.offsetTop;

// add the noTransition class if dropdown menu is clickedfixedMenu class to the navbar when you reach its scroll position.
function scrollingMenu() {
  if (window.pageYOffset >= fixedPosition && fixedMenu.className === "hideFixedMenu") {
    fixedMenu.className = "noTransition";
  } else if (window.pageYOffset >= fixedPosition && fixedMenu.className != "hideFixedMenu") {
    fixedMenu.className = "fixedMenu";
  } else {
    fixedMenu.className = "dropdownMenu";
  }
   // Trigger a reflow, flushing the CSS changes
  fixedMenu.offsetHeight;
}

// trigger scrollingMenu function on scroll event
window.addEventListener("scroll", scrollingMenu, false);

// if dropdown menu anchor tag is clicked change class name to hideFixedMenu to hide fixed menu during transition
dropdownMenu.addEventListener("click", function(e) {
  if (e.target.className === "dropdownLink") {
    dropdownMenu.className = "hideFixedMenu";
    console.log(e.target.className);       
  }
}, false);


// select copyRight div
var copyRight = document.getElementById("copyRight");

// Return today's date and time
var currentTime = new Date()

// returns the year (four digits)
var year = currentTime.getFullYear()

// insert current year variable into copyright statement
var copyRightText = "2018 - " + year + " © Thomas Jones - All Rights Reserved";

// insert copyright statement into copyRight div
copyRight.innerHTML = copyRightText;