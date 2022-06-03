import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import countryCharacteristics from '../templates/countryCharacteristics.hbs'
// import countryItem from '../templates/countryItem.hbs';

// https://restcountries.com/v3.1/name/{name}
const BASE_URL = 'https://restcountries.com/v3.1';

function fetchCountries(name) {
  return fetch(
    `${BASE_URL}/name/${name}?fields=name,flags,capital,population,languages`
  )
    .then(response => {
      // console.log(response);
      response.json();
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}
console.log(fetchCountries());

export default { fetchCountries };

//------------------------------------------------------------------------

// function fetchCountries(all) {
//   return fetch(`${BASE_URL}/all?fields=name,flags,capital,population,languages`)
//     .then(response => response.json()).then(
//       console.log()
//     )
//     .catch(error => {
//       Notiflix.Notify.failure('Oops, there is no country with that name');
//     });
// }
//------------------------------------------------------------------------

// fetch(`${BASE_URL}/name/${name}`)
// fetch(`${BASE_URL}/all`)
//   .then(response => {
//     console.log(response.json());
//     return response.json();
//   })
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.log(error);
//   });

//---------------------------------------------------------------------------
//  Ви можете відфільтрувати вихідні дані вашого запиту, щоб включити лише вказані поля.
//  https://restcountries.com/v2/{service}?fields={field},{field},{field}
// https://restcountries.com/v2/all?fields=name,capital,currencies

// if (data.length > 10) {

//     Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
// }
