import api from "../../../Utils/api"
import { useMutation } from "@tanstack/react-query"

export type AddTeacherProps = {
  name: string
  email: string
  password: string
  cpf: string
  schoolId: string
}

function useAddTeacher() {
  return useMutation({
    mutationFn: async ({
      cpf,
      email,
      name,
      password,
      schoolId,
    }: AddTeacherProps) =>
      await api.post("/admin/school/teacher/register", {
        cpf,
        email,
        name,
        password,
        schoolId,
      }),
  })
}

export default useAddTeacher
