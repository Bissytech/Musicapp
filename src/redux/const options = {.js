const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '81acd1d9f4msh5610853c6afd749p1033e3jsndf2cdf54e689',
    'x-rapidapi-host': 'shazam-core.p.rapidapi.com\n'
  }
};

fetch('https://shazam-core.p.rapidapi.com/v1/charts/world?country_code=DZ', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));