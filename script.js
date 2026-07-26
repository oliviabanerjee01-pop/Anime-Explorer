const inputBox = document.getElementById("input-box");
const button = document.getElementById("button");
const sortSelect = document.getElementById("sort-select");
const animeList = document.getElementById("anime-list");
const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");
const loader = document.getElementById("loader");
const container = document.querySelector(".container");
const modal = document.getElementById("anime-modal");
const modalImage = document.getElementById("modal-image");
const modalTitle = document.getElementById("modal-title");
const modalScore = document.getElementById("modal-score");
const modalSynopsis = document.getElementById("modal-synopsis");
const closeModal = document.getElementById("close-modal");


console.log(animeList);

let animeData = [];

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
            animeData = data.data.slice(0, 15);
            animeList.innerHTML = "";

            data.data.slice(0, 50).forEach(anime => {
                const card = document.createElement("div");
                card.classList.add("anime-card");
                card.innerHTML = `
                    <img src="${anime.images.jpg.image_url}">
                    <h3>${anime.title}</h3>
                    <p>⭐ ${anime.score}</p>
                `;

            card.addEventListener("click", ()=>{
                modal.classList.remove("hidden");
                modalImage.src = anime.images.jpg.image_url;
                modalTitle.textContent = anime.title;
                modalScore.textContent = `⭐ ${anime.score}`;
                modalSynopsis.textContent = anime.synopsis;
            });
            closeModal.addEventListener("click", () => {
            modal.classList.add("hidden");
            });
            animeList.appendChild(card);
            });
        })
        .catch(error => {
            console.log(error);
        });
}

button.addEventListener("click", 
    addName);

function addName() {

    const searchTerm = inputBox.value.trim().toLowerCase();

    if (searchTerm === "") {
        animeList.innerHTML = "<h2>Enter an anime name</h2>";
        return;
    }

    loader.classList.remove("hidden");
    container.style.opacity = "0.2";

    fetch(`https://api.jikan.moe/v4/anime?q=${searchTerm}`)

        .then(response => response.json())

        .then(data => {

            animeData = data.data.slice(0, 40);

            loader.classList.add("hidden");
            container.style.opacity = "1";

            animeList.innerHTML = "";

            data.data.slice(0, 15).forEach(anime => {

                const card = document.createElement("div");

                card.classList.add("anime-card");

                card.innerHTML = `
                    <div class ="card-top">
                        <span class = "favourite-btn">🤍</span>
                    </div>
                    <img src="${anime.images.jpg.image_url}">
                    <h3>${anime.title}</h3>
                    <p>⭐ ${anime.score}</p>
                `;

                card.addEventListener("click", () => {

                    modal.classList.remove("hidden");

                    modalImage.src = anime.images.jpg.image_url;

                    modalTitle.textContent = anime.title;

                    modalScore.textContent = `⭐ ${anime.score}`;

                    modalSynopsis.textContent = anime.synopsis || "No synopsis available.";

                });

                animeList.appendChild(card);

            });

        })

        .catch(error => {

            loader.classList.add("hidden");
            container.style.opacity = "1";

            console.log(error);

        });
}
loadTopAnime();

sortSelect.addEventListener("change", () => {

    animeList.innerHTML = "";

    if (sortSelect.value === "score") {
        animeData.sort((a, b) => b.score - a.score);
    }

    if (sortSelect.value === "title") {
        animeData.sort((a, b) =>
            a.title.localeCompare(b.title)
        );
    }

    if (sortSelect.value === "popularity") {
        animeData.sort((a, b) =>
            a.popularity - b.popularity
        );
    }

    animeData.forEach(anime => {

        const card = document.createElement("div");

        card.classList.add("anime-card");

        card.innerHTML = `
            <img src="${anime.images.jpg.image_url}">
            <h3>${anime.title}</h3>
            <p>⭐ ${anime.score}</p>
        `;

        animeList.appendChild(card);

    });

});