import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function CompareFood() {

    const navigate = useNavigate()
    const [foodsCompare, setFoodsCompare] = useState([])
    const [firstId, setFirstId] = useState("")
    const [secondId, setSecondId] = useState("")
    const [firstFood, setFirstFood] = useState(null)
    const [secondFood, setSecondFood] = useState(null)


    useEffect(() => {
        async function fetchFood() {
            try {
                const response = await fetch('http://localhost:3001/foods')

                if (!response.ok) {
                    console.log(`Chiamata non riuscita: ${response.status}, ${response.statusText}`);
                    throw new Error('Chiamata non riuscita')
                }

                const data = await response.json()
                setFoodsCompare(data)

            } catch (error) {
                console.error(error)
                navigate("/not-found")
            }
        }

        fetchFood()
    }, [])



    useEffect(() => {
        async function fetchFood() {
            if (firstId === "") {
                setFirstFood(null)
                return
            }

            try {
                const response = await fetch(`http://localhost:3001/foods/${firstId}`)

                if (!response.ok) {
                    console.log(`Chiamata non riuscita: ${response.status}, ${response.statusText}`);
                    throw new Error('Chiamata non riuscita')
                }

                const data = await response.json()
                setFirstFood(data.food)

            } catch (error) {
                console.error(error)
                navigate("/not-found")
            }
        }

        fetchFood()
    }, [firstId])

    useEffect(() => {
        async function fetchFood() {
            if (secondId === "") {
                setSecondFood(null)
                return
            }

            try {
                const response = await fetch(`http://localhost:3001/foods/${secondId}`)

                if (!response.ok) {
                    console.log(`Chiamata non riuscita: ${response.status}, ${response.statusText}`);
                    throw new Error('Chiamata non riuscita')
                }

                const data = await response.json()
                setSecondFood(data.food)

            } catch (error) {
                console.error(error)
                navigate("/not-found")
            }
        }

        fetchFood()
    }, [secondId])


    if(foodsCompare.length === 0) {
        return <h4>Caricamento...</h4>
    }

    return (
        <>
        <div className="container py-4">

            <h1>Comparatore di alimenti</h1>

            <div className="d-flex justify-content-around filters-box p-4 mb-5">
                <div>
                    <label className="form-label">Seleziona il primo alimento da comparare</label>
                    <select className="form-select w-75" value={firstId} onChange={(e) => setFirstId(e.target.value)}>
                        <option value="">Seleziona un alimento</option>
                        {foodsCompare.map(f => (
                            <option key={f.id} value={f.id}>{f.title.charAt(0).toUpperCase() + f.title.slice(1)}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="form-label">Seleziona il secondo alimento da comparare</label>
                    <select className="form-select w-75" value={secondId} onChange={(e) => setSecondId(e.target.value)}>
                        <option value="">Seleziona un alimento</option>
                        {foodsCompare.map(f => (
                            <option key={f.id} value={f.id}>{f.title.charAt(0).toUpperCase() + f.title.slice(1)}</option>
                        ))}
                    </select>
                </div>
            </div>



            {(firstFood && secondFood) ? (
                <div className="container my-4">
                    <div className="compare-box">
                        <table className="table compare-table table-striped align-middle text-center mb-0">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">
                                        <h2 className="h4 mb-1">{firstFood.title}</h2>
                                        <span className="text-uppercase text-muted small">{firstFood.category}</span>
                                    </th>
                                    <th scope="col">
                                        <h2 className="h4 mb-1">{secondFood.title}</h2>
                                        <span className="text-uppercase text-muted small">{secondFood.category}</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row" className="text-start">Origine</th>
                                    <td>{firstFood.origin}</td>
                                    <td>{secondFood.origin}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="text-start">Prezzo al kg</th>
                                    <td>{firstFood.pricePerKg} €</td>
                                    <td>{secondFood.pricePerKg} €</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="text-start">Calorie (100 g)</th>
                                    <td>{firstFood.calories} kcal</td>
                                    <td>{secondFood.calories} kcal</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="text-start">Grassi (100 g)</th>
                                    <td>{firstFood.fat} g</td>
                                    <td>{secondFood.fat} g</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="text-start">Vegano</th>
                                    <td><i className={firstFood.vegan ? "bi bi-check2" : "bi bi-x-lg"}></i></td>
                                    <td><i className={secondFood.vegan ? "bi bi-check2" : "bi bi-x-lg"}></i></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="text-start">Senza glutine</th>
                                    <td><i className={firstFood.glutenFree ? "bi bi-check2" : "bi bi-x-lg"}></i></td>
                                    <td><i className={secondFood.glutenFree ? "bi bi-check2" : "bi bi-x-lg"}></i></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="text-start">Descrizione</th>
                                    <td className="small text-secondary">{firstFood.description}</td>
                                    <td className="small text-secondary">{secondFood.description}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p className="text-center text-muted my-5">Seleziona due alimenti per confrontarli.</p>
            )}

        </div>


        </>
    )
}