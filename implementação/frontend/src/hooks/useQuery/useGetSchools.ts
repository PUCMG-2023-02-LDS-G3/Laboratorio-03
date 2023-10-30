import { useQuery } from "@tanstack/react-query"
import api from "../../Utils/api"

export type StudentSchema = {
  address: string
  coins: number
  cpf: number
  email: string
  id: string
  major: string
  name: string
  password: string
  rg: number
  schoolId: string
}

export type TeacherSchema = {
  coins: number
  cpf: string
  email: string
  id: string
  name: string
  password: string
  schoolId: string
}

export type SchoolSchema = {
  id: string
  name: string
  students: StudentSchema[]
  teachers: TeacherSchema[]
}

function useGetSchools() {
  return useQuery({
    queryKey: ["schools"],
    queryFn: async () => {
      const { data } = await api.get<SchoolSchema[]>("/admin/school")

      return data
    },
  })
}

export default useGetSchools
