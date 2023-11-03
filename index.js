//consts
const apikey = "89774574ed69a63d6073785febcb3494";
const apiEndpoint = "https://api.themoviedb.org/3";
const imgPath = "https://image.tmdb.org/t/p/original";

const apiPaths = {
  fetchAllCategories: `${apiEndpoint}/genre/movie/list?api_key=${apikey}`,
  fetchMoviesList: (id) =>
    `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
};

//App Booting
function init() {
  fetchAndBuildAllSections();
}

function fetchAndBuildAllSections() {
  fetch(apiPaths.fetchAllCategories)
    .then((res) => res.json())
    .then((res) => {
      const categories = res.genres;
      if (Array.isArray(categories) && categories.length > 0) {
        categories.slice(0, 3).forEach((category) => {
          fetchAndbuildMovieSection(
            apiPaths.fetchMoviesList(category.id),
            category
          );
        });
      }
    })
    .catch((err) => console.error(err));
}
function fetchAndbuildMovieSection(fetchUrl, category) {
  console.log(fetchUrl, category);
  fetch(fetchUrl)
    .then((res) => res.json())
    .then((res) => {
      // console.log(res.results);
      const movies = res.results;
      if (Array.isArray(movies) && movies.length) {
        buildMoviesSection(movies, category.name);
      }
    })
    .catch((err) => console.error(err));
}
function buildMoviesSection(list, categoryName) {
  console.log(list, categoryName);
}

window.addEventListener("load", function () {
  init();
});
