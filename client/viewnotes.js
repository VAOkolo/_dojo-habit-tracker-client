let email = "vincent@gmail.com"
let url = 'http://localhost:3001/habits'
let habitSelector = document.getElementById('habit-selector')
let noteForm = document.getElementById('note-form')
let noteContainer = document.getElementById('note-container')

noteForm.addEventListener('submit', renderNotes)

async function load(){
    let habitData = await fetch(`${url}/${email}`)
    habitData = await habitData.json()
    console.log(habitData)

    if(habitSelector.value == ""){
        for(i = 0; i < habitData.length; i++){
          let options = document.createElement('option')
          options.textContent = habitData[i].content
          options.value = habitData[i].content
          options.setAttribute('id', habitData[i]._id)
          habitSelector.appendChild(options)
        }   
    }
}

async function renderNotes(e){
    noteContainer.innerHTML = ""
    e.preventDefault()
    console.log(e)

    let habit = e.target[0].value
    let month = e.target[2].value
    let year = e.target[1].value
    let id = getHabitId(habit)

    

    const response = await fetch(`${url}/id/${id}`)
    const data = await response.json()
    const dates = data.dates

    //convert date to date object
    dates.forEach(d =>{
        const [month, day, year] = d.date.split('/')
        const date = new Date(year, month-1, day)
        console.log(date)
        d.date = date
    })
    //sort on most recent
    const sortedDates = dates.sort((a, b) => new Date(b.date) - new Date(a.date))
    sortedDates.forEach(d => {
        if(d.date.getMonth() + 1 == month && d.date.getYear() && d.note.text != ""){
            // renderingArray.push(d)
            let date = d.date
            let note = d.note.text
            let noteDiv = document.createElement('div')
            console.log(noteDiv)
            let noteDate = document.createElement('p')
            let notePost = document.createElement('p')

            
            noteDate = date
            notePost = note
            noteDiv.append(noteDate)
            noteDiv.append(notePost)
            noteContainer.appendChild(noteDiv)
        }
    })
    //render post


}

function getHabitId(habit){

      //get id using habit name
      let id = "";
      //get id of first habit in habitList
      for(i=0; i < habitSelector.childNodes.length; i++){
        if(habitSelector.childNodes[i].textContent == habit){
          id = habitSelector.childNodes[i].id
        }
      }
      return id;
  }

load()
