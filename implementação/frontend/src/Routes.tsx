import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom"

import LoginPage from "./pages/Login/LoginPage"
import SingUpPage from "./pages/SingUp/SingUpPage"
import HomePage from "./pages/app/Home/HomePage"

function Routes() {
  const routerConfig = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<LoginPage />} />
        <Route path="/singup" element={<SingUpPage />} />
        <Route path="/app">
          <Route path="home" element={<HomePage />} />
        </Route>
      </>
    )
  )

  return <RouterProvider router={routerConfig} />
}

export default Routes
