import '../css/AnimeCard.css'
import { useAnimeContext } from '../contexts/AnimeContext'
import { useNavigate } from 'react-router-dom'

function AnimeCard({anime}) {

    const navigate = useNavigate()

    const handleClick = (e)=>{
        e.stopPropagation();
        navigate(`/anime/${anime.mal_id}`)
    }

    const {isFavorite, addToFavorites, removeFromFavorites} = useAnimeContext()
    const favorite = isFavorite(anime.mal_id)


    function onFavoriteClick(e){
        e.stopPropagation()
        e.preventDefault()
        if (favorite) removeFromFavorites(anime.mal_id)
        else addToFavorites(anime)
    }

    return(
        <div>
            <div className="anime-card" >
                <div className="anime-poster" onClick={handleClick} style={{cursor:'pointer'}} >
                    {/* <div className="anime-img" > */}
                        <img src={anime.images.jpg.image_url} alt= {anime.title}  />
                    {/* </div> */}
                    
                    <div className="anime-overlay">
                        <button className={`favorite-btn ${favorite ? "active" : ""}`} 
                        onClick={onFavoriteClick}>♥</button>
                    </div>
                </div>
                <div className="anime-info">
                    <h5>{anime.title}</h5>
                    <h3>Score: ⭐ {anime.score}</h3>
                    <p>Aired: {anime.aired.string}</p>
                </div>
                
            </div>
        </div>
    )

}


export default AnimeCard