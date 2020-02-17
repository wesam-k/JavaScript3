'use strict'

const HYF_REPOS_URL = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';



// function fetchJson() {
//     fetch(HYF_REPOS_URL)
//     .then(response =>{
//         return response.json();
//     })
//     .then((repos) => {
//         console.log(repos);

//     })
//     .catch((error) =>{ console.log(`there is an error ${error}`)
//     })

// }
// fetchJson()


function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
        if (key === "text") {
            elem.textContent = value;
        } else {
            elem.setAttribute(key, value);
        }
    });
    return elem;
}

const root = document.getElementById('root');
const header = createAndAppend('div', root);
header.classList.add('header');
const h1 = createAndAppend('h1', header);
h1.innerText = 'HYF Repositories';
h1.classList.add('title');


function reposSet(repoContainer, repos) {
    const table = createAndAppend('table', repoContainer);
    table.classList.add('reposTable');
    const includedKeys = ['Repository:', 'Description:', 'Forks:', 'Updated:'];
    const keysValue = [
        repos.name,
        repos.description,
        repos.fork,
        repos.updated_at,
    ];
    for (let i = 0; i < includedKeys.length; i++) {
        repoContainer.classList.add('repo-container');
        let tr = createAndAppend('tr', table);
        createAndAppend('th', tr, { text: includedKeys[i] });
        if (i === 0) {
            createAndAppend('a', tr, {
                text: repos.name,
                href: repos.html_url,
                target: '_blank',
            });
        } else {
            createAndAppend('td', tr, { text: keysValue[i] });
        }
    }
}
// function SecondPromise(contributorsContainer, url) {
//     fetch(url).then(contributors => {
//         contributors
//             .json()
//             .then(contr => {
//                 contr.forEach(contributor => {
//                     contributorsSet(contributor, contributorsContainer);
//                 });
//             })
//             .catch(err => {
//                 createAndAppend('div', root, {
//                     text: err.message,
//                     class: 'alert-error',
//                 });
//             });
//     });
// }

async function SecondPromise(contributorsContainer, url){
    try{
        const fetch = await axios.get(url);
        const repos = await fetch.json()
        return repos

    }catch(err){
        createAndAppend('div', contributorsContainer, {
        text: err.message,
        class: 'alert-error',
      });
    }
    
}


function contributorsSet(contributor, contributorsContainer) {
    const contributorHolder = createAndAppend('div', contributorsContainer);
    contributorHolder.classList.add('contributorHolder');
    contributorsContainer.classList.add('contributors-container');
    let arrContributor = [
        contributor.avatar_url,
        contributor.login,
        contributor.contributions,
    ];

    for (let i = 0; i < arrContributor.length; i++) {
        if (i === 0) {
            let imgHolder = createAndAppend('div', contributorHolder, {
                class: 'imgHolder',
            });
            let img = createAndAppend('img', imgHolder);
            img.src = arrContributor[0];
        } else if (i === 1) {
            let loginName = createAndAppend('div', contributorHolder, {
                class: 'loginName',
            });
            createAndAppend('a', loginName, {
                text: arrContributor[1],
                href: contributor.html_url,
                target: '_blank',
            });
        } else if (i === 2) {
            let buttonDiv = createAndAppend('div', contributorHolder, {
                class: 'buttonDiv',
            });
            createAndAppend('button', buttonDiv, { text: arrContributor[2] });
        }
    }
}
// function main(repos) {
async function main(repos) {
    const container = createAndAppend('div', root, { class: 'container' });
    repos.sort((rep, next) => rep.name.localeCompare(next.name));
    const reposContainer = createAndAppend('div', container);
    const contributorsContainer = createAndAppend('div', container);
    const select = createAndAppend('select', header, { class: 'select' });

    for (let i = -1; i < 10; i++) {
        if (i === -1) {
            createAndAppend('option', select, {
                text: 'please Select Repositories ',
                value: [i],
            });
        } else {
            createAndAppend('option', select, {
                text: repos[i].name.toLowerCase(),
                value: [i],
            });
        }
    }
    select.onchange = ()=> {
        reposContainer.innerText = '';
        reposContainer.classList.remove('repos-container');
        contributorsContainer.innerText = '';
        contributorsContainer.classList.remove('contributors-container');
        const selectIndex = select.value;
        reposSet(reposContainer, repos[selectIndex]);
        SecondPromise(
            contributorsContainer,
            repos[selectIndex].contributors_url,
        );
    };
}


//function promise(url) {
 async function promise(url) {
    fetch(url)
        .then(res => {
            res.json().then(repos => {
                main(repos);
            });
        })
        .catch(err => {
            createAndAppend('div', root, {
                text: err.message,
                class: 'alert-error',
            });
        });
}


window.onload = () => promise(HYF_REPOS_URL);
