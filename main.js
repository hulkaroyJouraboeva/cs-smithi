document.addEventListener('DOMContentLoaded', function () {
  // SHOW FULL CALENDAR FEATURE 
  // creates the iframe schedule element
  const showScheduleButton = document.getElementById("show-schedule");
  const schedule = document.createElement('iframe');
  schedule.src = 'https://calendar.google.com/calendar/embed?src=c_9qtn0db3bh1leu1t6ueun0jutk%40group.calendar.google.com&ctz=America%2FNew_York'
  schedule.style = 'border: 0';
  schedule.width = '350';
  schedule.height = '350';
  schedule.frameborder = '0';
  schedule.style.scrolling = 'no';
  // using show to toggle seeing the full calendar
  let showCalendar = false;
  // adding eventListener. On click show full calendar, click again don't show.
  showScheduleButton.addEventListener("click", function() {
    if(showCalendar) schedule.remove();
    else document.body.appendChild(schedule);
    showCalendar = !showCalendar;
  });

  // DISPLAY memes
  fetch('https://programmermemes.herokuapp.com/', {
    method: "GET", 
    mode: 'cors',
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
    })
    .then((data) => data.json())
    .then((data) => {
      console.log(data.memes);
    }) 
    .catch((error) => console.log("error: ", error));



  // Testing Audio/music integration
  let showMusic = false;
  const lofiButton = document.querySelector('#lofi');
  const iframe = document.createElement('iframe');
  iframe.width= '350';
  iframe.height='350';
  iframe.src="https://www.youtube.com/embed/5qap5aO4i9A?autoplay=1";
  iframe.title="YouTube video player";
  iframe.frameborder="0";
  iframe.allow="autoplay";
  iframe.allowfullscreen=true;

  lofiButton.addEventListener("click", () => {
    if (showMusic) iframe.remove();
    else document.body.appendChild(iframe);
    showMusic = !showMusic;
  });


  
  //DISPLAY RANDOM MOTIVATIONAL QUOTE 
  const quoteP = document.createElement('p');
  quoteP.setAttribute('id', 'quote');
  quoteP.style.fontSize = '16px';
  quoteP.style.padding = '5px';
  let showQuote = false;
  const quoteButton = document.querySelector('#inspiration');
  quoteButton.addEventListener("click", function() {
    if(showQuote) quoteP.remove();
    else {
      const randomIndex = Math.floor(Math.random() * 24);
      const quote = quotes[randomIndex];
      quoteP.textContent = quote;
      quoteP.style.borderStyle = 'ridge';
      document.body.appendChild(quoteP);
    }
    showQuote = !showQuote;
  });

  // DISPLAY NEXT EVENT FEATURE
  // creates the next Event display
  (function showEvents() {
    chrome.identity.getAuthToken({interactive: true}, function(token) {
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
        .then((formattedData) => {
          console.log(formattedData);
          const events = formattedData['items'];
          const todaysDate = removeTime(new Date().toISOString());
          const todaysEvents = [];
          // grabs all events happening today and stores in todaysEvents
          for(let i = 0; i < events.length; i++) {
            if(removeTime(events[i]['start']['dateTime']) === todaysDate ) {
              todaysEvents.push(events[i]);
            }
          }
          console.log(todaysEvents);
          // sorts todaysEvents
          todaysEvents.sort(function(a,b){
            const aConverted = Number(removeDate((a.start.dateTime)).replaceAll(':',''));
            const bConverted = Number(removeDate((b.start.dateTime)).replaceAll(':',''));
            return aConverted - bConverted;
          });
          // find the next upcoming event
          const timeNow = Number(new Date().toLocaleString('en-US', {hour12: false}).slice(10,16).replaceAll(':','')); 
          
          let nextEvent;
          let startTime;
          for(let i = 0; i < todaysEvents.length; i++) {
            if(timeNow < Number(removeDate((todaysEvents[i].start.dateTime)).replaceAll(':',''))){
              console.log(Number(removeDate((todaysEvents[i].start.dateTime)).replaceAll(':','')));
              nextEvent = todaysEvents[i];
              startTime = removeDate((todaysEvents[i].start.dateTime));
              break;
            }
          }
          //add the upcoming event's information to the display div
          const displayDiv = document.getElementById('next-event');
          displayDiv.innerHTML += ` ${startTime}`;
          displayDiv.innerHTML += `<br/>${nextEvent.summary}<br/>`;
          displayDiv.innerHTML += `<br/>${nextEvent.description}`;
          displayDiv.innerHTML += `<br/><a href="${nextEvent.location}">${nextEvent.location}</a>`;
          // const link = document.createElement('a');
          // link.href = `${nextEvent.location}`;
          // console.log(link.href);
          // displayDiv.appendChild(link);
          
        })
        .catch((error) => console.log('Error occurred: ', error));
    });
  })();
});


