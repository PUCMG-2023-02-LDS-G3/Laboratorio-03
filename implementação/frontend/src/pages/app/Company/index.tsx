import { Navigate, Route, Routes } from "react-router-dom"

import AddAdvantage from "./ManageAdvantages/add"
import ManageAdvantages from "./ManageAdvantages"
import ManageProfile from "./ManageProfile"
import CompanyLayout from "./CompanyLayout"
import EditAdvantage from "./ManageAdvantages/edit"

function CompanyRoute() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="./advantages" />} />

      <Route
        path="/advantages"
        element={
          <CompanyLayout>
            <ManageAdvantages />
          </CompanyLayout>
        }
      />

      <Route
        path="/advantages/add"
        element={
          <CompanyLayout>
            <AddAdvantage />
          </CompanyLayout>
        }
      />

       <Route
        path="/advantages/edit/:id"
        element={
          <CompanyLayout>
            <EditAdvantage />
          </CompanyLayout>
        }
      />


      <Route
        path="/profile"
        element={
          <CompanyLayout>
            <ManageProfile />
          </CompanyLayout>
        }
      />
    </Routes>
  )
}

export default CompanyRoute
