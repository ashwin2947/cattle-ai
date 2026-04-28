import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import BreedPredict from "./pages/BreedPredict"
import WeightPredict from "./pages/WeightPredict"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/breed" element={<BreedPredict />} />
        <Route path="/weight" element={<WeightPredict />} />
        <Route path="/predict" element={<Navigate to="/breed" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App