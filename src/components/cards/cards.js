import React from "react";
import Card from "./card";

function Cards({ jsonData, visibleData }) {
    visibleData = jsonData.slice(0, visibleData);

    return (
        <>
            {visibleData.map((item, index) => {
                return (
                    <Card 
                        key={`card-${index}`}
                        jsonData={item.ok} 
                    />
                );
            })}
        </>
    );
}

export default Cards;