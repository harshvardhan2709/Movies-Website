const API_KEY = "c51c3f9cf4dc2e3aac563003aacf70c2";
const BASE_URL ="https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
    const res= await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await res.json()
    return data.results
};

export const searchMovies = async (query) => {
    const res= await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await res.json()
    return data.results
};