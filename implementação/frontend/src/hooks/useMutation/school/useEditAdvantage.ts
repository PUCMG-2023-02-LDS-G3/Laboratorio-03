import { useMutation } from "@tanstack/react-query"
import api from "../../../Utils/api"

type EditAdvantageProps = {
  id: string | undefined
  name: string
  price: number
  companyId: string
}

function useEditAdvantage() {
  return useMutation({
    mutationFn: async ({ id, name, price, companyId }: EditAdvantageProps) => {
        await api.post("/company/advantage/update", {
            id,
            name,
            price,
            companyId
        })
    },
  })
}

export default useEditAdvantage
