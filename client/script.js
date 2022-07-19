let email = "vincent@gmail.com"
let url = 'http://localhost:3001/habits'

let nav = 0; //to keep track of the month we are on
let clicked = null; //whichever day we have clicked on 
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
//array of event objects - you can only store strings in localstorage so we use JSON.parse
const calendar = document.getElementById('calendar');
const newEventModal = document.getElementById('newEventModal');
const deleteEventModal = document.getElementById('deleteEventModal');
const backDrop = document.getElementById('modalBackDrop');
const eventTitleInput = document.getElementById('eventTitleInput');
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const dateInput = document.getElementById('date')

function openModal(date) {
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }

  backDrop.style.display = 'block';
}

async function load() {

  //fetch data
  // const res = await fetch( "http://localhost:3001/habits/id/62d6ae5eeb6058acdb4933d2");
  // const searchData = await res.json();
  // console.log(searchData)
  // const array = []
  // const data = await searchData.map(search => search.dates)
  // for(i =0; i < searchData.dates.length; i++){
  //   array.push(searchData.dates)
  // }
  // const dArray = JSON.stringify(array)
  // const data_string =  JSON.stringify(data)
  // console.log(dArray)   


  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for(let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');

    const dayString = `${month + 1}/${i - paddingDays}/${year}`;
    daySquare.setAttribute('id', dayString)

    if (i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);

      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'currentDay';
      }

      if (eventForDay) {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('event');
        eventDiv.innerText = eventForDay.title;
        daySquare.appendChild(eventDiv);
      }

      daySquare.addEventListener('click', () => openModal(dayString));
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);   
    
    
  }

  loadStatus()
}

async function loadStatus(){

    const res = await fetch( "http://localhost:3001/habits/id/62d6ae5eeb6058acdb4933d2");
    const searchData = await res.json();
    // console.log(searchData)
    const habitDates = await searchData.dates;
    // console.log(habitDates)
    const data_string = await habitDates.map(search => search)
    // const data_string =  JSON.stringify(data)
    console.log(data_string)

    const calendar = document.querySelectorAll('.day')
    // console.log(calendar)

    console.log(calendar.length)

    for( i = 0; i < calendar.length; i++){
      let calendarId = calendar[i].id
      // console.log(calendarId)
      for(j = 0; j < data_string.length; j++) {
        let data_stringId = data_string[j].date
        console.log(data_string[j])
        if(calendarId == data_stringId){
          if(data_string[j].complete == "complete"){
            let daySquare = document.getElementById(calendarId)
            daySquare.style.backgroundColor = "green"
          } else if (data_string[j].complete == "incomplete"){
            let daySquare = document.getElementById(calendarId)
            daySquare.style.backgroundColor = "red"
          }
        }
      }
    }
}

function closeModal() {
  eventTitleInput.classList.remove('error');
  newEventModal.style.display = 'none';
  deleteEventModal.style.display = 'none';
  backDrop.style.display = 'none';
  eventTitleInput.value = '';
  clicked = null;
  load();
}

function saveEvent() {
  if (eventTitleInput.value) {
    eventTitleInput.classList.remove('error');

    events.push({
      date: clicked,
      title: eventTitleInput.value,
    });

    localStorage.setItem('events', JSON.stringify(events));
    closeModal();
  } else {
    eventTitleInput.classList.add('error');
  }
}

function deleteEvent() {
  events = events.filter(e => e.date !== clicked);
  localStorage.setItem('events', JSON.stringify(events));
  closeModal();
}

function initButtons() {
  document.getElementById('nextButton').addEventListener('click', () => {
    nav++;
    load();
  });

  document.getElementById('backButton').addEventListener('click', () => {
    nav--;
    load();
  });

  document.getElementById('saveButton').addEventListener('click', saveEvent);
  document.getElementById('cancelButton').addEventListener('click', closeModal);
  document.getElementById('deleteButton').addEventListener('click', deleteEvent);
  document.getElementById('closeButton').addEventListener('click', closeModal);
}

dateInput.value = new Date().toLocaleDateString()

console.log(dateInput.value)

function padTo2Digits(num)  {
  return num.toString().padStart(2, '0')
}

function formatData(date = new Date()){
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-')
}


initButtons();
load();


//additions

let checkBtn = document.querySelector('#check-button')

checkBtn.addEventListener('click', tickOff)

async function tickOff(e){
  e.preventDefault()

  console.log(e)
  const targetDate = e.target.parentNode[0].value
  const status = e.target.parentNode[1].value

  // console.log(targetDate, status)

  //transform date
  let dateArray = targetDate.split('-')
  let date = `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`

  if(date[0] == "0" && date[3] == "0"){
    date = date.replace(date[0],"")
    date = date.replace(date[2],"")
    // console.log(date)
  } else if(date[0] == "0"){
    date = date.replace(date[0],"")
  } else if(date[3] == "0"){
    date = date.replace(date[3],"")
  } else {
    date;
  }

  //assign styling
  const square = document.getElementById(date)

  const calendar = document.querySelectorAll('.day')
  console.log(calendar)
  // console.log(data_string);

  if(status == "complete"){
    square.style.backgroundColor = "green"
  } else if (status == "incomplete"){
    square.style.backgroundColor = "red"
  }

}

/** populate habit drop down - assign habit to database */

const submitBtn = document.getElementById('submit-button')
const habitForm = document.getElementById('habit-form')

//create a new habit, post to backend, assign new habit id to html tag
habitForm.addEventListener('submit', async (e) => {

  e.preventDefault()
  console.log(e)

  const habitData = {
    content: e.target.childNodes[3].value,
    email: email
  }
  // console.log(habit)

  //first check whether habit is in habit list - if so send error note ELSE send new habit to the backend
  //once new habit sent to backend, perform get request and associate habit id to habit drop down value id

  const options = {
    method: 'POST',
    body: JSON.stringify(habitData),
    // body: postData,
    headers: { "Content-Type": "application/json" }
};

  const response = await fetch(url, options)

  let newData = await getUserHabits(habitData.content)
  console.log(newData)

  //write id to habit on frontend
  const newHabit = newData.filter( h => h.content == habitData.content)
  console.log(newHabit[0]._id)

  const habitSelector = document.getElementById('habit-selector')
  // console.log(habitSelector)
  const option = document.createElement('option')
  option.textContent = habitData.content
  option.value = habitData.content
  option.setAttribute('id', newHabit[0]._id)

  habitSelector.appendChild(option)


})

async function getUserHabits(content){

  const response = await fetch(`${url}/${email}`)
  const data = await response.json() 
  return data
}
