'use strict'

const progUrl = "https://xkcd.com/info.0.json"

const programmer = new XMLHttpRequest()
programmer.open('GET', progUrl)
programmer.send()

programmer.onload = ()=>{
    console.log(JSON.parse(programmer.response))
}

axios.get('https://xkcd.com/info.0.json')
.then(function (response){
    console.log(response)
})
.catch(err => console.log(err));

let img =document.body.getElementsByTagName('img')
img.src="https://xkcd.com/info.0.json"
