document.addEventListener("DOMContentLoaded", () =>{
    const chartForm = document.querySelector('.chart-form');

    chartForm.addEventListener('submit', async (e) => {
        let email = "vincent@gmail.com";
        let url = 'http://localhost:3001/habits'
        e.preventDefault();
        console.log(e.target[0].value)
        console.log(e.target[1].value)
        timeperiod = e.target[1].value
        console.log(habit_name)
        console.log(habit_id)
        console.log(habit_dates)
        console.log(habit_name.length)
        for(i=0; i<habit_name.length;i++){
            if(e.target[0].value == habit_name[i]){
                const findName = habit_name[i]
                const findId = habit_id[i]
                console.log(findName)
                console.log(findId)
                console.log("SIUU")
                console.log(findId)
                getTheInfo(email, findId, url, timeperiod)   
            }
        }
    })

})

// async function getOrder(){
//     const searchList = await getTheInfo()
//     console.log(searchList)

// }


async function getUserHabits(url, email){
    try{
        const options = {
            headers: new Headers({'Authorization': localStorage.getItem('token')}),
        }
        const response = await fetch(`${url}/${email}`, options);
        const data = await response.json();
        console.log(data)
        if(data.err){
            throw new Error(data.err)
        }
        console.log("SUCCESFULY")
        return data;

    }catch (err) {
        console.log("FAILD")
        console.warn(err);
        location.assign = 'login.html'
    }
    // const response = await fetch(`${url}/${email}`)
    // const habit_data = await response.json()
    // return habit_data
}

async function getTheInfo(email, findId, url, timeperiod){
    const search_data = await getUserHabits(url, email);
    // console.log(search_data)
    // const habit_data = JSON.parse(JSON.stringify(search_data))
    // console.log(habit_data)
    const res = await fetch( `${url}/id/${findId}`);
    const searchData = await res.json();
    const habitDates = await searchData.dates;
    const data = habitDates
    const data_string = await JSON.parse(JSON.stringify(data))
    data_string.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    
    function formatDate(date) {
        return [
          padTo2Digits(date.getMonth() + 1),
          padTo2Digits(date.getDate()),
          date.getFullYear(),
        ].join('/');
    }

    data_string.forEach(item => formatDate(new Date(item)))

    console.log(data_string)
    console.log(data_string)
    let startDate = new Date();
    console.log('timeperiod')
    console.log(timeperiod)
    console.log(data_string)
    if(timeperiod == 'all'){
        startDate = new Date(data_string[data_string.length-1].date)
        console.log("SADSD")
        console.log(startDate)
    }
    if(timeperiod == 'year'){
        startDate.setFullYear(startDate.getFullYear()-1);
    }
    else if(timeperiod == 'month'){
        startDate.setMonth(startDate.getMonth()-1);
    }
    else if(timeperiod == 'week'){
        startDate.setDate(startDate.getDate() - 7);
    }
    console.log(startDate)
    let endDate = new Date()
    console.log(endDate)
    Date_data_string = []
    for(i=0; i<data_string.length; i++){
        Date_data_string.push(new Date(data_string[i].date))
    }
    console.log(Date_data_string)
    const sortedDate = []
    const sortedComplete = []
    console.log(endDate>startDate)
    for(i=0;i<Date_data_string.length;i++){
        console.log(Date_data_string[i])
        if (Date_data_string[i] >= startDate){
            console.log(i)
            console.log('SADD')
            sortedDate.push(data_string[i].date)
            sortedComplete.push(data_string[i].complete)
        }
        else{
            console.log("NOT IN LIST",i)
        }
    }
    console.log(sortedDate)
    console.log(sortedComplete)

    let completedCount = 0;
    let uncompletedCount = 0;
    sortedComplete.forEach(element =>{
        if (element == "complete"){
            completedCount +=1
        }
        else if (element == "incomplete"){
            uncompletedCount +=1
        }
    })
    console.log(completedCount)
    console.log(uncompletedCount)
    let labels = ['uncompleted', 'completed']
            let itemData = [uncompletedCount, completedCount]

            const chartData = {
                labels: labels,
                datasets: [{
                    data: itemData,
                    backgroundColor: ['rgb(239, 21, 76)', 'rgb(59, 206, 131)'],
                    tension: 0.1,
                    hoverBoardColor: 'red'
                }]
            };

            const config = {
                type: 'pie',
                data: chartData,
                options: {
                    plugins: {
                        legend: {
                            display: true
                        },
                        title: {
                            display: true,
                            text: 'Habit completion over by year'
                        }
                    }
                }
            }
            chart1 = new Chart(
                // chart.destroy(),
                document.getElementById('myChart'),
                config
            )
            const chartForm = document.querySelector('.chart-form');
            chartForm.addEventListener('submit', async (e) => {
                chart1.destroy();
            })
            
            
}

