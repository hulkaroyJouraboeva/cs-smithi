// listen to a click event on both buttons

(function showEvents() {
  const eventsURL = 'https://www.googleapis.com/calendar/v3/calendars/c_9qtn0db3bh1leu1t6ueun0jutk@group.calendar.google.com/events';

  chrome.identity.getAuthToken({ interactive: true }, function(token) {
    console.log(token);

    const fetch_options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    };
    
    fetch(`${eventsURL}`, fetch_options)
      .then((data) => data.json())
      .then((formattedData) => console.log(formattedData))
      .catch((error) => console.log('Error occurred: ', error));

  });

  // 122366426078-qkivld820lbnq5pt18vaoaf2ddb9ehia.apps.googleusercontent.com

})()



