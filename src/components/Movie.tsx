import { useContext } from "react";
import type { IMovie } from "../interfaces/movie";
import CounterContext from "../context/CounterProvider";
import { FaRegHeart } from "react-icons/fa6";
import { MdAddCircleOutline } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import WishlistContext from "../context/WishlistProvider";
import { CiPlay1 } from "react-icons/ci";
import { Link } from "react-router";

interface IMovieComponent {
    movieData: IMovie,
}

const Movie = ({ movieData }: IMovieComponent) => {

    const { counter, increment } = useContext(CounterContext);
    const { handleWishlist } = useContext(WishlistContext);

    const sendToContext = (movieData: IMovie) => {
        handleWishlist(movieData);
    }

    const handleClick = () => {
        increment();
    }
    
    return (
        <div>
            <div>
                <div>
                    <div>
                        <img width={300} src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`} alt="movie" />
                        <h3>{movieData.title}</h3>
                        <p>{movieData.overview.slice(0, 40)}[...]</p>
                        <div className="flex items-center gap-3.5">
                            <FaRegHeart size={30} onClick={() => handleClick()} /> {counter ? - counter : ''}
                            {movieData.status === true ? (
                                <FaRegCircleCheck onClick={() => sendToContext(movieData)} size={30} />
                            ) : (
                                <MdAddCircleOutline onClick={() => sendToContext(movieData)} size={35} />
                            )}
                            <Link to={`movies/${movieData.id}`}><CiPlay1 size={35} /></Link> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Movie;