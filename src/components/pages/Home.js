import React from 'react'

import '../../App.css';
import Cards from '../Cards/Cards';
import Footer from './../Footer/Footer';
import HeroSection from './../HeroSection/HeroSection';

const Home = () => {
  return (
    <div>
      <HeroSection />
      {/* <Cards src='images' /> */}
      <Footer />
    </div>
  )
}

export default Home;
