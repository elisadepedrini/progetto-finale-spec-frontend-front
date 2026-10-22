import { NavLink } from 'react-router'

export default function Navbar() {

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container justify-content-start gap-3 mx-4">
                <NavLink to="/" className="nav-link">Alimenti</NavLink>
                <NavLink to="/preferiti" className="nav-link">Preferiti</NavLink>
                <NavLink to="/confronta" className="nav-link">Confronta</NavLink>
            </div>
        </nav>
    )
}