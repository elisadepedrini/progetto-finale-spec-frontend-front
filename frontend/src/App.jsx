import { BrowserRouter, Route, Routes } from "react-router"
import DefaultLayout from "./components/DefaultLayout"
import FoodList from "./pages/FoodList"
import FoodDetail from "./pages/FoodDetail"
import FavoriteFood from "./pages/FavoriteFood"
import CompareFood from "./pages/CompareFood"


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout/>}>
          <Route path="/" element={<FoodList/>}/>
          <Route path="/food/:id" element={<FoodDetail/>}/>
          <Route path="/preferiti" element={<FavoriteFood/>}/>
          <Route path="/confronta" element={<CompareFood/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
