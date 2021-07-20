import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';


function App() {

  // useState for CRUD
  const [movieName, setMovieName] = useState('');
  const [movieReview, setMovieReview] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState('');


  // get all table from db when the site opens or refreshes
  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieList(response.data);
    })
  }, [])
  
  // review submit function
  const submitReview = () => {
    if(movieName === '' || movieReview === '') return;
    Axios.post('http://localhost:3001/api/insert', 
    { // object to use
      movieName: movieName,
      movieReview: movieReview,
    }
    ).then( // refresh list
      setMovieList([...movieList, {movieName: movieName, movieReview: movieReview}])
    )
    setMovieName('');
  };

  // delete function
  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  }

  // update function
  const updateReview = (movie) => {
    Axios.put('http://localhost:3001/api/update', 
    {
      movieName: movie,
      movieReview: newReview,
    }
    ).then(setNewReview('')) // change the review input empty after update
    }


  // return page!!
  return (

    // page body
    <div className="App">
      <h1>Crud Application</h1>

      {/* form */}
      <div className='form'>

        <label>Movie Name:</label>
        <input type='text' name='movieName' 
          onChange={(e) => {
            setMovieName(e.target.value)
          }} />

        <label>Review:</label>
        <input type='text' name='movieReview' 
          onChange={(e) => {
            setMovieReview(e.target.value)
          }} />

        <button onClick={() => {
          submitReview();
          }}>Submit</button>

        <h2>Movie list</h2>
        
        {movieList.map((val) => {
          return (
            <div className='card'>
              <h1>{val.movieName}</h1> 
              <h2>{val.movieReview}</h2>
              <button onClick={()=>{deleteReview(val.movieName)}}>Delete</button>
              <input type='text' onChange={(e) => {
                setNewReview(e.target.value);
              }} />
              <button onClick={()=> {updateReview(val.movieName)}}>Update</button>
            </div>
            );
        })}
      </div>

      
    </div>
  );
}

export default App;
