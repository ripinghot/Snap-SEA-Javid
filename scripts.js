import animes from './top200anime.json' with { type: 'json' };

const quotes = [
  "Believe you can and you're halfway there.",
  "Do one thing every day that scares you.",
  "Success is the sum of small efforts repeated daily.",
  "Dream big and dare to fail.",
  "Stay hungry, stay foolish.",
  "The best way to get started is to begin.",
  "Small steps every day lead to big results."
];

function showCards(anime_list=animes) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  document.getElementById("filter-number").textContent = `Filters (${anime_list.length})`;
  if (anime_list.length === 0) {
    cardContainer.innerHTML = '<p style="color: white;">No anime found matching your filters.</p>';
  return;
  }
  const templateCard = document.querySelector(".card");

  for (let i = 0; i < anime_list.length; i++) {
    let anime = anime_list[i];
    let title = anime.title;
    let score = anime.score;
    let rank = anime.rank;
    let popularity = anime.popularity;
    let members = anime.members;
    let synopsis = anime.synopsis;
    let type = anime.type;
    let episodes = anime.episodes;
    let imageURL = anime.image_url;
    const nextCard = templateCard.cloneNode(true);
    editCardContent(nextCard, title, score, rank, popularity, members, synopsis, type, episodes, imageURL);
    cardContainer.appendChild(nextCard);
    }
  }

function editCardContent(card, title, score, rank, popularity, members, synopsis, type, episodes, imageURL) {
  card.style.display = "block";

  const cardHeader = card.querySelector("h2");
  cardHeader.textContent = title;
  const cardImage = card.querySelector("img");
  cardImage.src = imageURL;
  cardImage.alt = title + " Poster";
  const cardSynopsis = card.querySelector(".synopsis");
  cardSynopsis.textContent = synopsis;
  const cardDetails = card.querySelector(".meta-list");
  cardDetails.innerHTML = `
    <li><strong>Score:</strong> ${score}</li>
    <li><strong>Rank:</strong> ${rank}</li>
    <li><strong>Popularity:</strong> ${popularity}</li>
    <li><strong>Members:</strong> ${members}</li>
    <li><strong>Type:</strong> ${type}</li>
    <li><strong>Episodes:</strong> ${episodes}</li>
  `;

}
 
showCards()

window.filterAndSort = filterAndSort;
function filterAndSort() {
  let filter_list = [...animes];
  const typeValue = document.getElementById("filter-type").value;
  const sortValue = document.getElementById("sort-select").value;
  const searchValue = document.getElementById("search-input").value.toLowerCase();
  const eipisodesValue = document.getElementById("filter-episodes").value;
  const membersValue = document.getElementById("filter-members").value;

  if (typeValue !== "all") {
    filter_list = filter_list.filter((anime) => anime.type === typeValue);
  }

  if (sortValue === "popularity") {
    filter_list.sort((a, b) => a.popularity - b.popularity);
  } else if (sortValue === "episodes") {
    filter_list.sort((a, b) => b.episodes - a.episodes);
  } else if (sortValue === "Title") {
    filter_list.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === "rank") {
    filter_list.sort((a, b) => a.rank - b.rank);
  }
  
  if (searchValue !== "") {
    filter_list = filter_list.filter((anime) =>
      anime.title.toLowerCase().includes(searchValue)
    );
  }
  
  if (eipisodesValue !== "all") {
    filter_list = filter_list.filter((anime) => {
      if (eipisodesValue === "5") return anime.episodes <= 5;
      if (eipisodesValue === "12") return anime.episodes <= 12;
      if (eipisodesValue === "24") return anime.episodes <= 24;
      if (eipisodesValue === "25plus") return anime.episodes >= 25;
      return true;
    });}
  
  if (membersValue !== "all") {
    filter_list = filter_list.filter((anime) => {
      if (membersValue === "100000") return anime.members >= 100000;
      if (membersValue === "500000") return anime.members >= 500000;
      if (membersValue === "1000000") return anime.members >= 1000000;
      if (membersValue === "2000000") return anime.members >= 2000000;
      return true;
    });}
  showCards(filter_list);
}

window.clearFilters = clearFilters;
function clearFilters() {
  document.getElementById("filter-type").value = "all";
  document.getElementById("sort-select").value = "popularity";
  document.getElementById("search-input").value = "";
  document.getElementById("filter-episodes").value = "all";
  document.getElementById("filter-members").value = "all";
  filterAndSort();
}

window.quoteAlert = quoteAlert;
function quoteAlert() {
  const today = new Date();
  const quote = quotes[today.getDay()];
  alert(quote);
}

// window.sortAnime = sortAnime;
// function sortAnime() {
//   const sortSelect = document.getElementById("sort-select");
//   const sortBy = sortSelect.value;
//   let sortedAnime = [...last_filtered_anime];
  
//   if (sortBy === "rank") {
//     sortedAnime.sort((a, b) => a.rank - b.rank);
//   } else if (sortBy === "episodes") {
//     sortedAnime.sort((a, b) => b.episodes - a.episodes);
//   } else if (sortBy === "Title") {
//     sortedAnime.sort((a, b) => a.title.localeCompare(b.title));
//   } else if (sortBy === "popularity") {
//     sortedAnime.sort((a, b) => a.popularity - b.popularity);
//   }

//   showCards(sortedAnime);
// }

// window.searchAnime = searchAnime;
// function searchAnime() {
//   const searchInput = document.getElementById("search-input").value.toLowerCase();
//   const filteredAnime = last_filtered_anime.filter((anime) => {
//     return anime.title.toLowerCase().includes(searchInput);
//   });
//   last_filtered_anime = filteredAnime;
//   sortAnime();
// } 

// window.filterByType = filterByType;
// function filterByType() {
//   const typeSelect = document.getElementById("filter-type");
//   const type = typeSelect.value;
//   const filteredAnime = last_filtered_anime.filter((anime) => anime.type === type);
//   last_filtered_anime = filteredAnime;
//   sortAnime();
// }



