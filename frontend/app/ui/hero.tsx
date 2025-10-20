
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi, // Import the CarouselApi type for better state typing
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";

// heroContent array remains the same...
const heroContent = [
  { image: '/images/img-1.jpg', title: 'Shopping Made Easy', subtitle: 'Discover endless possibilities with our curated collections...', cta: 'Shop Now' },
  { image: '/images/img-2.jpg', title: 'Unbeatable Value', subtitle: 'Experience luxury without the label. Get more for less...', cta: 'Explore Deals' },
  { image: '/images/img-3.jpg', title: 'Stay Ahead of Trends', subtitle: 'Get timely updates on the hottest arrivals and must-have items...', cta: 'Discover Trends' },
  { image: '/images/img-4.jpg', title: 'For the Whole Family', subtitle: 'From kids to adults, find something special for everyone...', cta: 'Shop Family' },
  { image: '/images/img-5.jpg', title: 'Seamless & Secure', subtitle: 'Enjoy a smooth, secure, and delightful transaction experience...', cta: 'Learn More' },
];

const Hero: React.FC = () => {
  // Use the specific CarouselApi type for better autocompletion and safety
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="relative w-full max-w-7xl mx-auto my-12 px-4">
      <Carousel
        setApi={setApi}

        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {heroContent.map((slide, index) => (
            <CarouselItem key={index}>
              <Card className="border-none shadow-none rounded-lg overflow-hidden">
                <CardContent className="relative flex items-center justify-center p-0 h-80 md:h-96">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    layout="fill"
                    objectFit="cover"
                    className="z-0"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/40 z-10" />
                  <div className="relative z-20 text-center text-white p-6 max-w-2xl">
                    <AnimatePresence>
                      {current === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                        >
                          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                            {slide.title}
                          </h1>
                          <p className="mt-4 text-lg md:text-xl text-slate-200 text-balance">
                            {slide.subtitle}
                          </p>
                          <button className="mt-8 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6">
                            {slide.cta}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 text-white border-white/40 hover:bg-white/30" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 text-white border-white/40 hover:bg-white/30" />
      </Carousel>

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {heroContent.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              current === index ? 'bg-white scale-125' : 'bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;


// 'use client';
// import Image from 'next/image';
// import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
// import Autoplay from "embla-carousel-autoplay";

// const slides = ['/images/img-1.jpg', '/images/img-2.jpg', '/images/img-3.jpg'];

// const MinimalHero = () => {
//   return (
//     <div className="p-12">
//       <Carousel plugins={[Autoplay({ delay: 2000 })]}>
//         <CarouselContent>
//           {slides.map((src, index) => (
//             <CarouselItem key={index}>
//               <div className="h-80 w-full relative">
//                 <Image src={src} alt={`Slide ${index}`} layout="fill" objectFit="cover" />
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//       </Carousel>
//     </div>
//   );
// }
// export default MinimalHero;