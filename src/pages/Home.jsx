import AnimeCard from "../components/AnimeCard"
import { useEffect, useState } from "react"
import '../css/Home.css'
import { getPopularAnimes, searchAnimes } from "../services/api"
import animeBanner from "../assets/002.gif";



function Home(){

    const [searchQuery,setSearchQuery]=useState('')
    const [animes,setAnimes]=useState([])
    const [error,setError]=useState(null)
    const [loading, setLoading] = useState(true)

    // const animes = [
    //     {id:1,title:'Naruto',release_date:'2003'},
    //     {id:2,title:'AOT',release_date:'2015'},
    //     {id:3,title:'Eyeshield 21',release_date:'2006'},
    // ]

    useEffect(()=>{
        const loadPopularAnimes = async() =>{
            try{
                const popularAnimes = await getPopularAnimes()
                setAnimes(popularAnimes)
            }
            catch(err){
                console.log(err)
                setError('Failed to load the anime')
            }
            finally{
                setLoading(false)
            }
        }

        loadPopularAnimes()

    },[])

    const handleSearch =async(e)=>{
        e.preventDefault()

        if(!searchQuery.trim())return
        if(loading) return

        setLoading(true)

        try{
            const searchResults = await searchAnimes(searchQuery)
            setAnimes(searchResults)
            setError(null)
        }
        catch(err){
            console.log(err)
            setError('Failed to search the anime')
        }
        finally{
            setLoading(false)
        }

    }
    return(
        <div className="home">
           
            <form onSubmit={handleSearch} className="search-form">
                <input 
                className="search-input"
                type="text" 
                placeholder="Search for anime..." 
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}

                />
                <button type="submit" className="search-btn">Search</button>
            </form>

            {error && <div className="error">{error}</div> }

            {loading ? <div className="loading"><img src={animeBanner} alt="Loading..." />Loading...</div>: 
             <div className="anime-grid">
             {animes.map((anime)=>(
                 <AnimeCard anime={anime} key={anime.mal_id}/>
             ))}
            </div>}
           
            
        </div>
    )
}

export default Home