$(function(){
    //variables
        var mode = 0;//App mode
        var timeCounter = 0;//time counter
        var lapCounter = 0;//lap counter
        var action;//variable for setInterval
        var lapNumber = 0;//Number of Laps
        var timeMinutes, timeSeconds, timeCentiSeconds, lapMinutes, lapSeconds, lapCentiSeconds;//minutes,seconds,centiseconds for time and lap
    
    //On App load show start and lap buttons
    hideShowButtons("#startButton","#lapButton");
    
    //click on startButton
    $("#startButton").click(function(){
        mode = 1;//mode on
        hideShowButtons("#stopButton","#lapButton");//show stop and lap buttons
        startAction();//start counter
    });
    
    //click on stopButton
    $("#stopButton").click(function(){
        //show resume and reset buttons
        hideShowButtons("#resumeButton","#resetButton");
        //stop counter
        clearInterval(action);
    });
    
    //click on resumeButton
    $("#resumeButton").click(function(){
        //show stop and lap buttons
        hideShowButtons("#stopButton","#lapButton");
        //start action
        startAction();
    });
    
    //click on resetButton
    $("#resetButton").click(function(){
        //reload the page
        document.location.reload();
    });
    
    //click on lapButton
    $("#lapButton").click(function(){
        //if mode is ON
        if(mode == 1){
            //stop action
            clearInterval(action);
            //resetLap and print lap details
            lapCounter = 0;
            addLap();
            //start action
            startAction();
        }
    }); 
    
    //function
    //show the parameter buttons while hiding the rest
    function hideShowButtons(x,y){
        $(".control").hide();
        $(x).show();
        $(y).show();
    }
    
    //start the Counter
    function startAction(){
        action = setInterval(function(){
            timeCounter++;
            if(timeCounter == 100*60*100){
                timeCounter = 0;
            }
            lapCounter++;
            if(lapCounter == 100*60*100){
                lapCounter = 0;
            }
            updateTime();
        },10)
    }
    
    //updateTime: converts counter to min, sec, centisec
    function updateTime(){
        //1min = 60*100centiseconds = 6000 centiseconds
        timeMinutes = Math.floor(timeCounter/6000);
        //1sec = 100 centiseconds
        timeSeconds = Math.floor((timeCounter % 6000) / 100);
        timeCentiSeconds = (timeCounter % 6000) % 100;
        
        $("#timeminute").text(format(timeMinutes));
        $("#timesecond").text(format(timeSeconds));
        $("#timecentisecond").text(format(timeCentiSeconds));
        
        //1min = 60*100centiseconds = 6000 centiseconds
        lapMinutes = Math.floor(lapCounter/6000);
        //1sec = 100 centiseconds
        lapSeconds = Math.floor((lapCounter % 6000) / 100);
        lapCentiSeconds = (lapCounter % 6000) % 100;
        
        $("#lapminute").text(format(lapMinutes));
        $("#lapsecond").text(format(lapSeconds));
        $("#lapcentisecond").text(format(lapCentiSeconds));
    }
    
    //format numbers
    function format(number){
        if(number < 10){
            return '0'+number;
        }
        else{
            return number;
        }
    }
    
    //addLap function: print Lap details inside the Lap box
    function addLap(){
        lapNumber++;
        var myLapDetails = '<div class="lap">'+
            
        '<div class="laptimetitle">'+
            'lap'+lapNumber+
            '</div>'+
            
            '<div class="laptime">'+
            '<span>'+ format(lapMinutes) +
        '</span>'+
            ':<span>'+ format(lapSeconds) +
        '</span>'+
            ':<span>'+ format(lapCentiSeconds) +
        '</span>'+
            '</div>'+
            
        '</div>';
        $(myLapDetails).prependTo("#laps");//prependTo will add the lap like stacks. we could also use appendTo that's also work fine but that will show us on ascending order.
    };
});





















