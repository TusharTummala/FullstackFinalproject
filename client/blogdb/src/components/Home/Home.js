
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className='home-container'>
      <div className="home-row">
        <div className="home-col">
          <img src="https://wpmanageninja.com/wp-content/uploads/2018/07/0-FT-1.jpg" className="home-img" alt="Descriptive Alt Text" />
        </div>
        <div className="home-col">
          <h1 className="home-title home-text">
            Empowering Through Knowledge Sharing
          </h1>
          <h1 className="home-subtitle home-text">
            Knowledge Shared is Exponential Knowledge
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
