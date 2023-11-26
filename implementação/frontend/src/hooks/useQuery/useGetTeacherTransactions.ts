

import { useQuery } from "@tanstack/react-query"
import api from "../../Utils/api"

type GetTeacherTransactionsProps = {
    email: string
}

function useGetTeacherTransactions({ email }: GetTeacherTransactionsProps) {
  return useQuery({
    queryKey: ["teacherTransactions", email],
    queryFn: async () => {
      const { data } = await api.post("/teacher/transactions", { email })
      return data
    },
  })
}

export default useGetTeacherTransactions
