'use strict'

function xmlImg() {
    const progUrl = "https://xkcd.now.sh/?comic=568"
    const prog = new XMLHttpRequest()
    prog.onload = () => {
        if (prog.readyState === 4 && prog.status === 200) {
            console.log(JSON.parse(prog.response));
            let img = document.body.querySelector('#img')
            img.src = "https://imgs.xkcd.com/comics/well_2.png";
        } else {
            (err) =>
            console.log(err)
        }
        prog.open('GET', progUrl);
        prog.send();

    }
}
xmlImg();


function axiosImg() {
    const progUrl = "https://xkcd.now.sh/?comic=568"
    axios.get(progUrl)
        .then(function (response) {
            console.log(response)
            let img = document.body.querySelector('#img')
            img.src = "https://imgs.xkcd.com/comics/well_2.png"
        })
        .catch(err => console.log(err));
}

axiosImg();