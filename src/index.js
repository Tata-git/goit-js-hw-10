import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import './css/styles.css';
import getRefs from './js/get-refs';
import { fetchCountries } from './js/fetchCountries';
// import countryCharacteristics from './templates/countryCharacteristics.hbs'
// import countryItem from './templates/countryItem.hbs'

const debounce = require('lodash.debounce');

const refs = getRefs(); //searchBox/countryList/countryInfo
const DEBOUNCE_DELAY = 300;
// console.log(refs.searchBox);
let countryName = '';

refs.searchBox.addEventListener(
  'input',
  debounce(renderCountryCard, DEBOUNCE_DELAY)
);

function renderCountryCard(evt) {
  countryName = evt.target.value.trim();
  console.log(countryName);

  clearCountryInfo();
}

function renderCountryInfo(data) {
  const markup = countryCharacteristics(data);
  refs.countryInfo.innerHTML = markup;
  console.log(markup);
}

function clearCountryInfo() {
  refs.countryInfo.innerHTML = '';
}
//-----------------------------------------

