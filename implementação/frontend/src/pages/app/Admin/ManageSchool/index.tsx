import {
  Button,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react"
import useGetSchools from "../../../../hooks/useQuery/useGetSchools"
import { useNavigate } from "react-router-dom"
import useDeleteSchool from "../../../../hooks/useMutation/school/useDeleteSchool"
import notify from "../../../../hooks/useNotify"
import SchoolTable from "./subcomponent/SchoolTable"

function ManageSchool() {
  const { data, isLoading } = useGetSchools()

  const {mutateAsync} = useDeleteSchool()

  const navigateTo = useNavigate()

  const handleEditSchool = (id: string) => {
    navigateTo(`./edit/${id}`)
  }

  const handleDeleteSchool = async (id: string) => {
    try {
      await mutateAsync({id})
      notify({message: "Instituição de ensino deletada com sucesso"})
    } catch (error) {
      console.log(error)
      notify({message: "Erro ao deletar instituição de ensino", type: "error"})
    }
  }

  const handleAddSchool = () => {
    navigateTo("./add")
  }

  return isLoading ? (
    <Skeleton h={"500px"} />
  ) : (
    <VStack maxW={"1000px"} width={"100%"}>
      <Text fontWeight={"bold"} fontSize={["xl", "3xl"]}>
        Gerenciar instituição de ensino
      </Text>

      <Button colorScheme="orange" onClick={handleAddSchool}>
        <Text>Adicionar instituição de ensino</Text>
      </Button>

      <SchoolTable data={data} handleEditSchool={handleEditSchool} handleDeleteSchool={handleDeleteSchool} />

    </VStack>
  )
}

export default ManageSchool
