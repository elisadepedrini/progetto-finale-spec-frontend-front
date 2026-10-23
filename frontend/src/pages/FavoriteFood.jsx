import { Link } from "react-router"
import FoodCardList from "../components/FoodCardList"
import { useFavorites } from "../contexts/FavoritesContext"

export default function FavoriteFood() {

    const { favoriteFoods } = useFavorites()

    return(
        <>
            <h2>I miei alimenti preferiti:</h2>

            {(favoriteFoods.length === 0) ?
            <div className="d-flex flex-column mt-4">
                Non hai aggiunto nessun alimento nei preferiti!
                <Link className="btn btn-primary btn-md px-4 w-25 mt-3" to="/" >Torna alla lista</Link>
            </div> :
            <FoodCardList foodList={favoriteFoods}/>
            }
        
        </>
    )
}