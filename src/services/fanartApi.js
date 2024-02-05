import { getPosterOMDB } from "./omdbApi";

const API_KEY = import.meta.env.VITE_FANART_API_KEY;
const API_URL = import.meta.env.VITE_FANART_API_URL;
const CLIENT_KEY = import.meta.env.VITE_FANART_CLIENT_KEY;

export async function getPoster({ imdbId }) {
  if (!imdbId) {
    console.log("no imdbid");
    return null;
  }

  const res = await fetch(
    `${API_URL}/movies/${imdbId}?api_key=${API_KEY}&client_key=${CLIENT_KEY}`
  );

  const data = await res.json();
  //   console.log("FANART POSTER RESPONSE", res);
  console.log("FANART POSTER DATA", data);

  //returning movie poster

  return (
    data.movieposter?.[0]?.url ||
    (await getPosterOMDB({ imdbId })) ||
    data.moviebackground?.[0]?.url ||
    data.moviedisk?.[0]?.url
  );
}
