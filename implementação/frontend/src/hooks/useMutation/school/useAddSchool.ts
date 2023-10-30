import { useMutation } from "@tanstack/react-query"
import api from "../../../Utils/api"

function useAddSchool() {
  return useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      await api.post("/admin/school/register", { name })
    },
  })
}

export default useAddSchool
