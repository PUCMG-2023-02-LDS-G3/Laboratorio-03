import { useMutation } from "@tanstack/react-query"
import api from "../../../Utils/api"

type AddCoinToTeacherProps = {
  id: string
  amount: number
}

function useAddCoinToTeacher() {
  return useMutation({
    mutationFn: async ({ id, amount }: AddCoinToTeacherProps) =>
      await api.post("/admin/school/teacher/addCoins", { id, amount}),
  })
}

export default useAddCoinToTeacher
