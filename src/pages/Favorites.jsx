import '../css/Favorites.css'
import { useAnimeContext } from '../contexts/AnimeContext'
import AnimeCard from '../components/AnimeCard'

function Favorites(){


    const { favorites } = useAnimeContext();


    return (
        <div className="favorites">
            {favorites.length > 0 ? (
                <>
                    <h2>Your Favorites</h2>
                    <div className="anime-grid">
                        {favorites.map((anime) => (
                            <AnimeCard anime={anime} key={anime.mal_id} />
                        ))}
                    </div>
                </>
            ) : (
                <div className="favorites-empty">
                    <h2>No Favorite Animes yet</h2>
                    <p>Start adding your favorite animes here...</p>
                </div>
            )}
        </div>
    );
    
  
}

export default Favorites