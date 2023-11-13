import { Route, Routes } from "react-router-dom"

import ManageTeacher from "./ManageTeacher"
import TeacherLayout from "./TeacherLayout"
import ManageHistory from "./ManageHistory"
import Welcome from "../../../components/Welcome/Welcome"

function TeacherRoute() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <TeacherLayout>
            <Welcome />
          </TeacherLayout>
        }
      />

      <Route
        path="/send"
        element={
          <TeacherLayout>
            <ManageTeacher />
          </TeacherLayout>
        }
      />

      <Route
        path="/history"
        element={
          <TeacherLayout>
            <ManageHistory />
          </TeacherLayout>
        }
      />
    </Routes>
  )
}

export default TeacherRoute
