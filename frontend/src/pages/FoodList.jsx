import { useCallback, useEffect, useState } from "react"
import FoodCardList from "../components/FoodCardList"
import { useNavigate } from "react-router"


function debounce(callback, delay) {
        let timer
        return value => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                callback(value)
            }, delay)
        }
    }

export default function FoodList() {

    const navigate = useNavigate()
    const [foods, setFoods] = useState([])
    const [search, setSearch] = useState("")
    const [categorySearch, setCategorySearch] = useState("")
    const [sortField, setSortField] = useState("title")
    const [sortDirection, setSortDirection] = useState(1)


    const debouncedSetSearch = useCallback(debounce(setSearch, 500), [])

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
                navigate("/not-found")
            }
        }

        fetchFood()
    }, [])

    if(foods.length === 0) {
        return <h4>Caricamento...</h4>
    }



    // Array filtrato per ricerca, per titolo, per categoria
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
        <div className="container py-4">
            <h1 className="mb-4">Lista degli alimenti</h1>

            <div className="filters-box p-4 mb-5">
                <div className="row g-3">
                    <div className="col-lg-3">
                        <label className="form-label">Cerca per titolo</label>
                        <input className="form-control"
                        type="text"
                        onChange={(e) => debouncedSetSearch(e.target.value)}
                        placeholder="Es. Mela"
                        />
                    </div>

                    <div className="col-lg-3">
                        <label className="form-label">Categoria</label>
                        <select className="form-select" value={categorySearch} onChange={(e) => setCategorySearch(e.target.value)}>
                            <option value="">Tutte le categorie</option>
                            {categories.map(c => (
                                <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                            ))}
                        </select>
                    </div>

                    <div className="col-lg-3">
                        <label className="form-label">Ordina per</label>
                        <select className="form-select" value={sortField} onChange={(e) => setSortField(e.target.value)}>
                            <option value="title">Titolo</option>
                            <option value="category">Categoria</option>
                        </select>
                    </div>

                    <div className="col-lg-3">
                        <label className="form-label">Verso</label>
                        <select className="form-select" value={sortDirection} onChange={(e) => setSortDirection(Number(e.target.value))}>
                            <option value="1">A-Z</option>
                            <option value="-1">Z-A</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        {/* Lista degli alimenti con title e category */}
        {(sortedFoods.length === 0) ? (
                <div className="container text-center text-muted my-5">
                    <p>Nessun alimento trovato!</p>
                </div>
        )
         : (
            
            <FoodCardList foodList={sortedFoods} />
        )}
    </>
)
}