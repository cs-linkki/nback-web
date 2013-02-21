if(!nback) {
    alert("Something wrong, john!");
}

nback.config = {};

// config for the app goes here
// how long to hide an element in milliseconds
nback.config.pauseBetweenShowsInMs = 1000;
// how long to show an element in milliseconds
nback.config.elementVisibleInMs = 5000;
// data elements
nback.config.elements = [
    {
        text: "LOL",
        location: "top"
    },
    {
        text: "HAHA",
        location: "bottom"
    },
    {
        text: "TROLOLO",
        location: "bottom"
    }
];
