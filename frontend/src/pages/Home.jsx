import "../styles/home.css"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

import heroImage from "../assets/images/mountain.png"
import cardImage from "../assets/images/watchtower.png"
import zoneImage from "../assets/images/mountain2.png"
import Navbar from "../components/Navbar"

import PlaceModal from "../components/PlaceModal";
import ProfileModal from "../components/ProfileModal"
import { useState } from "react"

export default function Home() {

const cards = [1,2,3,4,5]
const [selectedPlace, setSelectedPlace] = useState(null);
const [profileOpen,setProfileOpen] = useState(false)

const placeExample = {
  name: "Cerro de la Silla",
  category: "Parque",
  image: "/images/mountain.png",
  hours: "Abierto",
  address: "Calle Cerro de la Silla, Monterrey",
  phone: "81 1234 5678",
  website: "https://visitmonterrey.mx",
  similar: [
    "/images/mountain2.png",
    "/images/mountain2.png",
    "/images/mountain2.png"
  ]
};

return (

<div className="home">

{/* HERO SECTION */}

<section
className="hero"
style={{ backgroundImage: `url(${heroImage})` }}
>

<div className="hero-content">

<h1>NOMBRE DEL LUGAR</h1>

<button className="explore-btn">Explorar </button>

</div>

</section>


{/* LUGARES POPULARES */}

<section className="section">
<h2>Lugares Populares</h2>

<Swiper
modules={[Navigation]}
navigation
spaceBetween={20}
breakpoints={{
  0: {slidesPerView: 3,},
  768: { slidesPerView: 4,},
  1024: {slidesPerView: 5,}
}}
>

{cards.map((card,index)=>(
<SwiperSlide key={index}>
<div className="card"style={{ backgroundImage: `url(${cardImage})` }}>
  <img
    src={cardImage}
    className="place-card"
    onClick={() => setSelectedPlace(placeExample)}
  />
</div></SwiperSlide>))}</Swiper></section>


{/* RECOMENDACIONES */}

<section className="section">

<h2>Recomendaciones</h2>

<Swiper
modules={[Navigation]}
navigation
spaceBetween={20}
breakpoints={{
  0: {slidesPerView: 3,},
  768: { slidesPerView: 4,},
  1024: {slidesPerView: 5,}
}}
>

{cards.map((card,index)=>(
<SwiperSlide key={index}>

<div
className="card"
style={{ backgroundImage: `url(${cardImage})` }}
></div>

</SwiperSlide>
))}

</Swiper>

</section>


{/* ZONAS DE MONTERREY */}

<section className="section">

<h2>Zonas de Monterrey</h2>

<Swiper
modules={[Navigation]}
navigation
spaceBetween={20}
breakpoints={{
  0: {slidesPerView: 3,},
  768: { slidesPerView: 4,},
  1024: {slidesPerView: 5,}
}}>

{cards.map((card,index)=>(
<SwiperSlide key={index}>

<div
key={index}
className="zone-card"
style={{ backgroundImage: `url(${zoneImage})` }}></div>
</SwiperSlide>
))}
</Swiper>
</section>


{/* AREAS NATURALES */}

<section className="section">

<h2>Areas Naturales</h2>

<Swiper
modules={[Navigation]}
navigation
spaceBetween={20}
breakpoints={{
  0: {slidesPerView: 3,},
  768: { slidesPerView: 4,},
  1024: {slidesPerView: 5,}
}}>

{cards.map((card,index)=>(
<SwiperSlide key={index}>

<div
className="card"
style={{ backgroundImage: `url(${cardImage})` }}></div>

</SwiperSlide>
))}

</Swiper>

</section>


{/* PARQUES */}

<section className="section">

<h2>Parques</h2>

<Swiper
modules={[Navigation]}
navigation
spaceBetween={20}
breakpoints={{
  0: {slidesPerView: 3,},
  768: { slidesPerView: 4,},
  1024: {slidesPerView: 5,}
}}
>

{cards.map((card,index)=>(
<SwiperSlide key={index}>

<div
className="card"
style={{ backgroundImage: `url(${cardImage})` }}
></div>

</SwiperSlide>
))}

</Swiper>
</section>

<PlaceModal
  place={selectedPlace}
  onClose={() => setSelectedPlace(null)}/>

<ProfileModal
open={profileOpen}
onClose={()=>setProfileOpen(false)}/>

</div>
)}

