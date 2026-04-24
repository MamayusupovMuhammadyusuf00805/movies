"use strict";

const api = "https://api.themoviedb.org/3/movie/popular?api_key=e3eba846fb6af8da7df4730f6734f0f7&language=en-US&page=1";

const cards = document.querySelector(".cards");
const modal_overlay = document.querySelector(".modal-overlay");
const close_btn = document.querySelector(".close-btn");
const modal_body = document.querySelector(".modal-body");
const filterBtns = document.querySelectorAll(".filter-btn");

let allfilm = []; 


const getdata = async (link) => {
    try {
        const req = await fetch(link);
        const data = await req.json();
        allfilm = data.results;
        writedata(allfilm);
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
};

const writedata = (data) => {
    cards.innerHTML = "";
    if (!data || data.length === 0) {
        cards.innerHTML = "<h3>No movies found</h3>";
        return;
    }

    data.forEach((item) => {
        if (!item.poster_path) return;
        cards.innerHTML += `
            <div class="card" onclick="writemodal(${item.id})" style="cursor:pointer">
              <h3>${item.title}</h3>
              <div class="main_img">
                 <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" alt="${item.title}" />
              </div>
            </div>`;
    });
};


filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const genreId = btn.getAttribute("data-id");

        if (genreId === "all") {
            writedata(allfilm);
        } else {
            // Фильтруем, проверяя наличие ID жанра в массиве genre_ids
            const filtered = allfilm.filter(movie => 
                movie.genre_ids.includes(parseInt(genreId))
            );
            writedata(filtered);
        }
    });
});

const writemodal = (id) => {
    modal_overlay.classList.add("active");
    const film = allfilm.find((item) => item.id == id);

    if (!film) return;

    modal_body.innerHTML = `
        <div class="modal-img">
            <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" alt="${film.title}">
        </div>
        <div class="modal-info">
            <h3>${film.title}</h3>
            <p><strong>Release-date:</strong> ${film.release_date}</p>
            <hr>
            <p><strong>Popularity:</strong> ${film.popularity.toFixed(2)}</p>
            <hr>
            <h4>Overview:</h4>
            <p class="description">${film.overview}</p>
        </div>`;
};

close_btn.addEventListener("click", () => {
    modal_overlay.classList.remove("active");
});

getdata(api);