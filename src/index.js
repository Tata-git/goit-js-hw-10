import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import getRefs from './js/get-refs';
import { fetchCountries } from './js/fetchCountries';

const { searchBox, countryList, countryInfo } = getRefs();
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

let countryName = '';

searchBox.addEventListener('input', debounce(inputInformation, DEBOUNCE_DELAY));

function inputInformation(evt) {
  countryName = evt.target.value.trim();
  console.log(countryName);
  // Если пользователь полностью очищает поле поиска, то HTTP-запрос не выполняется, а разметка списка стран или информации о стране пропадает.
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';

  fetchCountries(countryName)
    .then(makeResponseRequest)
    // Если пользователь ввёл имя страны которой не существует
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function makeResponseRequest(data) {
  let amount = data.length;
  // Если в ответе бэкенд вернул больше чем 10 стран, в интерфейсе пояляется уведомление
  if (amount > 10) {
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  // Если бэкенд вернул от 2-х до 10-х стран, под тестовым полем отображается список найденных стран. Каждый элемент списка состоит из флага и имени страны.
  if (amount >= 2 && amount <= 10) {
    return renderCountryList(data);
  }
  // Если результат запроса это массив с одной страной, в интерфейсе отображается разметка карточки с данными о стране: флаг, название, столица, население и языки.
  else {
    return renderCountryInfo;
  }
}

function renderCountryList(names) {
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
  const markup = names
    .map(({ name, flags, capital, population, languages }) => {
      return `<div class='card'>
  <div class='country-item-top'>

      <img
        class='country-flag'
        src='${flags.svg}'
        alt='${name.official}'
        width='150'
        height='100%'
      />
      <h2 class='country-title'>${name.common}</h2>

  </div>
  <div class='card-body'>
    <p class='card-text'>Capital: ${capital} </p>
    <p class='card-text'>Population: ${population}</p>
    <p class='card-text'>Languages: ${Object.value(languages)}</p>
  </div>
</div>`;
    })
    .join('');

  countryInfo.innerHTML = markup;
  console.log(markup);
}

//-----------------------------------------
// function inputInformation(evt) {
//   countryName = evt.target.value.trim();
//   console.log(countryName);
//   // Если пользователь полностью очищает поле поиска, то HTTP-запрос не выполняется, а разметка списка стран или информации о стране пропадает.
//   countryList.innerHTML = '';
//   countryInfo.innerHTML = '';

//   fetchCountries(countryName)
//     .then(name => {
//       // let amount = name.length;
//       // console.log(amount);
//       // // Если в ответе бэкенд вернул больше чем 10 стран, в интерфейсе пояляется уведомление
//       // if (amount > 10) {
//       //   return Notiflix.Notify.info(
//       //     'Too many matches found. Please enter a more specific name.'
//       //   );
//       // }
//       // // Если бэкенд вернул от 2-х до 10-х стран, под тестовым полем отображается список найденных стран. Каждый элемент списка состоит из флага и имени страны.
//       // if (amount >= 2 && amount <= 10) {
//       //   return renderCountryList(name);
//       // }
//       // Если результат запроса это массив с одной страной, в интерфейсе отображается разметка карточки с данными о стране
//       // renderCountryInfo(name);
//     })
//     // Если пользователь ввёл имя страны которой не существует
//     .catch(error =>
//       Notiflix.Notify.failure('Oops, there is no country with that name')
//     );
// }