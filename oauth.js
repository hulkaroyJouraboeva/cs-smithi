// window.onload = function() {
  
(function showEvents() {
  chrome.identity.getAuthToken({interactive: true}, function(token) {
    console.log(token);
    const eventsURL = 'https://www.googleapis.com/calendar/v3/calendars/c_9qtn0db3bh1leu1t6ueun0jutk@group.calendar.google.com/events';


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
      .then((formattedData) => console.log(formattedData))
      .catch((error) => console.log('Error occurred: ', error));
  });
})();

//}; this bracket goes with window.onload 
  


// window.onload = function() {
//   document.querySelector('button').addEventListener('click', function() {
//     chrome.identity.getAuthToken({interactive: true}, function(token) {
//       let init = {
//         method: 'GET',
//         async: true,
//         headers: {
//           Authorization: 'Bearer ' + token,
//           'Content-Type': 'application/json'
//         },
//         'contentType': 'json'
//       };

//       fetch('https://people.googleapis.com/v1/contactGroups/all?maxMembers=20&key=API_KEY', init)
//           .then((response) => response.json())
//           .then(function(data) {
//             console.log(data)
//           });
//     });
//   });
// };