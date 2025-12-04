import axios from "axios";
import type { IMovie } from "../interfaces/movie";

const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMmQzYzM5OTU0YzZkOTk2Nzg4ZjcyY2NlNjJjZDBkNSIsIm5iZiI6MTc2MzQ4MjA3OC43NDgsInN1YiI6IjY5MWM5OWRlZjk1ZTZiZWQ3YzUyZjFkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W4BxXSU7yRtp5RmdDR9kcztKpbOrRNmmHQupTjU0WjM'
    }
};

export const getMovies = async (page: number) => {
        
    try {
        const moviesfromAxios = await axios.get(options.url + page, {
            headers: options.headers
        });
        
        if (moviesfromAxios.status === 200) {
            return moviesfromAxios.data.results.map((movie: IMovie) => ({ ...movie, status: false }));
        } else {
            throw new Error("Problème sserveur")
        }
    } catch (error) {
        console.error("Error: ", error);
    }

}