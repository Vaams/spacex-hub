const menu = document.getElementById("menu");
const bar_menu = document.getElementById("bar-mobile");

async function getData(){
    let response = await fetch("https://api.spacexdata.com/v5/launches/upcoming");
    let rockets = await response.json();
    return response, rockets;
}

getData().then(data => {
try {
    let dataRocketName = data[0].name;
    document.getElementById("rocket-name").textContent = dataRocketName;
} catch {
    document.getElementById("rocket-name").textContent = response.status; /*Wyświetlanie kodu błędu w przypadku błędu pobrania API - 100, 400*/
    }
});

function launchCountdown() {
    getData().then(data => {
        let launchTime = new Date(data[0].date_utc);
        let currentDate = new Date();
        
        let sumTime = launchTime > currentDate ? launchTime - currentDate : 0;
        let days = Math.floor(sumTime / 1000 / 60 / 60 / 24);
        let hours = Math.floor(sumTime / 1000 / 60 / 60) % 24;
        let minutes = Math.floor(sumTime / 1000 / 60) % 60;
        let seconds = Math.floor(sumTime / 1000) % 60;
        
        document.getElementById("countdown__grid-days").textContent = days < 10 ? "0" + days : days;
        document.getElementById("countdown__grid-hours").textContent = hours < 10 ? "0" + hours : hours;
        document.getElementById("countdown__grid-minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("countdown__grid-seconds").textContent = seconds < 10 ? "0" + seconds : seconds;
    });
}
setInterval(launchCountdown, 1000);

bar_menu.addEventListener("click", () => {
    list.classList.toggle("menu__open"); /*Dlaczego nie musze pobrać/zdefinować LIST jak "menu" u góry?*/
    document.getElementById("bar-mobile").style.zIndex = 1;
});
