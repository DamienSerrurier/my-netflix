import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../api/movies";
import { useWishlist } from "../store/wishlistStore";

export const useMoviesQuery = (page: number) => {
    const setMovies = useWishlist((state) => state.setMovies);

    const getDataFromDB = async (page: number) => {
        const moviesFromDB = await getMovies(page);

        if (moviesFromDB) {

            if (page >= 2) {
                const movies = useWishlist.getState().movies;
                const acculatedMovies = [...movies, ...moviesFromDB];
                setMovies(acculatedMovies);
                return acculatedMovies;
            } else {
                setMovies(moviesFromDB);
                return moviesFromDB;
            }
        }
        return moviesFromDB
    };

    // Méthode => GET
    const { data, isError, isLoading, refetch } = useQuery({
        queryKey: ['movies', page],
        queryFn: () => getDataFromDB(page),
        staleTime: 10000,
        enabled: true
    })

    return {data, isError, isLoading, refetch}
}

 

