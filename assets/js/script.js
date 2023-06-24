// Wrapped all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    var messageTimerCount = 2;
    var dayDisplayEl = $('#currentDay');

    //A timer is set to display an alert message for a short interval of time after an event is saved to local storage.
    function successMessageTimer() {
        // Sets timer
        successTimer = setInterval(function () {
            if (messageTimerCount === 0) {
                // Clears interval and stops timer
                clearInterval(successTimer);
                $('#alertDiv').remove();
            }
            else {
                messageTimerCount--;
            }
        }, 1000);
    }

    //Live alert message after save
    var alertPlaceholder = $('#liveAlertPlaceholder');
    function alert(message, type) {
        var wrapper = $('<div id="alertDiv" class=" d-flex align-items-center justify-content-center" role="alert">');
        var messageSuccess = $('<div class="alert alert-' + type + ' messageDiv" >' + message + '</div > ');
        alertPlaceholder.append(wrapper);
        wrapper.append(messageSuccess);
    }

    //Save events and time  to local storage 
    function saveEventsToStorage() {
        var eventId = $(this).parent('div').attr('id');
        var eventText = $(this).parent().children().eq(1).val();
        if (eventText.trim() != "") {
            localStorage.setItem(eventId, eventText);
            alert('Event added to <span class="messageSpan">local storage</span><i class="fas fa-thin fa-check fa-2xs p-1" style="color: #060709;"></i>', 'light');
            successMessageTimer();
        }
        else {
            alert('Event can not be <span class="messageSpan">empty </span> <i class="fas fa-thin  fa-exclamation fa-2xs p-1 exclamation-size" style="color: #dc769b;"></i>', 'light');
            successMessageTimer();
        }
    }


    //  Added a listener for click events on the save button. 
    var mainDivEl = $('#time-block-display');
    mainDivEl.on('click', '.saveBtn', saveEventsToStorage);

    //Display color coded time blocks which specifies whether the event is passed , coming or currently going on.
    var currentDate = dayjs().format('YYYY/MM/DD');
    var divElements = mainDivEl.children('div');
    for (var i = 0; i < divElements.length; i++) {
        var timeBlockId = divElements.eq(i).attr('id');
        var timeOfBlock = timeBlockId.substring(5, 7);
        var timeBlockHour = currentDate + ' ' + timeOfBlock;
        var currentHour = dayjs().startOf('h');
        var timeOfBlock = dayjs(timeBlockHour);
        //checks whether the time displayed in the block is in past .If so class past is applied to that block.
        if (timeOfBlock.isBefore(currentHour)) {
            mainDivEl.children('div').eq(i).addClass('past');
        }
        //checks whether the time displayed in the block is in future .If so class future is applied to that block.
        else if (timeOfBlock.isAfter(currentHour)) {
            mainDivEl.children('div').eq(i).addClass('future');
        }
        //if it is the current time then class 'present' is applied to the block.
        else {
            mainDivEl.children('div').eq(i).addClass('present');
        }
    }

    //Get events from local storage and displays to corresponding time blocks.
    for (var i = 0; i < divElements.length; i++) {
        var eventId = divElements.eq(i).attr('id');
        var eventText = localStorage.getItem(eventId);
        if (eventText != "" && eventText != null) {
            divElements.eq(i).children(1).val(eventText);
        }
    }

    // Code to display the current date in the header of the page.
    var currentDay = dayjs().format('dddd, MMMM D, YYYY');
    dayDisplayEl.text(currentDay);
});
