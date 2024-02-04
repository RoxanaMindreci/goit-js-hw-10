const API_KEY = 'live_Mw2kf4Fzvso7N0kIthapVRziypkZOv2lkC8oKsEDuOGUUpP7nqbWrEMqI7sQpKlN';

import axios from 'axios';

const URL = 'https://api.thecatapi.com/v1/';

axios.defaults.headers.common['x-api-key'] = API_KEY;

function fetchBreeds() {
  const BREEDS_URL = `${URL}breeds`;
  return axios.get(BREEDS_URL).then(res => {
    if (res.status !== 200) {
      throw new Error(res.status);
    }
    return res.data;
  });
}
function fetchCatByBreed(breedId) {
  const IMAGES_URL = `${URL}images/search`;
  const params = new URLSearchParams({
    breed_ids: breedId,
  });
  return axios.get(`${IMAGES_URL}?${params}`).then(res => {
    if (res.status !== 200) {
      throw new Error(res.status);
    }
    return res.data[0];
  });
}
export { fetchBreeds, fetchCatByBreed };