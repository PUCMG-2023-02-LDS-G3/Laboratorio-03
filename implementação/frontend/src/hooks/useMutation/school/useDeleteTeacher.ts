import { useMutation } from "@tanstack/react-query"
import api from "../../../Utils/api"

type DeleteTeacherProps = {
  id: string
}

function useDeleteTeacher() {
  return useMutation({
    mutationFn: async ({ id }: DeleteTeacherProps) => {
      await api.post("/admin/school/teacher/delete", { id })
    },
  })
}

export default useDeleteTeacher
