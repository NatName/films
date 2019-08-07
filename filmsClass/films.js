
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
          console.log(film["Title"]);
          if(!/(\w|\s|\.|:)+/.test(film["Title"].toString()) ||
            !/(19\d\d\s)|(20[01]\d\s)/.test(film["Release Year"].toString().trim() + " ") ||
            !/((DVD|VHS|Blu-Ray)\s)/.test(film["Format"] + " ") ||
            !starsOfFilm.every(temp => /[A-Za-z]+\s+[A-Za-z]+\s/.test(temp.trim() + ' ')))
              return false;
        }
        return true;
     }
    static checkStars(stars) {
      let starsOfFilm = stars.split(",");
      console.log(starsOfFilm);
      return starsOfFilm.every(temp => /[A-Z][a-z]+\s+[A-Z][a-z]+\s/.test(temp.trim() + ' '));
    }
}

module.exports = Film;
