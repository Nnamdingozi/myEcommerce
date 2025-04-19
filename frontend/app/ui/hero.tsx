// 'use client'

// import { useState, useEffect } from 'react';
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

// const Hero: React.FC = () => {
// const slides: string[] = [
//     '/images/img-1.jpg',
//     '/images/img-2.jpg',
//     '/images/img-3.jpg',
//     '/images/img-4.jpg',
//     '/images/img-5.jpg',
// ];

// const texts: string[] = [
// 'Shopping made easy for everyone',
// 'Buy more for Less',
// 'Get Updates on trending goods',
// 'Family shop for Online shopping at its best',
// 'Experience seamless transactions '
// ];


// const [currentSlide, setCurrentSlide] = useState<number>(0);
// const [isTransitioning, setIsTransitioning] = useState<boolean>(false);


//  const nextSlide =() => {
//     if(!isTransitioning) {
//         setIsTransitioning(true);
//         setTimeout(()=> {
//             setCurrentSlide((prev) => (prev + 1  ) % slides.length);
//             setIsTransitioning(false);
//         }, 1000);
//     }

//  };

//  const prevSlide =() => {
//     if(!isTransitioning) {
//         setIsTransitioning(true);
//         setTimeout(()=> {
//             setCurrentSlide((prev) => (prev === 0 ? slides.length-1 : prev - 1  ));
//             setIsTransitioning(false);
//         }, 1000);
//     }
//  };

//  useEffect(() => {
//     const intervalId = setInterval(nextSlide, 5000);
//     return ()=> clearInterval(intervalId)
//    }, [nextSlide]);


// return (
// <div className='relative group h-64 overflow-hidden border-2 border-black-800 top-8 transition-all duration-500 ease-in-out mt-6 mb-3 mx-5' >
// <div className='absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover: bg-opacity-70 ease-in-out w-full rounded-lg'
// style={{backgroundImage: `url(${slides[currentSlide]})`, backgroundSize: '100%', backgroundPosition: 'center'}}>

//     <div className='w-[40%] h-32 absolute top-6 left-2 h-30 bg-white/50 transition-all duration-500  ease-in-out group-hover: bg-opacity-70 animate-bounce' >
// <p className='text-3xl font-extrabold bg-gradient-to-r from-rose-600 via-brown-500 to-gray-700 text-transparent bg-clip-text drop-shadow-lg transition-all duration-500 ease-in-out'>{texts[currentSlide]}</p>

//     </div>
   
//     <button 
//     className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-black/50  text-red-800 p-2' 
//     onClick ={prevSlide}
//     ><ChevronLeftIcon className="h-10 w-10" /></button>

// <button
//         onClick={nextSlide}
//         className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-black/50 text-red-800 p-2"
//       >
//        <ChevronRightIcon className="h-10 w-10"/>
//       </button>

// </div>
// </div>
// )
// };

// export default Hero

'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const Hero: React.FC = () => {
  const slides: string[] = [
    '/images/img-1.jpg',
    '/images/img-2.jpg',
    '/images/img-3.jpg',
    '/images/img-4.jpg',
    '/images/img-5.jpg',
  ];

  const texts: string[] = [
    'Shopping made easy for everyone',
    'Buy more for Less',
    'Get Updates on trending goods',
    'Family shop for Online shopping at its best',
    'Experience seamless transactions ',
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 1000);
    }
  }, [isTransitioning, slides.length]);

  const prevSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        setIsTransitioning(false);
      }, 1000);
    }
  }, [isTransitioning, slides.length]);

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalId);
  }, [nextSlide]); // `nextSlide` is now stable due to useCallback

  return (
    <div className="relative group h-64 overflow-hidden border-2 border-black-800 top-8 transition-all duration-500 ease-in-out mt-6 mb-3 mx-5">
      <div
        className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:bg-opacity-70 ease-in-out w-full rounded-lg"
        style={{
          backgroundImage: `url(${slides[currentSlide]})`,
          backgroundSize: '100%',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-[40%] absolute top-6 left-2 h-30 bg-white/50 transition-all duration-500 ease-in-out group-hover:bg-opacity-70 animate-bounce">
          <p className="text-3xl font-extrabold bg-gradient-to-r from-rose-600 via-brown-500 to-gray-700 text-transparent bg-clip-text drop-shadow-lg transition-all duration-500 ease-in-out">
            {texts[currentSlide]}
          </p>
        </div>

        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-black/50 text-red-800 p-2"
          onClick={prevSlide}
        >
          <ChevronLeftIcon className="h-10 w-10" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-black/50 text-red-800 p-2"
        >
          <ChevronRightIcon className="h-10 w-10" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
