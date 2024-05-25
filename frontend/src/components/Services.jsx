import React from 'react';
import './Services.css';
//import serviceImage from '../assets/green-massagebed.jpg';
import Navbar from './Navbar';
import contactimage from '../assets/huepink.jpg'

const ServicesComponent = () => {
  return (
    <div style={{ backgroundImage: `url(${contactimage})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <Navbar/>
      <div className="tailbloc-container">
            {/*Tailblocs code*/}
            <section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="text-center mb-20">
      <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">Our Services</h1>
      <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">Blue bottle crucifix vinyl post-ironic four dollar toast vegan taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi pug.</p>
      <div class="flex mt-6 justify-center">
        <div class="w-16 h-1 rounded-full bg-indigo-500 inline-flex"></div>
      </div>
    </div>
    <div class="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
      <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
        <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        </div>
        <div class="flex-grow">
          <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Derma Care </h2>
          <p class="leading-relaxed text-base">Our array of rejuvenating facials,meticulously designed to address your skin's individual requirements and enhance its natural beauty. Explore a spectrum of advanced treatments designed to elevate your skincare routine, providing not just temporary fixes but lasting, transformative results. Experience the perfect fusion of science and luxury as we cater to your skin's every desire, leaving you with a radiant glow that speaks volumes."</p>
          <a href = '/booking'class="mt-3 text-indigo-500 inline-flex items-center">Explore Our Facials
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
      <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
        <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
            <circle cx="6" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
          </svg>
        </div>
        <div class="flex-grow">
          <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Hair Removal Services</h2>
          <p class="leading-relaxed text-base">Unveil the path to effortless beauty with our range of hair removal solutions. Whether you seek the instant gratification of traditional waxing or the enduring sleekness of advanced laser treatments, we provide bespoke services tailored to your desires. Experience the evolution of smoothness as our expert technicians guide you through a seamless journey towards hair-free confidence. With us, discover a sanctuary where every preference finds its perfect match, and where smooth, radiant skin becomes your signature.</p>
          <a href ='/blogs'class="mt-3 text-indigo-500 inline-flex items-center">Explore Hair Removal Services
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
      <div class="p-4 md:w-1/3 flex flex-col text-center items-center">
        <div class="w-20 h-20 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10" viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <div class="flex-grow">
          <h2 class="text-gray-900 text-lg title-font font-medium mb-3">Relax, Heal, Balance</h2>
          <p class="leading-relaxed text-base">Dive into a realm of profound rejuvenation with our diverse range of massage therapies. Whether you crave the gentle touch of Swedish relaxation or the revitalizing power of deep tissue, each session is a tailored experience designed to harmonize your body, mind, and spirit. Experience the art of healing hands as our skilled therapists guide you towards profound relaxation and holistic balance where every touch is a step towards renewed vitality and inner peace.</p>
          <a href="/booking" class="mt-3 text-indigo-500 inline-flex items-center">Explore Massages
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <a href ="/booking"><button class="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"> VIEW PRICELIST</button></a>
  </div>
</section>

          </div>
    </div>
  )
}

export default ServicesComponent