function removeTime(dateTime) { 
  return dateTime.slice(0, 10);
}

function removeDate(dateTime) {
  return dateTime.slice(11,16);
}

const quotes = ['No one can make you feel inferior without your consent. -Eleanor Roosevelt',
                'I can be changed by what happens to me. But I refuse to be reduced by it. —Maya Angelou',
                'Do not let what you cannot do interfere with what you can do. — John Wooden',
                'We gain strength, and courage, and confidence by each experience in which we really stop to look fear in the face....We must do that which we think we cannot. —Eleanor Roosevelt', 
                'Don\'t wait until everything is just right. It will never be perfect. There will always be challenges, obstacles and less than perfect conditions. So what? Get started now. With each step you take, you will grow stronger and stronger, more and more skilled, more and more self-confident, and more and more successful. ­—Mark Victor Hansen',
                'Courage is resistance to fear, mastery of fear, not absence of fear. —Mark Twain',
                'Trust yourself—you know more than you think you do. —Benjamin Spock',
                'You wouldn\'t worry so much about what others think of you if you realized how seldom they do. —Eleanor Roosevelt',
                'Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence. —Helen Keller',
                'Confidence comes from discipline and training. —Robert Kiyosaki',
                'Through my education, I didn\'t just develop skills, I didn\'t just develop the ability to learn, but I developed confidence. —Michelle Obama',
                'Style is whatever you want to do if you can do it with confidence. —George Clinton',
                'I\'ve always believed that success for anyone is all about drive, dedication, and desire, but for me, it\'s also been about confidence and faith. —Stephen Curry',
                '“I have confidence about my life that comes from standing tall on my own two feet. —Jane Fonda',
                'Confidence comes from hours and days and weeks and years of constant work and dedication. —Roger Staubach',
                'Confidence is not, "they will like me." Confidence instead is, "I\'ll be fine if they don\'t. —Christina Grimmie',
                'For me, it\'s always been about preparation, and the more prepared I can be each week, the less pressure I feel and the more confident I am. As your confidence grows, it\'s only natural that the pressure you feel diminishes. —Aaron Rodgers',
                'When something is important enough, you do it even if the odds are not in your favor. -Elon Musk',
                'The secret of getting ahead is getting started. —Mark Twain',
                'I\'ve missed more than 9,000 shots in my career. I\'ve lost almost 300 games. 26 times I\'ve been trusted to take the game winning shot and missed. I\'ve failed over and over and over again in my life, and that is why I succeed. —Michael Jordan',
                'Everything you can imagine is real.―Pablo Picasso',
                'Look inside, without anyone else\'s validation understand that you are valuable, talented, unique, and worthy. -Joe Sacco',
                'You\'re off to great places, today is your day. Your mountain is waiting, so get on your way. -Dr. Seuss',
                'You always pass failure on the way to success. -Mike Rooney',
                'No one is perfect - that\'s why pencils have erasers. Wolfgang Riebe']         