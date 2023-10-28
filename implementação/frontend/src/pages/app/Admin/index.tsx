import { Navigate, Route, Routes } from "react-router-dom"

import EditSchool from "./ManageSchool/edit"
import ManageSchool from "./ManageSchool"

import AdminLayout from "./AdminLayout"
import ManageTeacher from "./ManageTeacher"
import EditTeacher from "./ManageTeacher/edit"
import AddSchool from "./ManageSchool/add"
import AddTeacher from "./ManageTeacher/add"

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="./school" />} />

      <Route
        path="/school"
        element={
          <AdminLayout>
            <ManageSchool />
          </AdminLayout>
        }
      />

      <Route
        path="/school/edit/:id"
        element={
          <AdminLayout>
            <EditSchool />
          </AdminLayout>
        }
      />

      <Route
        path="/school/add"
        element={
          <AdminLayout>
            <AddSchool />
          </AdminLayout>
        }
      />


      <Route
        path="/teacher"
        element={
          <AdminLayout>
            <ManageTeacher />
          </AdminLayout>
        }
      />

      <Route
        path="/teacher/edit/:id/school/:schoolId"
        element={
          <AdminLayout>
            <EditTeacher />
          </AdminLayout>
        }
      />

      <Route
        path="/teacher/add"
        element={
          <AdminLayout>
            <AddTeacher />
          </AdminLayout>
        }
      />

    </Routes>
  )
}

export default AdminRoutes
