const inputBox = document.getElementById("input-box");
const button = document.getElementById("button")
const animeList = document.getElementById("anime-list");
console.log(animeList);
button.addEventListener(
    "click",
    addName
);
function addName(){
    console.log(inputBox.value);
    if(inputBox.value === ''){
        alert("Please add a name");
    }
    else{
    fetch("https://api.jikan.moe/v4/top/anime")
    .then(response => response.json())
    .then(data => {
        animeList.innerHTML = "";
        
        data.data.slice(0,5).forEach(anime =>{
            animeList.innerHTML += `<p>${anime.title}</p>`;
        });
    })
    .catch(error => {
        console.log(error);
    })
    }};