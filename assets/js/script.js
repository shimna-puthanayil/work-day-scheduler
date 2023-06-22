// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
    var dayDisplayEl = $('#currentDay');
    
    function saveEventsToStorage() {
        var eventId = $(this).parent('div').attr('id');
        var eventText = $(this).parent().children().eq(1).val();

        localStorage.setItem(eventId, eventText);
        $('#message').text("Appointment added to local storage .");
        $('#icon').attr('style','visibility:visible');
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
            // if ((dayjs().format('H')).isBefore(timeOfBlock)) {
            mainDivEl.children('div').eq(i).addClass('future');
        }
        // else if (dayjs().isAfter(timeOfBlock)) {
        else if (parseInt(timeOfBlock) < currentHour) {
            mainDivEl.children('div').eq(i).addClass('past');
        }

        else {
            mainDivEl.children('div').eq(i).addClass('present');
        }
    }

    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
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
