import { useState } from "react";

export function Card({ imageURL, name, executeOnClick }) {
    return (
        <div onClick={() => executeOnClick()}>
            <div>{name}</div>
            <img src={imageURL} alt={`${name} image`} />
        </div>
    )
}