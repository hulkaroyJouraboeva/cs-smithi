// window.onload = function() {
  
(function showEvents() {
  chrome.identity.getAuthToken({interactive: true}, function(token) {
    console.log(token);
    const eventsURL = 'https://www.googleapis.com/calendar/v3/calendars/c_9qtn0db3bh1leu1t6ueun0jutk@group.calendar.google.com/events';
    // const API = 'AIzaSyBWKGUQBwaaZBuaeu9tdjD9-_fRrvIkwG4';
    // const eventsURL = `https://www.googleapis.com/calendar/v3/calendars/c_9qtn0db3bh1leu1t6ueun0jutk@group.calendar.google.com/events?key=${API}`;

    const fetch_options = {
      method: 'GET',
      async: true,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    };
    
    fetch(`${eventsURL}`, fetch_options)
      .then((data) => data.json())
      .then((formattedData) => {
        const events = formattedData['items'];
        const todaysDate = removeTime(new Date().toISOString());
        const todaysEvents = [];
        console.log(todaysDate);
        console.log(removeTime(events[0]['start']['dateTime']));
        for(let i = 0; i < events.length; i++) {
          if(removeTime(events[i]['start']['dateTime']) === todaysDate ) {
            console.log('working');
            todaysEvents.push(events[i]);
          }
        }

        todaysEvents.sort(function(a,b){
          const aConverted = Number(removeDate((a.start.dateTime)).replaceAll(':',''));
          const bConverted = Number(removeDate((b.start.dateTime)).replaceAll(':',''));
          return aConverted - bConverted;
        });
      })
      .catch((error) => console.log('Error occurred: ', error));
  });
})();

//}; this bracket goes with window.onload 
  
function removeTime(dateTime) { 
  return dateTime.slice(0, 10);
}

function removeDate(dateTime) {
  return dateTime.slice(11,16);
}




/*

  Progress: 
    Base extension is set up
    Got Calendar Data
    Sorted Data by date and hour


  To Do:
    Show the next event as popup
      Dompare the next event time to current time (Date.now(), ISO Standard) 
      Attach next event to DOM, minimal styling 
    Mood Lifter/Rain Cats: 
      quotes data stored statically
      extension: play lofi music when click on the button above
        <audio controls>
          <source src="horse.ogg" type="audio/ogg">
          <source src="horse.mp3" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      extension: random cat/dog pics/videos (without the lofi audio)
      
*/