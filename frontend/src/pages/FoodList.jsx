import { useEffect, useState } from "react"
import { Link } from "react-router"

export default function FoodList() {

    const [foods, setFoods] = useState([])
    const [search, setSearch] = useState("")
    const [categorySearch, setCategorySearch] = useState("")
    const [sortField, setSortField] = useState("title")
    const [sortDirection, setSortDirection] = useState(1)

    // Chiamata ai dati nel backend
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

    // Array filtrato per ricerca per titolo, per categoria
    const filteredFoods =
    foods.filter(f => f.title.toLowerCase().includes(search.toLowerCase()) &&
    (categorySearch === "" || f.category === categorySearch))
    
    // Array di categorie
    const categories = foods.reduce((acc, curr) => {
        if (!acc.includes(curr.category)) {
            acc.push(curr.category)
        }
        return acc
    }, [])

    // Array ordinato per crescente/decrescente
    const sortedFoods = [...filteredFoods].sort((a, b) => {
        const result = a[sortField].localeCompare(b[sortField])
        if(sortDirection === 1) {
            return result
        } else {
            return -result
        }
    })
        

    return(
        <>
            <h1>Lista degli alimenti</h1>

            <div className="container row">
                <div className="col">
                    <label className="form-label">Cerca alimento per titolo</label>
                    <input className="form-control w-25"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cerca per titolo"
                    />
                </div>

                <div>
                    <label className="form-label">Cerca alimento per categoria</label>
                    <select className="form-select w-25 col" value={categorySearch} onChange={(e) => setCategorySearch(e.target.value)}>
                        <option value="">Seleziona una categoria</option>
                        {categories.map(c => (
                            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <label className="form-label">Ordina per</label>
                    <select className="form-select w-25" value={sortField} onChange={(e) => setSortField(e.target.value)}>
                        <option value="title">Titolo</option>
                        <option value="category">Categoria</option>
                    </select>
                </div>

                <div>
                    <label className="form-label">Verso</label>
                    <select className="form-select w-25" value={sortDirection} onChange={(e) => setSortDirection(Number(e.target.value))}>
                        <option value="1">A-Z</option>
                        <option value="-1">Z-A</option>
                    </select>
                </div>
            </div>

            {/* Lista degli alimenti con title e category */}
            <div className="container">
                <div className="row g-5">
                    {sortedFoods.map(f => (
                        <div key={f.id} className="col-4">
                            <div className="card">
                                <div className="card-header p-4">{f.category.charAt(0).toUpperCase() + f.category.slice(1)}</div>
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