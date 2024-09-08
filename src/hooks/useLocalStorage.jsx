import React, { useState, useEffect } from "react";

/**
 * Custom hook to use localstorage for state information.
 * 
 * Creates an item as a state and looks for the current value
 * or defaults to firstValue.
 * 
 * useEffect hook updates localStorage whenever there the item
 * is changed so something other than null.
 */
function useLocalStorage(key, firstValue = null) {
    const initialValue = localStorage.getItem(key) || firstValue;
    const [item, setItem] = useState(initialValue);

    useEffect(function setKeyInLocalStorage() {
        console.debug("hooks, useLocalStorage useEffect", "item=", item);
        
        if (item === null) {
            localStorage.removeItem(key);
        }
        else {
            localStorage.setItem(key, item);
        }
    }, [key, item]);

    return [item, setItem];
}

export default useLocalStorage;