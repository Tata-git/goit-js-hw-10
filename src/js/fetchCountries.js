import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// https://restcountries.com/v3.1/name/{name}
const BASE_URL = 'https://restcountries.com/v3.1';

//https://www.edu.goit.global/ru/learn/847265/2294/2304/textbook
// function fetchCountries(name) {

export const fetchCountries = name => {
  return fetch(
    `${BASE_URL}/name/${name}?fields=name,flags,capital,population,languages`
  ).then(response => {
    if (!response.ok) {
      // console.log(response.status);
      throw new Error(response.status);
    }
    return response.json();
  });

};

// export default { fetchCountries };
