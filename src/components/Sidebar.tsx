import type { IMovie } from "../interfaces/movie";

interface iSidebarComponent {
    toggleSidebar: () => void,
    isSidebarOpen: boolean,
    moviesList: Array<IMovie>,
    handleWishlist: (movie: IMovie) => void
}

const Sidebar = ({ toggleSidebar, isSidebarOpen, moviesList, handleWishlist }: iSidebarComponent) => {

    const deleteMovie = (movie: any) => {
        handleWishlist(movie);
    }

    return (
        <div>
            <aside className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white" style={{ display: isSidebarOpen ? 'none' : 'block' }} >
                <div className="p-4 text-lg font-bold">My wishlist</div>
                <button onClick={() => toggleSidebar()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Close</button>

                <div>
                    {moviesList.filter((movie: any) => movie.status).map((movie: any) => (
                        <div>
                            <h3>{movie.title}</h3>
                            <button onClick={() => deleteMovie(movie)}>Supprimer</button>
                        </div>
                    ))
                    }
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;