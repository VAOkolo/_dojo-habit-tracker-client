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
//additions
const habitList = document.getElementById('habit-selector')
const submitBtn = document.getElementById('submit-button')
const habitForm = document.getElementById('habit-form')
let checkBtn = document.querySelector('#check-button')
let messageBox = document.querySelector('.note-input')

//event listeners
//add status to specific day
checkBtn.addEventListener('click', tickOff)
//create habit
habitForm.addEventListener('submit', createHabit)
//load status on drop down change
habitList.addEventListener('change', loadStatus)


function openModal(date) {
  clicked = date;
  console.log(clicked)
  const eventForDay = events.find(e => e.date === clicked);

  if (eventForDay) {
    document.getElementById('eventText').innerText = eventForDay.title;
    deleteEventModal.style.display = 'block';
  } else {
    newEventModal.style.display = 'block';
  }

  backDrop.style.display = 'block';

  //give modal id that is date of the daySquare clicked
  messageBox.setAttribute('id',`${clicked}-d`)
  renderPost()
}

async function load() {  
  //generate calendar and calendar particulars
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

  //write habits to habit drop down - 
  let habitSelector = document.getElementById('habit-selector')
  let habitData = await getUserHabits(email)
  //loop through habits and add to drop down
  for(i = 0; i < habitData.length; i++){
    let options = document.createElement('option')
    options.textContent = habitData[i].content
    options.value = habitData[i].content
    options.setAttribute('id', habitData[i]._id)
    habitSelector.appendChild(options)
  }

  loadStatus()
}

async function loadStatus(){

    //get id from habit selector list and pass to fetch url
    const habitList = document.getElementById('habit-selector')
    const habit = document.getElementById('habit-selector').value
    //get id using habit name
    let id = "";
    //get id of first habit in habitList
    for(i=0; i < habitList.childNodes.length; i++){
      if(habitList.childNodes[i].textContent == habit){
        id = habitList.childNodes[i].id
      }
    }
    // console.log(id)

    const res = await fetch( `${url}/id/${id}`);
    const searchData = await res.json();
    const habitDates = await searchData.dates;
    const data_string = await habitDates.map(search => search)
    // console.log(data_string)

    const calendar = document.querySelectorAll('.day')
    // console.log(calendar)

    //clear styling - on each new habit selection
    for(i = 0; i < calendar.length; i++){
      let calendarId = calendar[i].id
      let daySquare = document.getElementById(calendarId)
      console.log(daySquare)
      daySquare.style.backgroundColor = ""
    }
    //loop through arrays, compare values and change styling on value
    for( i = 0; i < calendar.length; i++){
      let calendarId = calendar[i].id
      for(j = 0; j < data_string.length; j++) {
        let data_stringId = data_string[j].date
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
    // eventTitleInput.classList.remove('error');

    // events.push({
    //   date: clicked,
    //   title: eventTitleInput.value,
    // });

    // localStorage.setItem('events', JSON.stringify(events));
    const example = document.createElement('p')
    example.textContent = "lLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    newEventModal.appendChild(example)
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
async function tickOff(e){
  e.preventDefault()

  console.log(e)
  const targetDate = e.target.parentNode[0].value
  const status = e.target.parentNode[1].value
  const habitList = document.getElementById('habit-selector')
  const habit = document.getElementById('habit-selector').value

  let id = ""
  //duplicated on line 116 (loadStatus()) - refactor
  for(i=0; i < habitList.childNodes.length; i++){
    if(habitList.childNodes[i].textContent == habit){
      id = habitList.childNodes[i].id
    }
  }

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

  console.log(id)
  const habitData = {
    date: date,
    complete: status
  }

  const options = {
    method: 'PUT',
    body: JSON.stringify(habitData),
    headers: { "Content-Type": "application/json" }
};

  fetch(`${url}/${id}`, options)
            .catch(console.warn)

  //assign styling
  const square = document.getElementById(date)
  const calendar = document.querySelectorAll('.day')

  console.log(calendar)

  if(status == "complete"){
    square.style.backgroundColor = "green"
  } else if (status == "incomplete"){
    square.style.backgroundColor = "red"
  }

}

/** populate habit drop down - assign habit to database */
//create a new habit, post to backend, assign new habit id to html tag



async function createHabit(e){

  e.preventDefault()
  // assign all habits to array
  const habitArray = []
  const habitSelectorOptions = document.getElementById('habit-selector').childNodes
  habitSelectorOptions.forEach(h => {habitArray.push(h.textContent)})
  console.log(habitArray)

  let habit = e.target.childNodes[3].value.trim()

  if(!habit == "" && !habitArray.includes(habit)){

      console.log(habitArray.includes(habit))
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

    let newData = await getUserHabits(email)
    console.log(newData)
    
    //write id to habit on frontend
    const newHabit = newData.filter( h => h.content == habitData.content)
    console.log(newHabit[0]._id)

    
    // console.log(habitSelector)
    const habitSelector = document.getElementById('habit-selector')
    const option = document.createElement('option')
    option.textContent = habitData.content
    option.value = habitData.content
    option.setAttribute('id', newHabit[0]._id)

    habitSelector.appendChild(option)
}
}

async function getUserHabits(email){

  const response = await fetch(`${url}/${email}`)
  const data = await response.json() 
  return data
}

async function renderPost(){
  console.log(messageBox.id)
}
