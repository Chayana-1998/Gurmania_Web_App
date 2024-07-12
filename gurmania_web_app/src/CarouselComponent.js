import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // импорт стилей карусели
import './App.css'
import car_1 from './1.png'
import car_2 from './2.png'
import car_3 from './3.png'

const CarouselComponent = () => {
    return (
        <Carousel
            className = "carousel"
            showThumbs={false}
            autoPlay
            infiniteLoop
            interval={10000} // Интервал между автоматическими переходами (в миллисекундах)
            transitionTime={1000} // Скорость анимации перехода (в миллисекундах)
            >
            <div>
                <img src={car_1} alt="Картинка нумеро уно" />
            </div>
            <div>
                <img src={car_2} alt="Картинка нумеро дос" />
            </div>
            <div>
                <img src={car_3} alt="Картинка нумеро трес" />
            </div>
        </Carousel>
    );
};

export default CarouselComponent;
