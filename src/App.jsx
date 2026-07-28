import React from 'react';
import Hero from './components/Hero';
import Editorial from './components/Editorial';
import AirportYYZ from './components/AirportYYZ';
import LeeLifesonPark from './components/LeeLifesonPark';
import MasseyHall from './components/MasseyHall';
import HendersonBrewing from './components/HendersonBrewing';
import OntarioAssembly from './components/OntarioAssembly';
import FooterMap from './components/FooterMap';
import SurrealDivider from './components/SurrealDivider';

function App() {
  return (
    <>
      <Hero />
      <SurrealDivider />
      <Editorial />
      <SurrealDivider />
      <AirportYYZ />
      <SurrealDivider />
      <LeeLifesonPark />
      <SurrealDivider />
      <MasseyHall />
      <SurrealDivider />
      <HendersonBrewing />
      <SurrealDivider />
      <OntarioAssembly />
      <SurrealDivider />
      <FooterMap />
    </>
  );
}

export default App;
