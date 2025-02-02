import React from 'react';
    import { ChevronLeft, ChevronRight } from 'lucide-react';

    interface HeroSliderProps {
      featuredProducts: any[];
      currentSlide: number;
      nextSlide: () => void;
      prevSlide: () => void;
    }

    const HeroSlider: React.FC<HeroSliderProps> = ({
      featuredProducts,
      currentSlide,
      nextSlide,
      prevSlide,
    }) => {
      return (
        <div className="relative h-[400px] mb-12 rounded-xl overflow-hidden">
          <div
            className="absolute inset-0 flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {featuredProducts.map((product: any, index: number) => (
              <div key={index} className="min-w-full h-full relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                  <h3 className="text-white text-3xl font-bold">{product.name}</h3>
                  <p className="text-white/90 mt-2">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
          >
            <ChevronRight />
          </button>
        </div>
      );
    };

    export default HeroSlider;
