const inputBox = document.getElementById("input-box");
const button = document.getElementById("button");
const animeList = document.getElementById("anime-list");
const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");

console.log(animeList);

rightBtn.addEventListener("click", () => {
    animeList.scrollLeft += 300;
});

leftBtn.addEventListener("click", () => {
    animeList.scrollLeft -= 300;
});

function loadTopAnime() {
    fetch("https://api.jikan.moe/v4/top/anime")
        .then(response => response.json())
        .then(data => {
            animeList.innerHTML = "";

            data.data.slice(0, 15).forEach(anime => {
                animeList.innerHTML += `
                    <div class="anime-card">
                        <img src="${anime.images.jpg.image_url}">
                        <h3>${anime.title}</h3>
                        <p>⭐ ${anime.score}</p>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.log(error);
        });
}

button.addEventListener("click", addName);

function addName() {

    const searchTerm = inputBox.value.toLowerCase();

    console.log(searchTerm);

    if (searchTerm === "") {
        animeList.innerHTML = "<h2>Enter an anime name</h2>";
        return;
    }

    fetch(`https://api.jikan.moe/v4/anime?q=${searchTerm}`)
        .then(response => response.json())
        .then(data => {

            console.log(data);


            animeList.innerHTML = "";

            data.data.slice(0, 15).forEach(anime => {
                animeList.innerHTML += `
                    <div class="anime-card">
                        <img src="${anime.images.jpg.image_url}">
                        <h3>${anime.title}</h3>
                        <p>⭐ ${anime.score}</p>
                    </div>
                `;
            });

        })
        .catch(error => {
            console.log(error);
        });
}

loadTopAnime();