import { useMutation } from "@tanstack/react-query"
import api from "../../../Utils/api"
import { TeacherSchema } from "../../useQuery/useGetSchools"

function useEditTeacher() {
    return useMutation({
        mutationFn: async ({ id, name, email, password, cpf }: TeacherSchema) => {
            await api.post("/admin/school/teacher/edit", { id, name, email, password, cpf })
        }
    })
}

export default useEditTeacher