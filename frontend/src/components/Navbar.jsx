import { NavLink } from 'react-router'
import { useFavorites } from "../contexts/FavoritesContext"

export default function Navbar() {

    const { favoriteFoods } = useFavorites()

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container justify-content-start gap-3 mx-4">
                <NavLink to="/" className="nav-link">Alimenti</NavLink>
                <NavLink to="/preferiti" className="nav-link">Preferiti <span className="badge bg-danger">{favoriteFoods.length}</span></NavLink>
                <NavLink to="/confronta" className="nav-link">Confronta</NavLink>
            </div>
        </nav>
    )
}