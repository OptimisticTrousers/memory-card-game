export default function Card({name, image, handleClick}){
    return (
        <figure onClick={handleClick}>
                <img src={image} alt={name}/>
            <figcaption>
                {name}
            </figcaption>
        </figure>
    )
}