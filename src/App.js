import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import axios from 'axios';

const App = () => {
  return (
    <div>
      <Dogs />
    </div>
  );
};

const Dogs = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('v');
  const SearchValue = useRef('');

  useEffect(() => {
    axios(
      {
        method: 'GET',
        url: `https://api.thedogapi.com/v1/breeds/search?q=${query}`,
        headers: {
          'x-api-key': '4bd37ea1-9401-4e1f-946f-f3842cf15e91',
        },
        params: {
          language_code: 'en',
        },
      },
      [query]
    )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  });
  return (
    <div className="app">
      <h1>Learn About Dogs</h1>
      <input
        type="text"
        ref={SearchValue}
        onChange={() => setQuery(SearchValue.current.value)}
        placeholder="Enter dog breed name"
      />
      <div className="cards">
        {data.map((dog) => (
          <DogBreed key={dog.id} dog={dog} />
        ))}
      </div>
    </div>
  );
};

const DogBreed = ({ dog }) => {
  return (
    <div className="card">
      <div className="card-inner">
        <div className="card-front">
          <img
            src={
              dog.reference_image_id
                ? `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`
                : 'https://www.pngitem.com/pimgs/m/254-2549847_404-png-download-404-not-found-transparent-png.png'
            }
            alt={dog.name}
          />
          <h2 style={{ paddingLeft: '10px' }}>{dog.name}</h2>
        </div>
        <div className="card-back">
          <h2>
            <strong>Name:</strong> {dog.name}
          </h2>
          <h3>
            <strong>Life Span:</strong> {dog.life_span}
          </h3>
          <h3>
            <strong>Breed Group:</strong> {dog.breed_group}
          </h3>
          <h3>
            <strong>Temperament:</strong> {dog.temperament}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default App;
