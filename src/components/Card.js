export default function Card({fullName, image, handleClick}){
    return (
        <figure onClick={handleClick}>
                <img src={image} alt={fullName}/>
            <figcaption>
                {fullName}
            </figcaption>
        </figure>
    )
}