import { useState } from "react";

function useLocalStorage(key, initialValue){
    const [val, setVal] = useState(() => {
        const jsonVal = localStorage.getItem(key);
        if ( jsonVal == null ) {
            return initialValue;
        }

        return JSON.parse(jsonVal);
    });

    const setLocalStorage = newVal => {
        localStorage.setItem(key, JSON.stringify(newVal));
        setVal(newVal);
    };

    return [val, setLocalStorage];
}

export default useLocalStorage;