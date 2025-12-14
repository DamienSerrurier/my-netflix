import type { IMovie } from "../interfaces/movie";
import { useWishlist } from "../services/store/wishlistStore";

const Mylist = () => {
    const clearMovies = useWishlist((state => state.clearMovies));
    const handleWishlist = useWishlist((state => state.handleWishlist));
    const wishlist = useWishlist((state) => state.wishlist);

    const deleteMovie = (movie: IMovie) => {
        handleWishlist(movie);
    };

    const clearWishlist = () => {
        useWishlist.persist.clearStorage();
        clearMovies();
    };

    return (
        <div>
            <button onClick={() => clearWishlist()} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 my-5 px-4 rounded">Clear the Wishlist</button>
            {wishlist.filter((movie: IMovie) => movie.status === true).map((movie: IMovie) => (
                <div className="flex gap-2.5">
                    <h3>{movie.title}</h3>
                    <button onClick={() => deleteMovie(movie)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Supprimer</button>
                </div>
            ))
            }
        </div>
    );
};

export default Mylist;