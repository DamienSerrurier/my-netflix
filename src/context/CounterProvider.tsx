import { createContext, useState, type ReactNode } from "react";

interface ICounterContext {
    children: ReactNode
}

interface IContext {
    counter: number,
    increment: () => void
}

const CounterContext = createContext<IContext>({
    counter: 0,
    increment: () => { }
});

export const CounterProvider = ({ children }: ICounterContext) => {

    const [counter, setCounter] = useState<number>(JSON.parse(localStorage.getItem('counter') ?? '0')); //localStorage.getItem()

    const increment = () => {
        setCounter(counter + 1);
        localStorage.setItem('counter', JSON.stringify(counter + 1));
    }

    return (
        <CounterContext.Provider value={{ counter, increment }}>
            {children}
        </CounterContext.Provider>
    );
};

export default CounterContext;