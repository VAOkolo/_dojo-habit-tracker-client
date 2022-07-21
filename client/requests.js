async function getHabit(url, id){
    try {
        const response = await fetch(`${url}/id/${id}`);
        const data = await response.json();
        console.log(data)
        if(data.err){
            throw new Error(data.err)
        }
        return data;
    } catch (err) {
        console.log(err);
    }
}

async function protectedRoute(){
        try {
            const options = {
                headers: new Headers({'Authorization': localStorage.getItem('token')}),
            }
            const response = await fetch(`http://localhost:3001/auth/protected`, options);
            const data = await response.json();
            console.log(data)
            if(data.err){
                throw new Error(data.err)
            }
            return data;
        } catch (err) {
            console.warn(err);
            location.href = 'index.html'
        }
}

