import { useQuery } from "@tanstack/react-query"
import api from "../../Utils/api"

type GetTeacherProps = {
  id: string
}

function useGetTeachers({ id }: GetTeacherProps) {
  return useQuery({
    queryKey: ["teachers", id],
    queryFn: async () => {
      await api.post("/admin/school/teacher", { schoolId: id })
    },
  })
}

export default useGetTeachers
