// key: c13ed82b
const autoCompleteConfig = {
  renderOption: (movie) => {
    const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
    return `
    <img src="${imgSrc}" />
    ${movie.Title}
    `;
  },
  searchTerm() {
    return "Movie";
  },
  selectInputValue(movie) {
    return movie.Title;
  },
  fetchData: async (searchTerms) => {
    let response = await axios.get("http://www.omdbapi.com/", {
      headers: {},
      params: {
        apikey: "c13ed82b",
        s: searchTerms,
      },
    });
    if (response.data.Error) return [];
    return response.data.Search;
  },
};
//TODO: CALL THE AUTOCOMPLETE FUNCTION AND PASS THE CONFIG OBJECT
createAutoComplete({
  root: document.querySelector("#left-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#left-summery"), "left");
  },
  ...autoCompleteConfig,
});
createAutoComplete({
  root: document.querySelector("#right-autocomplete"),
  onOptionSelect(movie) {
    document.querySelector(".tutorial").classList.add("is-hidden");
    onMovieSelect(movie, document.querySelector("#right-summery"), "right");
  },
  ...autoCompleteConfig,
});

let leftSide;
let rightSide;

const onMovieSelect = async (movie, summeryElement, side) => {
  let response = await axios.get("http://www.omdbapi.com/", {
    headers: {},
    params: {
      apikey: "c13ed82b",
      i: movie.imdbID,
    },
  });
  summeryElement.innerHTML = movieTemplate(response.data);
  if (side === "left") {
    leftSide = response.data;
  } else {
    rightSide = response.data;
  }
  if (leftSide && rightSide) runComparison();
};

const runComparison = () => {
  // console.log("Comparison run");
  const leftSideStats = document.body.querySelectorAll(
    "#left-summery .notification"
  );
  // console.log(leftSideStats);
  const rightSideStats = document.body.querySelectorAll(
    "#right-summery .notification"
  );
  // console.log(rightSideStats);
  let rightStat;
  let leftData;
  let rightData;
  leftSideStats.forEach((leftStat, idx) => {
    rightStat = rightSideStats[idx];
    leftData = leftStat.dataset.value;
    rightData = rightStat.dataset.value;
    if (leftData > rightData) {
      rightStat.classList.remove("is-primary");
      rightStat.classList.add("is-warning");
    } else {
      leftStat.classList.remove("is-primary");
      leftStat.classList.add("is-warning");
    }
  });
};

const movieTemplate = (movieDetail) => {
  const dollar = parseInt(movieDetail.BoxOffice.slice(1).replaceAll(",", ""));
  const metaScore = parseInt(movieDetail.Metascore);
  const imdbRating = parseFloat(movieDetail.imdbRating);
  const imdbVotes = parseInt(movieDetail.imdbVotes.replaceAll(",", ""));
  // console.log(dollar, metaScore, imdbRating, imdbVotes);
  const awards = movieDetail.Awards.split(" ").reduce((acc, word) => {
    let val = parseFloat(word);
    if (isNaN(val)) return acc;
    return acc + val;
  }, 0);
  // console.log(awards);
  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${movieDetail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${movieDetail.Title}</h1>
          <h4>${movieDetail.Genre}</h4>
          <p>${movieDetail.Plot}</p>
          </div>
      </div>
    </article>
    <article data-value=${awards} class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article data-value=${dollar} class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
        <article data-value=${metaScore} class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>.
    </article>
        <article data-value=${imdbRating} class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>.
    </article>
        <article data-value=${imdbVotes} class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>.
    </article>
  `;
};
