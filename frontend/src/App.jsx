import { BrowserRouter, Route, Routes } from "react-router"
import DefaultLayout from "./components/DefaultLayout"
import FoodList from "./pages/FoodList"
import FoodDetail from "./pages/FoodDetail"
import FavoriteFood from "./pages/FavoriteFood"
import CompareFood from "./pages/CompareFood"
import NotFound from "./pages/NotFound"
import { FavoriteProvider } from "./contexts/FavoritesContext"


function App() {


  return (
    <BrowserRouter>
      <FavoriteProvider>
        <Routes>
          <Route element={<DefaultLayout/>}>
            <Route path="/" element={<FoodList/>}/>
            <Route path="/food/:id" element={<FoodDetail/>}/>
            <Route path="/preferiti" element={<FavoriteFood/>}/>
            <Route path="/confronta" element={<CompareFood/>}/>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </FavoriteProvider>
    </BrowserRouter>
  )
}

export default App
