import Swal from "sweetalert2";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
    "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
  },
};

export async function getSong(cancion, setCanciones, setLoading) {
  try {
    setLoading(true);
    const url = `https://spotify23.p.rapidapi.com/search/?q=${encodeURIComponent(
      cancion
    )}&type=multi&offset=0&limit=15&numberOfTopResults=5`;
    const response = await fetch(url, options);
    const data = await response.json();

    if (!data.tracks?.items || data.tracks.items.length === 0) {
      Swal.fire("No songs found. Please try another search!");
      return;
    }

    setCanciones(data.tracks.items);
  } catch (error) {
    Swal.fire(`Ups... error ${error.message}`);
  } finally {
    setLoading(false);
  }
}
