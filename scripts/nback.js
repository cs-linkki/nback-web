// lets just take nback from the global namespace
var nback = {};
// data that we gather from user inputs will be
// appended to this object
nback.result = {};
nback.result.reactions = [];

// and the main code
nback.program = {
    currentTimeoutVariable: null,
    currentDataElement: 0,
    lastShowTime: -100,
    
    
    init : function() {
        // init result variables
        nback.result.testType = nback.config.testType;
    
        // init binds keys for functions
        // 
        // use keydown to get the action as fast as possible
        // check http://css-tricks.com/snippets/javascript/javascript-keycodes/
        // for other keycodes
        $(document).keydown(function(e) {                
            switch (e.which) {
                case 32: // space bar
                    nback.program.pressedSpace();
                    e.preventDefault();
                    break;
                case 90: // z
                    nback.program.pressedLeft();
                    break;
                case 190: // .
                    nback.program.pressedRight();
                    break;
            }
        });
    },
            
    isAnswerCorrect: function(keyPressed, elementShown) {
        switch (nback.config.testType) {
            case "REACTION":
                return true;
            case "NUMBERREACTION":
                var num = Number(elementShown.text);
                if(num % 2 === 0 && keyPressed === "RIGHT") {
                    return true;
                }
                
                if(num % 2 === 1 && keyPressed === "LEFT") {
                    return true;
                }
                
                return false;
        }
        
        alert("No such test type yet configured. See function isAnswerCorrect in nback.js");
        
    },
    
    start : function() {
        startTime = $.now();
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
        $("#divider").html("&nbsp;");
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
        
        nback.result.reactions.push({
            index: nback.program.currentDataElement,
            reactionTime: $.now() - nback.program.lastShowTime,
            pressed: "RIGHT",
            correct: nback.program.isAnswerCorrect("RIGHT", nback.config.elements[nback.program.currentDataElement])
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
        
        nback.result.reactions.push({
            index: nback.program.currentDataElement,
            reactionTime: $.now() - nback.program.lastShowTime,
            pressed: "LEFT",
            correct: nback.program.isAnswerCorrect("LEFT", nback.config.elements[nback.program.currentDataElement])
        });
        
        nback.program.hideAndWaitForNext();                    
    },
            
    pressedSpace: function() {
        if(nback.program.lastShowTime === -100) {
            console.log("pressed left too early");
            return;
        }
        
        if(nback.program.lastShowTime === -1) {
            console.log("pressed left too late");
            return;
        }
        
        nback.result.reactions.push({
            index: nback.program.currentDataElement,
            reactionTime: $.now() - nback.program.lastShowTime,
            pressed: "SPACE",
            correct: nback.program.isAnswerCorrect("SPACE", nback.config.elements[nback.program.currentDataElement])
        });
        
        nback.program.hideAndWaitForNext();                    
    },
    
    end: function() {
        console.log("Thx!");
        nback.program.lastShowTime = -1;
        nback.program.clear(); 
        
        $("#top").html(nback.config.endText);
        
        console.log(JSON.stringify(nback.result));

        $.post( nback.config.backendAddress, { data: JSON.stringify( nback.result ) }, $.noop );
        $.post( './data/log.php', { data: JSON.stringify( nback.result ) }, $.noop );
    }
}
