"use strict";
const api = "https://api.themoviedb.org/3/movie/popular?api_key=e3eba846fb6af8da7df4730f6734f0f7&language=en-US&page=1";

let cards = document.querySelector(".cards");
let modal_overlay = document.querySelector(".modal-overlay"); 
let close_btn = document.querySelector(".close-btn");
let modal_body = document.querySelector(".modal-body");      
let allfilm = [];

const getdata = async (link) => {
  const req = await fetch(link);
  const data = await req.json();
  allfilm = data;
  writedata(data);
};

const writedata = (data) => {
  cards.innerHTML = "";
  data.results?.forEach((item) => {
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

getdata(api);

const writemodal = (id) => {
    modal_overlay.classList.add("active");
    
  
    const film = allfilm.results?.find((item) => item.id == id);
    
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