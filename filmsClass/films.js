
class Film {
     static getMovies(moviesBuffer) {
        const movies = moviesBuffer.toString().split(/\n/).filter(temp => temp != '');
        let oneFilm = {
          Title: "",
          "Release Year": 0,
          Format: "",
          Stars: ""
        };
        let films = [], counter = 1;
        for(let movie of movies) {
          for(let film in oneFilm) {
            if(movie.includes(film)) {
              oneFilm[film] = movie.slice(film.length + 1).trim();
            }
          }
          if(oneFilm["Stars"] !== "" && oneFilm["Title"] !== "" &&
            oneFilm["Release Year"] !== 0 && oneFilm["Format"] !== "") {
            films.push(Object.assign(oneFilm));
            oneFilm = {
              Title: "",
              "Release Year": 0,
              Format: "",
              Stars: ""
            };
          } else if (counter % 4 === 0) {
            return false;
          }
          counter++;
        }
        return films;
     }
     static check(films) {
        if(films === false) return false;
        let starsOfFilm = [];
        for (let film of films) {
          starsOfFilm = film["Stars"].split(",");
          if(!/(\w|\s|\.|:)+/.test(film["Title"]) ||
            !/(19\d\d)|(20[01]\d)/.test(film["Release Year"]) ||
            !/(DVD|VHS|Blu-Ray)/.test(film["Format"]) ||
            !starsOfFilm.every(temp => /[A-Z][a-z]+\s+[A-Z][a-z]+/.test(temp.trim())))
              return false;
        }
        return true;
    }
    static checkStars(stars) {
      let starsOfFilm = stars.split(",");
      return starsOfFilm.every(temp => /[A-Z][a-z]+\s+[A-Z][a-z]+/.test(temp.trim()));
    }
}

module.exports = Film;
