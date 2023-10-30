import { Box, Button, Popover, PopoverBody, PopoverContent, PopoverTrigger, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import useUser from "../../../../hooks/useUser"
import { useNavigate } from "react-router-dom"
import api from "../../../../Utils/api"
import { LuGripVertical, LuPencil, LuTrash } from "react-icons/lu"

function ManageAdvantages() {
  const { user } = useUser()
  const navigateTo = useNavigate()

  const [advantages, setAdvantages] = useState([])

  useEffect(() => {
    if (!user) {
      navigateTo("/")
      return
    }

    const fetchAdvantages = async () => {
      const { data } = await api.post("/company/advantage", { id: user.id })
      setAdvantages(data.advantages)
    }

    fetchAdvantages()
  }, [navigateTo, user])

  const handleAddAdvantages = () => {
    navigateTo("./add")
  }

  return (
    <VStack>
      <Text fontWeight={"bold"} fontSize={["xl", "3xl"]}>
        Gerenciar vantagens
      </Text>

      <Button colorScheme="orange" onClick={handleAddAdvantages}>
        <Text>Adicionar vantagem</Text>
      </Button>

      {/* {advantages.length === 0 ? (
        <Text>Nenhuma vantagem cadastrada</Text>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nome</Th>
              </Tr>
            </Thead>
            <Tbody>
              {advantages?.map((school) => (
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
                            display={"flex"}
                            gap={4}>
                            <LuPencil size="20px" />
                            <Text>Editar</Text>
                          </Button>
                          <Button
                            bgColor={"transparent"}
                            color={"orange.500"}
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
      )} */}
    </VStack>
  )
}

export default ManageAdvantages
