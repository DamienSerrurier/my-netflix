import { useParams } from "react-router";
import type { IMovie } from "../interfaces/movie";
import { useContext, useEffect, useState } from "react";
// import { getMovie } from "../api/movie";
import WishlistContext from "../context/WishlistProvider";
import { getMovie } from "../api/movie";

const MovieDetails = () => {

    const { id } = useParams()
    const [movie, setMovie] = useState<IMovie>()
    const {page} = useContext(WishlistContext)

    const getMovieFromDBById = async (page: number) => {
        const moviesFromBDB= await getMovie(page);
        const movieById = moviesFromBDB.find((movie: IMovie) => movie.id === Number(id))
        setMovie(movieById);
    }

    useEffect(() => {
        getMovieFromDBById(page);
    }, [page])

    return (

        <div className="flex justify-center gap-6">
            <img width={300} src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`} alt="" />
            <div>
                <ul>
                    <li>{movie?.title} </li>
                    <li>{movie?.overview}</li>
                </ul>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Watch Movie</button>
            </div>
        </div>
    );
};

export default MovieDetails;