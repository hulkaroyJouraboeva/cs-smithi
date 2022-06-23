// listen to a click event on both buttons

(function showEvents() {
  const eventsURL = 'https://www.googleapis.com/calendar/v3/calendars/c_9qtn0db3bh1leu1t6ueun0jutk@group.calendar.google.com/events';

  fetch(`${eventsURL}`)
    .then((data) => data.json())
    .then((formattedData) => console.log(formattedData))
    .catch((error) => console.log('Error occurred: ', error));

})()



