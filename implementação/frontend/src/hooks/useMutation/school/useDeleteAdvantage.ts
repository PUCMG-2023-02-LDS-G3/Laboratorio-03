import { useMutation } from "@tanstack/react-query"
import api from "../../../Utils/api"

type DeleteSchoolProps = {
  id: string
  companyId: string
}

function useDeleteAdvantage() {
  return useMutation({
    mutationFn: async ({ id, companyId }: DeleteSchoolProps) => {
      await api.post("/company/advantage/delete", { companyId, id })
    },
  })
}

export default useDeleteAdvantage
