import { lazy } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Register from "./pages/auth/register"
import AuthProvider from "./contexts/AuthContext"
import Account from "./pages/account"
const Login = lazy(() => import('./pages/auth/login'))

function App() {

  return (
    <BrowserRouter>
        <AuthProvider>
            <div className="dark:bg-[#101010] bg-white dark:text-white/[0.8] 2xl:text-[16px] text-[14px] max-w-[420px]:text-[14px]">
              <Routes>
                  <Route path='/' element={<Navigate to={"/account/predictor"}  />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/account/*' element={<Account />} />
              </Routes>
            </div>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App