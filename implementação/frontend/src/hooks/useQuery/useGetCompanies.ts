import { useQuery } from "@tanstack/react-query"
import api from "../../Utils/api"

type CompanySchema = {
  cnpj: string
  email: string
  id: string
  name: string
  password: string
  transactions: []
  advantages: []
}

function useGetCompanies() {
  return useQuery({
    queryKey: ["company"],
    queryFn: async () => {
      const { data } = await api.get<CompanySchema[]>("/company")
      return data
    },
  })
}

export default useGetCompanies
