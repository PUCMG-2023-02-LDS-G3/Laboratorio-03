import { Navigate, Route, Routes } from "react-router-dom"

import ManageTeacher from "./ManageTeacher"
import TeacherLayout from "./TeacherLayout"
import ManageHistory from "./ManageHistory"

function TeacherRoute() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="./send" />} />

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
