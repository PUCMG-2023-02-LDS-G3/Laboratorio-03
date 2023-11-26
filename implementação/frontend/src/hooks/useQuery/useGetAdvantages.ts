import { useQuery } from "@tanstack/react-query"
import api from "../../Utils/api"
import { UserSchema } from "../../provider/UserProvider"

function useGetAdvantages(user: UserSchema) {
  return useQuery({
    queryKey: ["advantages", user.id],
    queryFn: async () => {
      const { data } = await api.post("/company/advantage", { id: user.id })
      return data
    },
  })
}

export default useGetAdvantages