async function getInfo(){
    let email = "vincent@gmail.com";
    let id = "62d82326961275760bbd2858";
    let url = 'http://localhost:3001/habits'
    const res = await fetch( `${url}/id/${id}`);
    const searchData = await res.json();
    const habitDates = await searchData.dates;
    const data = await habitDates.map(search => search.complete)
    const data_string = JSON.parse(JSON.stringify(data))
    return(data_string)
}

async function load(){
    protected = await protectedRoute();
    let habitSelector = document.getElementById('habit-select')
    console.log(habitSelector)
    let email = "vincent@gmail.com";
    let id = "62d82326961275760bbd2858";
    let url = 'http://localhost:3001/habits'
    const search_data = await getUserHabits(url, email);
    // console.log(search_data)
    // const habit_data = JSON.parse(JSON.stringify(search_data))
    // console.log(habit_data)
    habit_name = []
    habit_id = []
    habit_dates = []
    habitSelector.textContent = ""
    console.log(search_data)
    for (i=0;i<search_data.length;i++){
        console.log("INSIDE")
        habit_id.push(search_data[i]._id)
        habit_name.push(search_data[i].content)
        habit_dates.push(search_data[i].dates)
        let options = document.createElement('option')
        options.textContent =search_data[i].content
        options.setAttribute('value', search_data[i].content)
        console.log(options)
        habitSelector.appendChild(options)
    }
    console.log(habitSelector)
    console.log("SIUU")
    // console.log(habit_name)
    // console.log(habit_id)
    // console.log(habit_dates)

    completed_list = await getInfo()
    console.log(completed_list)
    console.log("FINISH")
    let completedCount = 0;
    let uncompletedCount = 0;
    completed_list.forEach(element =>{
        if (element == "complete"){
            completedCount +=1
        }
        else if (element == "incomplete"){
            uncompletedCount +=1
        }
        else{
            console.log("SIUU")
        }
    })
    console.log(completedCount)
    console.log(uncompletedCount)
    // let labels = ['uncompleted', 'completed']
    //         let itemData = [uncompletedCount, completedCount]

    //         const data = {
    //             labels: labels,
    //             datasets: [{
    //                 data: itemData,
    //                 backgroundColor: ['rgb(239, 21, 76)', 'rgb(59, 206, 131)'],
    //                 tension: 0.1,
    //                 hoverBoardColor: 'red'
    //             }]
    //         };

    //         const config = {
    //             type: 'pie',
    //             data: data,
    //             options: {
    //                 plugins: {
    //                     legend: {
    //                         display: true
    //                     },
    //                     title: {
    //                         display: true,
    //                         text: 'Habit completion over by year'
    //                     }
    //                 }
    //             }
    //         }
            
    //         var chart = new Chart(
    //             document.getElementById('myChart'),
    //             config
    //         );

    const div_footer = document.querySelector('.footer')
    console.log(div_footer)
    username_local = localStorage.getItem("username")
    console.log(username_local)
    const footer = document.createElement("p")
    footer.textContent = "Welcome, " +  username_local
    footer.setAttribute("id", "username_local")
    div_footer.append(footer)
    console.log("FOOTER ADDED")


    
}

load()

