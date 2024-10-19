import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import RegisterPage from "./pages/RegisterPage"
import AuthProvider from "./context/auth/AuthProvider"
import LoginPage from "./pages/LoginPage"
import CartPage from "./pages/CartPage"
import ProtectedRoutes from "./components/ProtectedRoutes"



function App() {
  

  return (
    <AuthProvider>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route element={<ProtectedRoutes/>}>

      <Route path="/cart" element={<CartPage/>} />

      </Route>


      
    </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
