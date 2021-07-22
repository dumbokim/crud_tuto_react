import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const MovieListCard = () => {

  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data);
      console.log(movieList);
    })
  }, []);

  // delete function
  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  }


  return  (movieList.map((val) => {
      return (
        <div className='card'>
          <p id='movId'>{val.id}</p>
          <p id='movName'>{val.movieName}</p> 

          {/* when onClick={deleteReview(val.movieName)} is not working???? 
            => i think val.movie means all of the movie in the list 
            So i need to write sending a single variable */}
          <button onClick={()=>{deleteReview(val.movieName)}}>delete</button>
        </div>
        );
    }))
  
}

export default MovieListCard;