

import { useQuery } from "@tanstack/react-query"
import api from "../../Utils/api"

type GetStudentTransactionsProps = {
  id: string
}

function useGetStudentTransactions({ id }: GetStudentTransactionsProps) {
  return useQuery({
    queryKey: ["studentTransactions", id],
    queryFn: async () => {
      const { data } = await api.post("/student/transactions", { id })
      return data
    },
  })
}

export default useGetStudentTransactions
