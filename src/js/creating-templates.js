function renderCountryList(names) {
  const markup = names
    .map(({ name, flags }) => {
      return `<li class='country-item'>
    <img
      class='country-flag'
      src='${flags.svg}'
      alt='${name.common}'
      width='100'
      height='100%'
    />
    <h2 class='country-title'>${name.official}</h2>
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
        alt='${name.common}'
        width='150'
        height='100%'
      />
      <h2 class='country-title'>${name.official}</h2>

  </div>
  <div class='card-body'>
    <p class='card-text'>Capital: ${capital} </p>
    <p class='card-text'>Population: ${population}</p>
    <p class='card-text'>Languages: ${languages}</p>
  </div>
</div>`;
    })
    .join('');

  countryInfo.innerHTML = markup;
  console.log(markup);
}
