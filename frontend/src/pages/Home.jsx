import { useState } from "react";
import Hero from "../components/home/Hero";
import Zones from "../components/home/Zones";
import CategExplor from "../components/home/CategExplor";

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
