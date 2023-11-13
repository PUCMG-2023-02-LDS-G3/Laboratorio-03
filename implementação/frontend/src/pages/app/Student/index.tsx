import { Route, Routes } from "react-router-dom"
import StudentLayout from "./StudentLayout"
import ManageStudent from "./ManageStudent"
import ManageHistory from "./ManageHistory"
import ManageExchange from "./ManageExchange"
import Welcome from "../../../components/Welcome/Welcome"
import ManageAdvantages from "./ManageAdvantages"

function StudentRoute() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <StudentLayout>
            <Welcome />
          </StudentLayout>
        }
      />

      <Route
        path="/profile"
        element={
          <StudentLayout>
            <ManageStudent />
          </StudentLayout>
        }
      />

      <Route
        path="/history"
        element={
          <StudentLayout>
            <ManageHistory />
          </StudentLayout>
        }
      />

      <Route
        path="/exchange"
        element={
          <StudentLayout>
            <ManageExchange />
          </StudentLayout>
        }
      />

       <Route
        path="/advantages"
        element={
          <StudentLayout>
            <ManageAdvantages />
          </StudentLayout>
        }
      />
    </Routes>
  )
}

export default StudentRoute
