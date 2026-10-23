import { Link } from "react-router"
import { useFavorites } from "../contexts/FavoritesContext"

export default function FoodCardList({foodList}) {

    const { favoriteFoods, toggleFavorite } = useFavorites()

    return (
        <div className="container">
            <div className="row g-5">
                {foodList.map(f => (
                    <div key={f.id} className="col-4">
                        <div className="card">
                            <div className="card-header d-flex justify-content-around">
                                <div className="p-4">{f.category.charAt(0).toUpperCase() + f.category.slice(1)}</div>
                                <i onClick={() => toggleFavorite(f)} style={{cursor: "pointer"}} className={favoriteFoods.some(el => el.id === f.id) ? "bi bi-heart-fill p-4" : "bi bi-heart p-4"}></i>
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">{f.title}</h4>

                                <Link to={`/food/${f.id}`} className="btn btn-primary">Dettagli</Link>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    )
}