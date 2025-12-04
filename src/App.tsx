// //header => links => link
// // => logo 
// //cardContainer => card
// //footer

import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Mylist from "./pages/Mylist";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import MovieDetails from "./pages/MovieDetails";
import type { IProduct } from "./interfaces/product";
import { CounterProvider } from "./context/CounterProvider";
import { WishlistProvider } from "./context/WishlistProvider";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import AuthLayout from "./layout/AuthLayout";
import DefaultLayout from "./layout/DefaultLayout";
import AdminLayout from "./layout/AdminLayout";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const App = () => {


    const [products, setProducts] = useState<Array<IProduct>>([]);

    const addProduct = ({ name }: IProduct) => {

        if (!products.some((product) => product.name === name)) {
            setProducts([...products, { name }]);
        }
    }

    return (
        <QueryClientProvider client={queryClient}>
            <WishlistProvider >
                <CounterProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<AuthLayout />}>
                                <Route index element={<Home addProduct={addProduct} products={products} />} />
                                <Route path="my-list" element={<Mylist />} />
                                <Route path="movies/:id" element={<MovieDetails />} />

                                <Route path="/dashboard" element={<AdminLayout />}>
                                    <Route index element={<Dashboard />} />
                                </Route>
                            </Route>

                            <Route path="/" element={<DefaultLayout />}>
                                <Route path="signin" element={<Signin />} />
                                <Route path="signup" element={<Signup />} />
                            </Route>
                        </Routes>
                    </BrowserRouter>
                </CounterProvider>
            </WishlistProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>

    );
};

export default App;


