import { useMutation } from "@tanstack/react-query"
import api from "../../../Utils/api"

type DeleteSchoolProps = {
  id: string
}

function useDeleteSchool() {
  return useMutation({
    mutationFn: async ({ id }: DeleteSchoolProps) => {
      await api.post("/admin/school/delete", { id })
    },
  })
}

export default useDeleteSchool
