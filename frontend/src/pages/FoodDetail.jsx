import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { useFavorites } from "../contexts/FavoritesContext";

export default function FoodDetail() {

    const {id} = useParams()
    const [singleFood, setSingleFood] = useState()
    const navigate = useNavigate()
    const { favoriteFoods, toggleFavorite } = useFavorites()

    useEffect(() => {
        async function fetchSingleFood() {
            try {
                const response = await fetch(`http://localhost:3001/foods/${id}`)
        
                if(!response.ok) {
                    console.log(`Chiamata non riuscita per il prodotto con id: ${id}. ${response.status}: ${response.statusText}`);
                    throw new Error("Chiamata non riuscita")
                }
    
                const data = await response.json()
                setSingleFood(data.food)
                
    
            } catch(error) {
                console.error(error)
                navigate("/not-found")
            }
        }

        fetchSingleFood()
    }, [id])
    
    
    if (!singleFood) {
        return <h4>Caricamento...</h4>}


    return (
        <>
            <div className="container my-5">
                <div className="row g-4 justify-content-center">
                    <div className="col-12 col-md-6 col-lg-5 d-flex flex-column justify-content-center">
                        <span className="text-uppercase text-muted small fw-bold mb-2">{singleFood.category}</span>

                        <h1 className="fw-bold text-dark mb-2">{singleFood.title}</h1>

                        <span className="text-muted small ms-2"><i className="bi bi-flag-fill me-1"></i>{singleFood.origin}</span>


                        <div className="mb-3">
                            <span className="h3 fw-bold text-primary me-2">{singleFood.pricePerKg}€ al Kg</span>
                        </div>

                        <p className="text-secondary mb-4">{singleFood.description}</p>

                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Valori nutrizionali</th>
                                    <th scope="col">100 grammi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Calorie</th>
                                    <td>{singleFood.calories} kcal</td>
                                </tr>
                                <tr>
                                    <th scope="row">Grassi</th>
                                    <td>{singleFood.fat} g</td>
                                </tr>
                                <tr>
                                    <th scope="row">Vegano</th>
                                    <td>
                                        <i className={singleFood.vegan ? "bi bi-check2" : "bi bi-x-lg"}></i>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row">Senza glutine</th>
                                    <td>
                                        <i className={singleFood.glutenFree ? "bi bi-check2" : "bi bi-x-lg"}></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <button onClick={() => toggleFavorite({ id: singleFood.id, title: singleFood.title, category: singleFood.category })} className="btn btn-outline-secondary btn-lg px-4 w-100 w-sm-auto">
                             { favoriteFoods.some(el => el.id === singleFood.id) ?
                             <> <i className="bi bi-heart-fill me-1"></i> Rimuovi dai preferiti </> :
                             <> <i className="bi bi-heart me-1"></i> Aggiungi ai preferiti </>}
                        </button>

                    </div>
                </div>
            </div>

        </>


    )
}