const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === XMLHttpRequest.DONE) {
    if (this.status >= 200 && this.status < 300) {
      console.log(this.responseText);
    } else {
      console.error('Request failed with status:', this.status);
    }
  }
});

xhr.open("GET", "https://shazam-core.p.rapidapi.com/v1/charts/world");
xhr.setRequestHeader("x-rapidapi-key", "81acd1d9f4msh5610853c6afd749p1033e3jsndf2cdf54e689");
xhr.setRequestHeader("x-rapidapi-host", "shazam-core.p.rapidapi.com");

xhr.send(data);
