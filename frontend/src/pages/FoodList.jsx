import { useEffect, useState } from "react"
import { Link } from "react-router"

export default function FoodList() {

    const [foods, setFoods] = useState([])

    useEffect(() => {
        async function fetchFood() {
            try {
                const response = await fetch('http://localhost:3001/foods')
    
                if (!response.ok) {
                    console.log(`Chiamata non riuscita: ${response.status}, ${response.statusText}`);
                    throw new Error('Chiamata non riuscita')
                }

                const data = await response.json()
                setFoods(data)

            } catch(error) {
                console.error(error)
            }
        }

        fetchFood()
    }, [])

    return(
        <>
            <h1>Lista degli alimenti</h1>

            {/* Lista degli alimenti con title e category */}
            <div className="container">
                <div className="row g-5">
                    {foods.map(f => (
                        <div key={f.id} className="col-4">
                            <div className="card">
                                <div className="card-header p-4">{f.category}</div>
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
        </>
    )
}