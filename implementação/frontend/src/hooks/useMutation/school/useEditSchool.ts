import { useMutation } from "@tanstack/react-query"
import api from "../../../Utils/api"

type EditSchoolProps = {
  id: string
  name: string
}

function useEditSchool() {
  return useMutation({
    mutationFn: async ({ id, name }: EditSchoolProps) => {
      await api.post("/admin/school/edit", { id, name })
    },
  })
}

export default useEditSchool
