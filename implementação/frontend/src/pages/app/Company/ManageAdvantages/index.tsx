import {
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
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
import { useEffect, useState } from "react"
import useUser from "../../../../hooks/useUser"
import { useNavigate } from "react-router-dom"
import api from "../../../../Utils/api"
import { LuGripVertical, LuPencil, LuTrash } from "react-icons/lu"
import notify from "../../../../hooks/useNotify"

type AdvantageSchema = {
    id: string
  companyId: string
  name: string
  price: number
}

function ManageAdvantages() {
  const { user } = useUser()
  const navigateTo = useNavigate()

  const [advantages, setAdvantages] = useState<AdvantageSchema[]>(
    [] as AdvantageSchema[]
  )

  useEffect(() => {
    if (!user) {
      navigateTo("/")
      return
    }

    const fetchAdvantages = async () => {
      const { data } = await api.post("/company/advantage", { id: user.id })
      setAdvantages(data)
    }

    fetchAdvantages()
  }, [navigateTo, user])

  const handleAddAdvantages = () => {
    navigateTo("./add")
  }

  const handleEditAdvantages = (id: string) => {
    navigateTo(`./edit/${id}`)
  }

  const handleDeleteAdvantage = async (id: string) => {
    try {
        await api.post("/company/advantage/delete", { companyId: user.id, id })
        setAdvantages(d => d.filter(advantage => advantage.id !== id))
        notify({ message: "Vantagem deletada com sucesso" })
    } catch (err) {
        console.error(err)
        notify({ message: "Erro ao deletar vantagem", type: "error" })
    }
  }

  return (
    <VStack>
      <Text fontWeight={"bold"} fontSize={["xl", "3xl"]}>
        Gerenciar vantagens
      </Text>

      <Button colorScheme="orange" onClick={handleAddAdvantages}>
        <Text>Adicionar vantagem</Text>
      </Button>

      {advantages.length === 0 ? (
        <Text>Nenhuma vantagem cadastrada</Text>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th isNumeric>Preço</Th>
              </Tr>
            </Thead>
            <Tbody>
              {advantages?.map((advantage) => (
                <Tr key={advantage.id}>
                  <Td>{advantage.name}</Td>
                  <Td isNumeric>{advantage.price}</Td>
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
                            onClick={() => handleEditAdvantages(advantage.id)}
                            gap={4}>
                            <LuPencil size="20px" />
                            <Text>Editar</Text>
                          </Button>
                          <Button
                            bgColor={"transparent"}
                            color={"orange.500"}
                            display={"flex"}
                            onClick={() => handleDeleteAdvantage(advantage.id)}
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
      )}
    </VStack>
  )
}

export default ManageAdvantages
