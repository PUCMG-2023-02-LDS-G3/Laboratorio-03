import { Route, Routes as AppRoutes, BrowserRouter } from "react-router-dom"

import LoginPage from "./pages/Login/LoginPage"
import SingUpPage from "./pages/SingUp/SingUpPage"

import Admin from "./pages/app/Admin"
import Company from "./pages/app/Company"

function Routes() {
  return (
    <BrowserRouter>
      <AppRoutes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/singup" element={<SingUpPage />} />
        <Route path="/app">
          <Route path="admin/*" element={<Admin />} />
        </Route>
        <Route path="/app">
          <Route path="company/*" element={<Company />} />
        </Route>
      </AppRoutes>
    </BrowserRouter>
  )
}

export default Routes
