import ContentLoader from "react-content-loader";
import Movie from "../components/Movie";
import type { IMovie } from "../interfaces/movie";
import type { IProduct } from "../interfaces/product";
import { useWishlist } from "../services/store/wishlistStore";
import { useMoviesQuery } from "../services/tantstack/queryMovies";
import { useEffect } from "react";

interface HomeComponent {
    addProduct: (name: IProduct) => void,
    products: Array<IProduct>
};

const Home = ({ addProduct, products }: HomeComponent) => {
    const page = useWishlist((state) => state.page);
    const setMovies = useWishlist((state) => state.setMovies);
    const setPage = useWishlist((state) => state.setPage);
    const wishlist = useWishlist((state) => state.wishlist);
    const movies = useWishlist((state) => state.movies);
    const { data, isError, isLoading, refetch } = useMoviesQuery(page);
    const numberLoader = 20;
    const emptyArray = new Array(numberLoader);

     const addPage = () => {
        setPage();
        refetch();
    }

     useEffect(() => {{

        if (data) {
            setMovies(data);
        }

    }}, [data])


    return (
        <div>
            <div>
                <button onClick={() => addProduct({ name: 'pop-corn' })} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Poc-corn</button>
                <button onClick={() => addProduct({ name: 'soda' })} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Soda</button>
            </div>
            <p>Coisissez jusqu'à 2 produits: {products.map((product) => product.name).join(', ')}</p>
            <div className='inline-flex items-center justify-center flex-wrap gap-2.5'>
                {isError && <span>Error loading !</span>}
                {isLoading ? (
                    Array.from(emptyArray).map((_, i) => (
                        <ContentLoader
                            key={i}
                            speed={2}
                            width={300}
                            height={500}
                            viewBox="0 0 200 300"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                        >
                            <rect x="0" y="0" rx="8" ry="8" width="200" height="250" />
                            <rect x="0" y="260" rx="4" ry="4" width="150" height="20" />
                        </ContentLoader>
                    ))
                ) : movies.map((movieData: IMovie) => {
                    const inWishlist = wishlist.find((movie) => movie.id === movieData.id);
                    const movieWithStatus = inWishlist ? {...movieData, status: true} : {...movieData, status: false};
                    return <Movie movieData={movieWithStatus} />
                })}
                <button onClick={() => addPage()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Voir plus{page}</button>
            </div>
        </div>
    );
};

export default Home;