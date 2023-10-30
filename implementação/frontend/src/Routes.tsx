import { Route, Routes as AppRoutes, BrowserRouter } from "react-router-dom"

import LoginPage from "./pages/Login/LoginPage"
import SingUpPage from "./pages/SingUp/SingUpPage"

import Admin from "./pages/app/Admin"
import Company from "./pages/app/Company"
import Teacher from "./pages/app/Teacher"
import Student from "./pages/app/Student"

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
        <Route path="/app">
          <Route path="teacher/*" element={<Teacher />} />
        </Route>
        <Route path="/app">
          <Route path="student/*" element={<Student />} />
        </Route>
      </AppRoutes>
    </BrowserRouter>
  )
}

export default Routes
