const apikey = "89774574ed69a63d6073785febcb3494";
const apiEndpoint = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/original";

const apiPaths = {
  fetchAllCategories: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
  fetchMoviesList: (id) =>
    `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
  fetchTrending: `${apiEndpoint}/trending/all/day?api_key=${apikey}&language=en-US`,
  searchOnYoutube: (query) =>
    `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=AIzaSyBnMW1YXeXI1E-faN3uBBa3_d9S76QlWt8`,
};

// Initialize the app
function init() {
  fetchTrendingMovies();
  fetchAndBuildAllSections();
}

// Fetch trending movies and display one in the banner
function fetchTrendingMovies() {
  fetchAndbuildMovieSection(apiPaths.fetchTrending, "Trending Now")
    .then((list) => {
      const randomIndex = parseInt(Math.random() * list.length);
      buildBannerSection(list[randomIndex]);
    })
    .catch((err) => {
      console.error(err);
    });
}

// Fetch movie categories and build sections for each category
function fetchAndBuildAllSections() {
  fetch(apiPaths.fetchAllCategories)
    .then((res) => res.json())
    .then((res) => {
      const categories = res.genres;
      if (Array.isArray(categories) && categories.length) {
        categories.forEach((category) => {
          fetchAndbuildMovieSection(
            apiPaths.fetchMoviesList(category.id),
            category.name
          );
        });
      }
    })
    .catch((err) => console.error(err));
}
// Fetch movies for a category and build a section
function fetchAndbuildMovieSection(fetchUrl, categoryName) {
  console.log(fetchUrl, categoryName);
  return fetch(fetchUrl)
    .then((res) => res.json())
    .then((res) => {
      const movies = res.results;
      if (Array.isArray(movies) && movies.length) {
        buildMoviesSection(movies.slice(0, 6), categoryName);
      }
      return movies;
    })
    .catch((err) => console.error(err));
}
// Build the movie section for a category
function buildMoviesSection(list, categoryName) {
  console.log(list, categoryName);

  const moviesCont = document.getElementById("movies-cont");

  const moviesListHTML = list
    .map((item) => {
      return `
        <div class="movie-item" onmouseenter="searchMovieTrailer('${item.title}', 'yt${item.id}')">
            <img class="move-item-img" src="${imgPath}${item.backdrop_path}" alt="${item.title}" />
            <div class="iframe-wrap" id="yt${item.id}"></div>
        </div>`;
    })
    .join("");

  const moviesSectionHTML = `
    <h2 class="movie-section-heading">${categoryName} <span class="explore-nudge">Explore All</span></span></h2>
    <div class="movies-row">
        ${moviesListHTML}
    </div>
`;

  const div = document.createElement("div");
  div.className = "movies-section";
  div.innerHTML = moviesSectionHTML;

  // append html into movies container
  moviesCont.append(div);
}

// Event listener for page load and header UI update on scroll
window.addEventListener("load", function () {
  init();
});
