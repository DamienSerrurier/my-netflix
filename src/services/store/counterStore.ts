import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

interface ICounterStore {
    counter: number,
    increment: () => void
}

export const useCounter = create<ICounterStore>()(
    persist(
        (set) => ({
            counter: 0,
            increment: () => set((state: ICounterStore) => ({ counter: state.counter + 1 }))
        }),
        {
            name: 'counter',
            storage: createJSONStorage(() => localStorage)
        }
    )
)