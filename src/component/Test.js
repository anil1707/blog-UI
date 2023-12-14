import React from 'react'
import axios from 'axios'

const Test = () => {
    let email = "anil@gmail.com"
    let password = "anil"
    const callApi = async() =>{
      let data =  await axios.get("/user/login", {
        
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
       })
       

       console.log(JSON.stringify(data));
    }
  return (
    <div>
        <button onClick={callApi}>test</button>
    </div>
  )
}

export default Test