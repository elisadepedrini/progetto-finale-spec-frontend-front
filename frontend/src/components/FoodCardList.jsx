import { Link } from "react-router"

export default function FoodCardList({foodList}) {


    return (
        <div className="container">
            <div className="row g-5">
                {foodList.map(f => (
                    <div key={f.id} className="col-4">
                        <div className="card">
                            <div className="card-header d-flex justify-content-around">
                                <div className="p-4">{f.category.charAt(0).toUpperCase() + f.category.slice(1)}</div>
                                <i className="bi bi-heart p-4"></i>
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