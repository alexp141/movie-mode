const API_KEY = `${import.meta.env.VITE_TRAKT_API_KEY}`;
// const IMAGES_DOMAIN = "https://wsrv.nl/?url=https://simkl.in";
const API_URL = `${import.meta.env.VITE_TRAKT_API_URL}`;
const ITEMS_PER_PAGE = 12;

export async function getSearchResults({ searchQuery, pageNumber }) {
  const res = await fetch(
    `${API_URL}/search/movie,show?query=${searchQuery}&page=${pageNumber}&limit=${ITEMS_PER_PAGE}&imdb_votes=10000-1000000000`,
    {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-key": API_KEY,
        "trakt-api-version": 2,
      },
    }
  );
  console.log("trakt res SEARCH", res);

  const totalResults = +res.headers.get("X-Pagination-Item-Count");
  const itemsPerPage = +res.headers.get("X-Pagination-Limit");

  const data = await res.json();
  console.log("trakt data SEARCH", data);
  return { data, totalResults, itemsPerPage };
}

export async function getPoster({ trakt_id }) {
  const res = await fetch(`${API_URL}/search/trakt/${trakt_id}?id_type=movie`, {
    headers: {
      "Content-Type": "application/json",
      "trakt-api-key": API_KEY,
      "trakt-api-version": 2,
    },
  });
  console.log("trakt poster res", res);
  const data = res.json();
  console.log("trakt poster data", data);
  return data;
}

export async function getQueryDetails({ id, type }) {
  if (type === "movie") {
    const res = await fetch(`${API_URL}/movies/${id}/extended=full&studios`, {
      headers: {
        "Content-Type": "application/json",
        "trakt-api-key": API_KEY,
        "trakt-api-version": 2,
      },
    });

    console.log("trakt res", res);

    const data = await res.json();
    console.log("trakt data", data);
    return data;
  }
}

export { ITEMS_PER_PAGE };
