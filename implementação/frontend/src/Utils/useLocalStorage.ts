import { useState, useEffect, Dispatch, SetStateAction } from "react";

type Response<T> = [
    T, //? What's inside the "state" Ex: string, boolean...
    Dispatch<SetStateAction<T>> //? type of "setState" 
]


//? "useLocalState<T>" accepts a type unknown
export function useLocalState<T>(key: string, initialState: T): Response<T> {
    //? The return of "useLocalState" is a type of "Response<T>"
    
    const [state, setState] = useState(() => {
        let value

        if(typeof window !== 'undefined')
            value = localStorage.getItem(key) //? NextJs loads on server first

        if (value) {
            //? if the data is already set, just return it
            return JSON.parse(value) 
        }


        return initialState
    })
    
    useEffect(() => {
        //? Keeping the "state" in JSON, so it's changed easyly
        localStorage.setItem(key, JSON.stringify(state))

    }, [key, state])

    return [state, setState]
}