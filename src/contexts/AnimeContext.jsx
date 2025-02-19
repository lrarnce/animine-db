import { createContext,useState,useEffect, useContext } from "react";

const AnimeContext = createContext()

export const useAnimeContext = () => useContext(AnimeContext)

export const AnimeProvider = ({children}) =>{

    const [favorites, setFavorites] = useState(() => {
        try {
            const storedFavs = localStorage.getItem("favorites");
            return storedFavs ? JSON.parse(storedFavs) : []; // ✅ Prevents empty state on refresh
        } catch (error) {
            console.error("Error loading favorites:", error);
            return [];
        }
    });

    useEffect(()=>{
        const storedFavs = localStorage.getItem("favorites")
        if(storedFavs) setFavorites(JSON.parse(storedFavs))

    },[])

    useEffect(()=>{
        localStorage.setItem('favorites', JSON.stringify(favorites))
    },[favorites])

    const addToFavorites = (anime)=>{
        setFavorites(prev=>[...prev, anime])
    }

    const removeFromFavorites = (animeId) =>{
        setFavorites(prev=> prev.filter(anime=>anime.mal_id !== animeId))

    }

    const isFavorite = (animeId) =>{
        return favorites.some(anime => anime.mal_id === animeId)
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <AnimeContext.Provider value={value}>
        {children}
    </AnimeContext.Provider>


}