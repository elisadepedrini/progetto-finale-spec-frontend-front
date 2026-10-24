import { Link } from "react-router"
import FoodCardList from "../components/FoodCardList"
import { useFavorites } from "../contexts/FavoritesContext"

export default function FavoriteFood() {

    const { favoriteFoods } = useFavorites()

    return(
        <>
        <div className="container py-4">

            <h1>I miei alimenti preferiti:</h1>

            {(favoriteFoods.length === 0) &&
            <p className="d-flex flex-column mt-4 align-items-center text-center text-muted my-5">
                Non hai aggiunto nessun alimento nei preferiti!
                <Link className="btn btn-primary btn-md px-4 w-25 mt-3" to="/" >Torna alla lista</Link>
            </p>
            }
        </div>
            {(favoriteFoods.length > 0) &&
            <FoodCardList foodList={favoriteFoods}/>
            }
        </>
    )
}