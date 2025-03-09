import "../styles/Card.css";

export function Card({ imageURL, name, executeOnClick }) {
    return (
        <div className="pokemon-card" onClick={() => executeOnClick()}>
            <div className="pokemon-name">{name}</div>
            <img src={imageURL} alt={`${name} image`} />
        </div>
    )
}