import slides from "./cards";
import React from "react";
import { useRef } from "react"; 

function Slider() {

    const sliderRef = useRef(null);

    const slideLeft = () => {
        sliderRef.current.scrollBy({
            left: -430,
            behavior: "smooth",
        });
    };
    
    const slideRight = () => {
        sliderRef.current.scrollBy({
            left: 430,
            behavior: "smooth",
        });
    };


    return (
        <>
            <div className="info-advantages__slider">
                <button onClick={slideLeft} className="info-advantages__btn">
                    <img src={require("../../img/left.svg").default} alt="<"></img>
                </button>
                <div className="cards-container">
                    <div className="cards-wrapper" ref={sliderRef}>
                        {slides.map((slide, index) => {
                            return (
                                <div className="slide" key={index}>
                                    {slide}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <button onClick={slideRight} className="info-advantages__btn">
                    <img src={require("../../img/right.svg").default} alt=">"></img>
                </button>
            </div>
        </>
    )
}
export default Slider
