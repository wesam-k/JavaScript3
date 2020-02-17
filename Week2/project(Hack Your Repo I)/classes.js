'use strict'

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
            createAndAppend('button', buttonDiv, {
                text: arrContributor[2]
            });
        }
    }
}