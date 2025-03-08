import { useState } from "react";

export function Card({ imageURL, name }) {
    return (
        <div>
            <div>{name}</div>
            <img src={imageURL} alt="pokemon image" />
        </div>
    )
}