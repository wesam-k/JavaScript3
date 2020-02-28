'use strict'

const APIUrl = "https://www.randomuser.me/api"

const prog = new XMLHttpRequest()
prog.onload = () => {
    if (prog.readyState === 4 && prog.status === 200) {
        const data = (JSON.parse(prog.response));
        const title = data.results[0].name.title;
        const first = data.results[0].name.first;
        const last = data.results[0].name.last;

        const h2 = document.createElement("h2");
        h2.innerText = `${title}  ${first}  ${last} `;
        document.body.appendChild(h2)
    } else {
        (err) =>
        console.log(err)
    }
}
prog.open('GET', APIUrl);
prog.send();




function axiosData() {
    const url = 'https://www.randomuser.me/api';
    axios
        .get(url)
        .then(function (response) {
            console.log(response.data)
            const data = response.data
            const title = data.results[0].name.title;
            const first = data.results[0].name.first;
            const last = data.results[0].name.last;
            const h2 = document.createElement("h2");
            h2.innerText = `${title}  ${first}  ${last} `;
            document.body.appendChild(h2)
        })
        .catch(err => console.log(err))
}

axiosData();