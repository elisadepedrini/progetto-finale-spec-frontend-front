import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function DefaultLayout() {

    return(
        <>
        <Navbar/>
        <Outlet />
        </>
    )
}