'use strict'

const APIUrl = "https://www.randomuser.me/api"

const first  = new XMLHttpRequest()
first.open('GET',APIUrl);
first.send()

first.onload = ()=>{
    console.log(JSON.parse(first.response));
};

// axios.require('axios').default;
// axios.get('https://www.randomuser.me/api')
// .then( function (response){
//     console.log(response)
// });
// .catch(err => console.log(err));
