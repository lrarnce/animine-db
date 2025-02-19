const BASE_URL='https://api.jikan.moe/v4/'

export const getPopularAnimes = async () => {
    const response = await fetch(`${BASE_URL}top/anime`)
    const data = await response.json()

    return data.data

}

export const searchAnimes = async (query) => {
    const response = await fetch(`${BASE_URL}anime?q=${encodeURIComponent(query)}`)
    const data = await response.json()

    return data.data

}

export const getAnimeDetails = async (id) => {
    const response = await fetch(`${BASE_URL}anime/${id}`)
    const data = await response.json()

    return data.data

}