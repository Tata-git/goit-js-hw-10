import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import getRefs from './js/get-refs';
import { fetchCountries } from './js/fetchCountries';

const { searchBox, countryList, countryInfo } = getRefs();
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

searchBox.addEventListener('input', debounce(inputInformation, DEBOUNCE_DELAY));

function inputInformation(evt) {
  let countryName = evt.target.value.trim();

  if (countryName === '') {
    return;
  }

  fetchCountries(countryName)
    .then(makeResponseRequest)
    .catch(error => {
      cleanData();
      searchBox.value = '';
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
function cleanData() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}
function makeResponseRequest(data) {
  // console.log(data);
  let amount = data.length;

  if (amount === 1) {
    renderCountryInfo(data);
  } else if (amount >= 2 && amount <= 10) {
    renderCountryList(data);
  } else {
    cleanData();
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

function renderCountryList(names) {
  countryInfo.innerHTML = '';

  const markup = names
    .map(({ name, flags }) => {
      return `<li class='country-item'>
    <img
      class='country-flag'
      src='${flags.svg}'
      alt='${name.official}'
      width='25'
      height='100%'
    />
    <h2 class='country-title'>${name.common}</h2>
</li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function renderCountryInfo(names) {
  countryList.innerHTML = '';

  const markup = names
    .map(({ name, flags, capital, population, languages }) => {
      return `<div class='card'>
  <div class='country-item-top'>

      <img
        class='country-flag'
        src='${flags.svg}'
        alt='${name.official}'
        width='25'
        height='100%'
      />
      <h2 class='country-title'>${name.common}</h2>

  </div>
  <div class='card-body'>
    <p><span class='card-text'>Capital: </span>${capital} </p>
    <p><span class='card-text'>Population: </span>${population}</p>
    <p><span class='card-text'>Languages: </span>${Object.values(languages)}</p>
  </div>
</div>`;
    })
    .join('');

  countryInfo.innerHTML = markup;
  // console.log(markup);
}
