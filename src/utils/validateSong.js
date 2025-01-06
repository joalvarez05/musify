import Swal from "sweetalert2";

export const validateSong = (cancion) => {
  if (cancion.trim() === "") {
    Swal.fire("You must write a song to search :)");
    return false;
  }

  if (cancion.length > 50) {
    Swal.fire("Your search is too long, please try again");
    return false;
  }
  return true;
};
