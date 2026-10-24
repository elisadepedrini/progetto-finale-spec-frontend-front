import { useContext, useState, useEffect } from "react"
import { createContext } from "react";

const FavoritesContext = createContext()

export function FavoriteProvider({children}) {

    const [favoriteFoods, setFavoriteFoods] = useState(() => {
        const saved = localStorage.getItem("favoriteFoods")
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem("favoriteFoods", JSON.stringify(favoriteFoods))
    }, [favoriteFoods])
    
        function toggleFavorite(food) {
            const foodFavorite = favoriteFoods.some(f => f.id === food.id)
    
            if(foodFavorite) {
                setFavoriteFoods(favoriteFoods.filter(f => f.id !== food.id))
            } else {
                setFavoriteFoods([...favoriteFoods, food])
            }
        }

        const value = { favoriteFoods, toggleFavorite }

        return (
            <FavoritesContext.Provider value={value}>
                {children}
            </FavoritesContext.Provider>
        )
}


export function useFavorites() {
    return useContext(FavoritesContext)
}

