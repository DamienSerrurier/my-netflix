import { create } from 'zustand';
import type { IMovie } from '../../interfaces/movie';
import { persist, createJSONStorage } from 'zustand/middleware'

interface IWishlist {
    movies: Array<IMovie>;
    wishlist: Array<IMovie>;
    counterMovies: number;
    page: number;
    setMovies: (movies: Array<IMovie>) => void;
    handleWishlist: (movie: IMovie) => void;
    setPage: () => void;
    clearMovies: () => void;
}

export const useWishlist = create<IWishlist>()(
    persist(
        (set) => ({
            movies: [],
            wishlist: [],
            counterMovies: 0,
            page: 1,
            setMovies: (movies: Array<IMovie>) => set(() => ({ movies: movies })),
            handleWishlist: (movie: IMovie) => set((state: IWishlist) => {
                const isInWishlist = state.wishlist.some((mov) => mov.id === movie.id);

                if (!isInWishlist) {
                    const statusMovie = { ...movie, status: true }

                    return {
                        wishlist: [...state.wishlist, { ...movie, status: !isInWishlist }],
                        movies: state.movies.map((mov) => mov.id === movie.id ? statusMovie : mov),
                        counterMovies: state.counterMovies + 1
                    }
                } else {
                    const statusMovie = { ...movie, status: false }

                    return {
                        wishlist: state.wishlist.filter((mov) => mov.id !== movie.id),
                        movies: state.movies.map((mov) => mov.id === movie.id ? statusMovie : mov),
                        counterMovies: state.counterMovies - 1
                    };
                }
            }),
            setPage: () => set((state) => ({ page: state.page + 1 })),
            clearMovies: () => set(() => ({
                movies: [],
                wishlist: [],
                counterMovies: 0,
                page: 1
            }))

        }),
        {
            name: 'wishlist',
            storage: createJSONStorage(() => localStorage)
        }
    )
)