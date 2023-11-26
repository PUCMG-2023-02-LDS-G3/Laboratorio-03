import { useMutation } from "@tanstack/react-query"
import api from "../../../Utils/api"

function useAddAdvantage() {
  return useMutation({
    mutationFn: async ({ name, price, companyId }: { name: string, price: number, companyId: string }) => {
    await api.post("/company/advantage/register", {
        name,
        price,
        companyId
        })
    },
  })
}

export default useAddAdvantage
