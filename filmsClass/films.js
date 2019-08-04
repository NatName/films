
class Film {
     static getMovies(films) {
       const middleWare = films.toString().split(/:|\n/).filter(temp => temp != '');
       let movies = [];
       let id = 0;
           for(let i = 0; i < middleWare.length; i+=8) {
             movies.push({Id: id++,
               Title: middleWare[i + 1].trim(),
               Year: parseInt(middleWare[i + 3]),
               Format: middleWare[i + 5].trim(),
               Stars: middleWare[i + 7].trim()
               })
           }
           return movies;
    }
}

module.exports = Film;
