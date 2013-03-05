if(!nback) {
    alert("Something wrong, john!");
}

nback.config = {};

// text to show at start
nback.config.startText = "Press any key to start.";
// text to show at end
nback.config.endText = "Thank you for participating!";


// possible options: 
// - REACTION (reaction test, see when a key pressed)
// - NUMBERREACTION
nback.config.testType = "NUMBERREACTION";

// backend to submit data to
nback.config.backendAddress = "http://linkki-nback.herokuapp.com/app/result";

// config for the app goes here
// how long to hide an element in milliseconds
nback.config.pauseBetweenShowsInMs = 1000;
// how long to show an element in milliseconds
nback.config.elementVisibleInMs = 5000;
// data elements
//nback.config.elements = [
//    {
//        text: "LOL",
//        location: "top"
//    },
//    {
//        text: "HAHA",
//        location: "bottom"
//    },
//    {
//        text: "TROLOLO",
//        location: "bottom"
//    }
//];

// NUMBER REACTION EXAMPLE
nback.config.elements = [
    {
        text: "7",
        location: "divider"
    },
    {
        text: "4",
        location: "divider"
    },
    {
        text: "41",
        location: "divider"
    },
    {
        text: "47",
        location: "divider"
    },
    {
        text: "21",
        location: "divider"
    },
    {
        text: "22",
        location: "divider"
    },
    {
        text: "4",
        location: "divider"
    }
];
