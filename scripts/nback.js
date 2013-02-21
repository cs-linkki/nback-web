// lets just take nback from the global namespace
var nback = {};
// data that we gather from user inputs will be
// appended to this object
nback.data = [];

// and the main code
nback.program = {
    currentTimeoutVariable: null,
    currentDataElement: 0,
    lastShowTime: -100,
    
    // init binds keys for functions
    init : function() {
        // use keydown to get the action as fast as possible
        // check http://css-tricks.com/snippets/javascript/javascript-keycodes/
        // for other keycodes
        $(document).keydown(function(e) {                
            switch (e.which) {
                case 90: // z
                    nback.program.pressedLeft();
                    break;
                case 190: // .
                    nback.program.pressedRight();
                    break;
            }
        });
    },
    
    start : function() {
        // call the function showNext after a pre-configured pause
        nback.program.currentTimeoutVariable 
            = setTimeout(nback.program.show, nback.config.pauseBetweenShowsInMs);
        
        // could also config to show a pre-defined screen, and
        // switch away after a specific event
    },
    

    show: function() {
        nback.program.clear();       
        var data = nback.config.elements[nback.program.currentDataElement];

        var preshowTime = $.now();
        $("#" + data.location).html(data.text);
        var postshowTime = $.now();
    
        nback.program.lastShowTime = preshowTime + ((postshowTime - preshowTime) / 2);
    
        console.log("Diff between showing content: " + (postshowTime - preshowTime));
        nback.program.currentTimeoutVariable 
            = setTimeout(nback.program.hideAndWaitForNext, nback.config.elementVisibleInMs);
    },
    
    hideAndWaitForNext: function() {
        console.log("going for hiding..");
        nback.program.lastShowTime = -1;
        nback.program.clear();
        console.log("incrementing the data element index to show");
        nback.program.currentDataElement++;     

        console.log("elements in array: " + nback.config.elements.length);
        console.log("current index: " +nback.program.currentDataElement);
        if(nback.program.currentDataElement >= nback.config.elements.length) {
            nback.program.end();
        } else {
            nback.program.currentTimeoutVariable 
                = setTimeout(nback.program.show, nback.config.pauseBetweenShowsInMs);
        }                    
    },

    clear: function() {
        $("#top").html("&nbsp;");
        $("#bottom").html("&nbsp;");
        
        if(nback.program.currentTimeoutVariable) {
            clearTimeout(nback.program.currentTimeoutVariable);
        }
    },               
    
    
    pressedRight: function() {
        if(nback.program.lastShowTime === -100) {
            console.log("pressed right too early");
            return;
        }
        
        if(nback.program.lastShowTime === -1) {
            console.log("pressed right too late");
            return;
        }
        
        nback.data.push({
            index: nback.program.currentDataElement,
            time: $.now() - nback.program.lastShowTime,
            answer: "RIGHT"
        });
        
        nback.program.hideAndWaitForNext();
    },
    
    pressedLeft: function() {
        if(nback.program.lastShowTime === -100) {
            console.log("pressed left too early");
            return;
        }
        
        if(nback.program.lastShowTime === -1) {
            console.log("pressed left too late");
            return;
        }
        
        nback.data.push({
            index: nback.program.currentDataElement,
            time: $.now() - nback.program.lastShowTime,
            answer: "LEFT"
        });
        
        nback.program.hideAndWaitForNext();                    
    },
    
    end: function() {
        console.log("Thx!");
        nback.program.lastShowTime = -1;
        nback.program.clear(); 
        
        console.log(JSON.stringify(nback.data));
        
        alert("should push data: " + JSON.stringify(nback.data) + " to an arbitrary backend.")
    }
}
