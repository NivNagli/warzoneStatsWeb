const last20Stats = JSON.parse(localStorage.getItem('allGamesStats'));
const commonStats = JSON.parse(localStorage.getItem('commonGamesStats'));

console.log(last20Stats);
console.log(commonStats);

const createLeaderboardDiv = (statsKey, leaderboardType) => {
    let leaderBoardDiv = document.createElement('div');
    let h2Header = document.createElement('h2');
    h2Header.innerHTML =statsKey +" [Common Games]:";
    leaderBoardDiv.appendChild(h2Header);
    if(leaderboardType === "common") {
        leaderBoardDiv.classList.add("common-leaderboard");
        return leaderBoardDiv;
    }
    leaderBoardDiv.classList.add("leaderboard");
    return leaderBoardDiv;
};


const createResultPage = (statsArray, statsArray2) => {
    const container = document.querySelector(".results__container");
    const statsKeys = ["kills", "deaths", "assists", "damageDone", "damageTaken", "revives", "gulagKills"];
    for (let i = 0; i < statsKeys.length; i++) {
        let leaderBoardDiv = document.createElement('div');
        leaderBoardDiv.classList.add("leaderboard");
        let h2Header = document.createElement('h2');
        h2Header.innerHTML = statsKeys[i] +" [Last 20 Games]:";
        leaderBoardDiv.appendChild(h2Header);
        let leaderBoardDiv2;
        if(commonStats) {
            leaderBoardDiv2 = createLeaderboardDiv(statsKeys[i], "common");
        }
        for (let j = 0; j < statsArray.length; j++) {
            let contentDiv = document.createElement('div');
            contentDiv.classList.add("content1");
            sortGameData(i, statsArray);
            resArray = [...statsArray].reverse();
            contentDiv.innerHTML = `<h1>${j + 1}) ${resArray[j]["username"]} : ${resArray[j][i][statsKeys[i]]}</h1>`;
            leaderBoardDiv.appendChild(contentDiv);
            if(commonStats) {
                let contentDiv = document.createElement('div');
                contentDiv.classList.add("content1");
                sortGameData(i, statsArray2);
                resArray = [...statsArray2].reverse();
                contentDiv.innerHTML = `<h1>${j + 1}) ${resArray[j]["username"]} : ${resArray[j][i][statsKeys[i]]}</h1>`;
                leaderBoardDiv2.appendChild(contentDiv);
            }
        }
        container.appendChild(leaderBoardDiv);
        if(commonStats) {
            container.appendChild(leaderBoardDiv2);
        }
    }
}



createResultPage(last20Stats,commonStats);


