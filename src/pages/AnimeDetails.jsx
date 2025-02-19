import { useParams } from "react-router-dom"
import "../css/AnimeDetails.css"
import { getAnimeDetails } from "../services/api"
import { useEffect, useState } from "react"
import animeBanner from "../assets/002.gif";
import { useAnimeContext } from '../contexts/AnimeContext'
import "../css/AnimeCard.css"

function AnimeDetails(){

    const {id} = useParams()
    const [anime,setAnime]=useState(null)
    const [error,setError]=useState(null)
    const [loading, setLoading] = useState(true)

    const {isFavorite, addToFavorites, removeFromFavorites} = useAnimeContext()
    const favorite = anime ? isFavorite(anime.mal_id) : false;




    useEffect(()=>{
            const loadAnimeDetails = async(id) =>{
                try{
                    const animeDetails = await getAnimeDetails(id)
                    setAnime(animeDetails)
                }
                catch(err){
                    console.log(err)
                    setError('Failed to load the anime')
                }
                finally{
                    setLoading(false)
                }
            }
    
            loadAnimeDetails(id)
    
        },[id])

    
        function onFavoriteClick(e){
            e.stopPropagation();
            e.preventDefault();
            if (!anime) return; // Prevents error when anime is still loading
        
            if (favorite) removeFromFavorites(anime.mal_id);
            else addToFavorites(anime);
        }
        
    return(
        <div className="anime-details-main">
            {error && <div className="error">{error}</div> }
            {loading ? <div className="loading"><img src={animeBanner} alt="Loading..." />Loading...</div>: 
             <div className="anime-details">
                <div className="anime-details-left">
                <img src={anime.images.jpg.image_url} alt= {anime.title}  />
                </div>
                
                <div className="anime-details-right">
                <h1>{anime.title}</h1>
                <br />
                    <div className="btn-group">
                        <button className={`favorite-btn2 ${favorite ? "active" : ""}`} 
                        onClick={onFavoriteClick}>♥</button>
                        
                        <h3>Score: ⭐{anime.score}</h3>
                        <h3>|</h3>
                        <h3>Ranked #{anime.rank}</h3>
                        <h3>|</h3>
                        <h3>Popularity #{anime.popularity}</h3>
                        
                    </div>
                    <br />
                    <div className="season">
                        <p><strong>Released:</strong> {anime.season ? anime.season.charAt(0).toUpperCase() + anime.season.slice(1) : ""} {anime.year}</p>
                        <p><strong>Episodes:</strong> {anime.episodes || "N/A"}</p>
                        <p><strong>Genres:</strong> {anime.genres.map(genre => genre.name).join(", ")}</p>
                    </div>
                    <br />
                    
                   
                    <h3>Synopsis</h3>
                    <br />
                    <hr />
                    <br />
                    {anime.synopsis}
                </div>

                
                
            </div>}
               
        </div>
        
    )
}

export default AnimeDetails