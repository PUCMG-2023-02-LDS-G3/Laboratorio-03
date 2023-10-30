import { Navigate, Route, Routes } from "react-router-dom"
import StudentLayout from "./StudentLayout"
import ManageStudent from "./ManageStudent"
import ManageHistory from "./ManageHistory"
import ManageExchange from "./ManageExchange"

function StudentRoute() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="./profile" />} />

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
    </Routes>
  )
}

export default StudentRoute
