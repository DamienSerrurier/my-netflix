import { createContext, useEffect, useState, type ReactNode } from "react";
import type { IMovie } from "../interfaces/movie";
import { getMovies } from "../api/movies";
import { useQuery } from "@tanstack/react-query";

interface IMoviesContext {
    children: ReactNode
}

interface IContextMovies {
    movies: Array<IMovie>,
    wishlist: Array<IMovie>,
    counterMovies: number,
    isLoading: boolean,
    isError: boolean,
    page: number,
    toggleStatus: (id: number) => void,
    handleWishlist: (movie: IMovie) => void,
    clearMovies: () => void,
    addPage: () => void
}

const WishlistContext = createContext<IContextMovies>({
    movies: [],
    wishlist: [],
    counterMovies: 0,
    isLoading: true,
    isError: false,
    page: 1,
    toggleStatus: () => { },
    handleWishlist: () => { },
    clearMovies: () => { },
    addPage: () => { }

});

export const WishlistProvider = ({ children }: IMoviesContext) => {
    const [movies, setMovies] = useState<Array<IMovie>>([]);
    const [wishlist, setWishlist] = useState<Array<IMovie>>(JSON.parse(localStorage.getItem("movies") ?? '[]'));
    const [counterMovies, setCounterMovies] = useState<number>(JSON.parse(localStorage.getItem("counterMovies") ?? '0'));
    // const [isLoading, setIsloading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    // const movies: Array<IMovie> = [];

    const getDataFromDB = async (page: number) => {
        // setIsloading(true);
        const moviesFromDB = await getMovies(page);
        const syncedMovies = moviesFromDB.map((movie: { id: number }) => {
            const inWishlist = wishlist.find(w => w.id === movie.id);
            return inWishlist ? { ...movie, status: true } : { ...movie, status: false };
        });

        if (moviesFromDB) {
            // setIsloading(false);
            if (page >= 2) {
                const acculatedMovies = [...movies, ...syncedMovies];
                setMovies(acculatedMovies);
                return acculatedMovies;
            } else {
                setMovies(syncedMovies);
                return syncedMovies;
            }

        }
        return moviesFromDB
    };

    const { data, isError, isLoading, refetch } = useQuery({
        queryKey: ['movies'],
        queryFn: () => getDataFromDB(page),
        staleTime: 10000,
        enabled: true
    })

    useEffect(() => {{
        if (data) {
            setMovies(data);
        }
    }}, [data])

    const toggleStatus = (id: number) => {
        const moviesList = movies.map((movie: IMovie) => movie.id === id ? { ...movie, status: !movie.status } : movie);
        setWishlist(moviesList);

    }

    const handleWishlist = (movie: IMovie) => {
        if (!movie.status) {
            const updateMovieStatus = { ...movie, status: true };
            const updatedWishlist = [...wishlist, updateMovieStatus];
            const updateMovies = movies.map((mov) => mov.id === movie.id ? { ...movie, status: true } : mov);
            const moviesNumber = counterMovies + 1;
            setMovies(updateMovies);
            setWishlist(updatedWishlist);
            setCounterMovies(moviesNumber);
            localStorage.setItem('movies', JSON.stringify(updatedWishlist));
            localStorage.setItem('counterMovies', JSON.stringify(moviesNumber))

        } else {
            const updateMovieStatus = { ...movie, status: false };
            const updatedWishlist = wishlist.filter((mov) => mov.id !== movie.id);
            const updateMovies = movies.map(m => m.id === movie.id ? updateMovieStatus : m);
            const moviesNumber = counterMovies - 1;
            setMovies(updateMovies);
            setWishlist(updatedWishlist);
            setCounterMovies(moviesNumber);
            localStorage.setItem('movies', JSON.stringify(updatedWishlist));
            localStorage.setItem('counterMovies', JSON.stringify(moviesNumber))
        }
    }

    const addPage = () => {
        console.log(page)
        setPage(page + 1);
        refetch();
    }

    const clearMovies = () => {
        localStorage.clear();
        setWishlist([]);
        setCounterMovies(0);
        const moviesStatus: Array<IMovie> = movies.map((mov) => ({ ...mov, status: false }));
        setMovies(moviesStatus);
    }

    return (
        <WishlistContext.Provider value={{ movies, wishlist, counterMovies, isLoading, isError, page, toggleStatus, handleWishlist, clearMovies, addPage }}>
            {children}
        </WishlistContext.Provider>
    );
};

export default WishlistContext;