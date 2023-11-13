import { useQuery } from "@tanstack/react-query"
import api from "../../Utils/api"

type GetTeacherProps = {
  id: string
}

function useGetStudentAdvantages({ id }: GetTeacherProps) {
  return useQuery({
    queryKey: ["studentAdvantage", id],
    queryFn: async () => {
      const { data } = await api.post("/student/advantages", { studentId: id })
      return data
    },
  })
}

export default useGetStudentAdvantages
