
createSearchPage({
    mainContainerClassName: "player-search-form", innerSelectContainerID: "number-of-players",
    onSelectMethod: (e) => {
        document.querySelector(".players-data__container").innerHTML = '';
        // console.log(e.target.options[e.target.selectedIndex].value);
        // console.log("0" === e.target.options[e.target.selectedIndex].value);
        let numberOfUsers = Math.floor(e.target.options[e.target.selectedIndex].value);
        if (!numberOfUsers) {  // if the user didnt select any number of users from the players select
            return;
        }
        buildUserForms(numberOfUsers);
        onSearchSelect();
    }
});

const buildUserForms = (formNum) => {
    for (let i = 0; i < formNum; i++) {
        let div = document.createElement('div');
        div.innerHTML = dataForm;
        // console.log(div);
        document.querySelector(".players-data__container").appendChild(div);
    }
    document.querySelector(".players-data__container").appendChild(buildSearchButton());
};

const dataForm = `        <div class="player-data__info"> 
<div class="select is-rounded select is-small">
  <select class="platform-selector">
    <option value="0" class="select-option-user">Select Platform</option>
    <option value="1" class="select-option-user">Playstation</option>
    <option value="2" class="select-option-user">Xbox-Live</option>
    <option value="3" class="select-option-user">Battle.Net</option>
  </select>
</div>
<input class="input is-rounded username-input" type="text" placeholder="username">
</div>`;

const buildSearchButton = () => {
    let button = document.createElement('button');
    button.classList.add("button");
    button.classList.add("is-danger");
    button.classList.add("is-rounded");
    button.innerHTML = "Search";
    button.addEventListener('click', onSearchSelect);
    return button;
};

const onSearchSelect = () => {
    const platformsKeys = { "Playstation": "psn", "Xbox-Live": "xbl", "Battle.Net": "battle" };
    const usernames = [];
    const platforms = [];
    const allUserSelects = document.querySelectorAll(".platform-selector");
    const allUserInputs = document.querySelectorAll(".username-input");
    for (let select of allUserSelects) {
        if (!select.options.selectedIndex) {
            console.log("false1 ['onSearchSelect' methd index.js]"); // need to handle a error over here, ignore for now
            return false;
        }
        platforms.push(platformsKeys[select.options[select.options.selectedIndex].text]);
    }

    for (let input of allUserInputs) {
        if (input.value === "") {
            console.log("false2 ['onSearchSelect' methd index.js]");
            return false;
        }
        usernames.push(input.value);
    }

    console.log(platforms);
    console.log(usernames);
    getAndDisplayData(platforms, usernames);
};

const getAndDisplayData = (platformList, usernameList) => {
    findAllGamesData(platformList, usernameList)
    .then(
        (allGamesStats) => {
            if (allGamesStats) {
                window.localStorage.clear();
                addUsernameForStats(usernameList, allGamesStats);
                localStorage.setItem("allGamesStats",JSON.stringify(allGamesStats));

                findCommonGamesData(platformList, usernameList)
                .then(
                    (commonGamesStats) => {
                        addUsernameForStats(usernameList, commonGamesStats);
                        localStorage.setItem("commonGamesStats",JSON.stringify(commonGamesStats));
                        window.location.href = "/resultsPages/result.html";
                    }
                )
                .catch(e => {
                    console.log(e);
                    window.location.href = "/resultsPages/result.html";
                });
            }
            else {
                console.log("in case of failure we will be here!");
            }
        }).catch(e => { console.log(e) });
};



