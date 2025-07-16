export const URL_FOR_IMAGE_UPLOAD =
  "https://api.cloudinary.com/v1_1/dljuam21j/image/upload";

function getDataFromLocalStorage(key) {
  return !!localStorage.getItem(key) && localStorage.getItem(key);
}
function setDataInLocalStorage(key, arr) {
  // key already available
  if (localStorage.getItem(key)) {
  }
}
