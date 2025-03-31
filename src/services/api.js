import Swal from "sweetalert2";
const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
const apiHost = import.meta.env.VITE_RAPIDAPI_HOST;

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": apiKey,
    "x-rapidapi-host": apiHost,
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

// export async function playlist(genero) {
//   const url = `https://spotify23p.rapidapi.com/playlist/?id=${genero}`;
//   const options = {
//     method: "GET",
//     headers: {
//       "x-rapidapi-key": apiKey,
//       "x-rapidapi-host": apiHost,
//     },
//   };

//   try {
//     const response = fetch(url, options);
//     const result = await response.text();
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// }
