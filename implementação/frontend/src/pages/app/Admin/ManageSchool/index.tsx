import {
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react"
import useGetSchools from "../../../../hooks/useQuery/useGetSchools"
import { LuGripVertical, LuPencil, LuTrash } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
import useDeleteSchool from "../../../../hooks/useMutation/school/useDeleteSchool"
import notify from "../../../../hooks/useNotify"

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

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nome</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((school) => (
              <Tr key={school.id}>
                <Td>{school.name}</Td>
                <Td>
                  <Popover matchWidth>
                    <PopoverTrigger>
                      <Button bgColor={"transparent"} color={"orange.500"}>
                        <LuGripVertical />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverBody>
                        <Button
                          bgColor={"transparent"}
                          color={"orange.500"}
                          onClick={() => handleEditSchool(school.id)}
                          display={"flex"}
                          gap={4}>
                          <LuPencil size="20px" />
                          <Text>Editar</Text>
                        </Button>
                        <Button
                          bgColor={"transparent"}
                          color={"orange.500"}
                          onClick={() => handleDeleteSchool(school.id)}
                          display={"flex"}
                          gap={4}>
                          <LuTrash size="20px" />
                          <Text>Deletar</Text>
                        </Button>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  )
}

export default ManageSchool
