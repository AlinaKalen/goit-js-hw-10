import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

error.classList.add('is-hidden');
loader.classList.add('is-hidden');

function initializeSlimSelect() {
  new SlimSelect('.breed-select');
}

function displayError(message) {
  Notiflix.Notify.failure(message, { timeout: 4000, userIcon: false });
}

function showLoader() {
  loader.classList.remove('is-hidden');
}

function hideLoader() {
  loader.classList.add('is-hidden');
}

function showCatInfo() {
  catInfo.classList.remove('is-hidden');
}

function hideCatInfo() {
  catInfo.classList.add('is-hidden');
}

function populateBreedSelect(breeds) {
  breedSelect.innerHTML = breeds
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('\n');
}

function updateCatInfo(data) {
  const { breeds, url } = data[0];
  const { name, temperament, description } = breeds[0];

  const catInfoHTML = `
    <img src="${url}" alt="${name}" width="500">
    <div>
      <h2 class="title">${name}</h2>
      <p class="text">${description}</p>
      <p><span class="text-desc">Temperament:</span> ${temperament}</p>
    </div>
  `;

  catInfo.innerHTML = catInfoHTML;
}

function fetchBreedsAndSetPetsList() {
  showLoader();
  hideCatInfo();
  hideError();

  fetchBreeds()
    .then(result => {
      populateBreedSelect(result);
      initializeSlimSelect();
    })
    .catch(error => {
      displayError('Oops! Something went wrong while fetching breeds. Try reloading the page!');
    })
    .finally(() => {
      hideLoader();
    });
}

function onSelect(evt) {
  const selectedBreedId = evt.currentTarget.value;

  hideCatInfo();
  showLoader();
  hideError();

  fetchCatByBreed(selectedBreedId)
    .then(data => {
      updateCatInfo(data);
      showCatInfo();
    })
    .catch(error => {
      displayError('Oops! Something went wrong while fetching cat information. Try reloading the page!');
    })
    .finally(() => {
      hideLoader();
    });
}

function hideError() {
  error.classList.add('is-hidden');
}

fetchBreedsAndSetPetsList();
breedSelect.addEventListener('change', onSelect);