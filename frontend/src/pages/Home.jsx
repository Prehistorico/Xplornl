import { useState } from "react";
import Hero from "../components/home-components/Hero/Hero";
import Zones from "../components/home-components/Zones/Zones";
import CategExplor from "../components/home-components/CategExplor/CategExplor";

import "../styles/home/home.css"



export default function Home() {
  return (
    <>
      <Hero />
      <div className="home-page">
        <Zones />
        <CategExplor />
      </div>
    </>
  
  );
}
