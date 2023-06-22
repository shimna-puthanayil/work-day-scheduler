// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    var messageTimerCount = 2;
    var dayDisplayEl = $('#currentDay');
    function successMessageTimer() {
        // Sets timer
        successTimer = setInterval(function () {
          if (messageTimerCount === 0) {
            // Clears interval and stops timer
            clearInterval(successTimer);
            $('#message').text("");
            $('#icon').addClass('invisible');
          }
          else {
            messageTimerCount--;
          }
        }, 1000);
      }
    function saveEventsToStorage() {
        var eventId = $(this).parent('div').attr('id');
        var eventText = $(this).parent().children().eq(1).val();

        localStorage.setItem(eventId, eventText);
        $('#message').text("Appointment added to local storage .");
        $('#icon').removeClass('invisible');
        $('#icon').addClass('visible');
        successMessageTimer();
    }
    //  Added a listener for click events on the save button. 
    var mainDivEl = $('#time-block-display');
    mainDivEl.on('click', '.saveBtn', saveEventsToStorage); 
    
    //Display color coded  time blocks according to the current time .
    var currentHour = dayjs().format('H');
  var divElements = mainDivEl.children('div');
    for (var i = 0; i < divElements.length; i++) {
        var time = divElements.eq(i).attr('id');
        var timeOfBlock = time.substring(5, 7);
       
        if (parseInt(timeOfBlock) > currentHour) {
            
            mainDivEl.children('div').eq(i).addClass('future');
        }
        else if (parseInt(timeOfBlock) < currentHour) {
            mainDivEl.children('div').eq(i).addClass('past');
        }
        else {
            mainDivEl.children('div').eq(i).addClass('present');
        }
    }

    //Get events from local storage and displays to corresponding time blocks.
    for (var i = 0; i < divElements.length; i++) {
        var eventId = divElements.eq(i).attr('id');
        var eventText=localStorage.getItem(eventId);
        if(eventText!=""&&eventText!=null)
        {
            divElements.eq(i).children(1).val(eventText);   
        }
       
        
    }
   
    // TODO: Add code to display the current date in the header of the page.
    var currentDay = dayjs().format('dddd, MMMM D, YYYY');
    dayDisplayEl.text(currentDay);
});
