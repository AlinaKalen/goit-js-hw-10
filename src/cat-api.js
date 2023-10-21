import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_dVEGBU3lycZBH6ho0Q35YxYnCQhu4vLXgbhYJ91pU6r8wcIQd2uXFU6cWvSGgCkX";

axios.defaults.baseURL = 'https://api.thecatapi.com/v1';


function fetchBreeds() {
    return axios.get('https://api.thecatapi.com/v1/breeds').then(response => {
      return response.data;
    });
  }
  
  function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`).then(resp => {
      return resp.data;
    });
  }
  
  export { fetchBreeds, fetchCatByBreed };