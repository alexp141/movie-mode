const apiUrl = `${import.meta.env.VITE_OMDB_API_URL}/?apikey=${
  import.meta.env.VITE_OMDB_API_KEY
}`;

export async function getQueryByTitle({ title, imdbId }) {
  if (!title && !imdbId) {
    console.log("no title and no imdbId");
    return null;
  }

  let res = await fetch(`${apiUrl}&t=${title}&plot=full`);
  console.log("query details response", res);
  let data = await res.json();

  if (data.Response === "False" && imdbId) {
    res = await fetch(`${apiUrl}&i=${imdbId}&plot=full`);
    console.log("query details response using IMDB", res);
    data = await res.json();
  }

  console.log("query details", data);
  return data;
}

export async function getPosterOMDB({ title, imdbId }) {
  if (!title && !imdbId) {
    console.log("no title and no imdbid");
    return null;
  }

  const res = await fetch(`${apiUrl}&i=${imdbId}`);
  const data = await res.json();

  console.log(`OMDB GET POSTER for ${title}`, data);
  return data.Poster;
}
