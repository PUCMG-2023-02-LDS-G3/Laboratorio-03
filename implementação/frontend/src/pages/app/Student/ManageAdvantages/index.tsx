import { Flex, Text } from "@chakra-ui/layout"
import useUser from "../../../../hooks/useUser"
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  //   Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import api from "../../../../Utils/api"
import { Advantage, Student } from "../../../../Utils/models"

type StudentAdvantage = {
  Advantage: Advantage
  Student: Student
}

function ManageAdvantages() {
  const { user } = useUser()
  const [advantages, setAdvantages] = useState([] as StudentAdvantage[])

  useEffect(() => {
    const fecthApi = async () => {
      const response = await api.post("/student/advantages", {
        studentId: user.id,
      })
      console.log(response.data)
      setAdvantages(response.data)
    }
    fecthApi()
  }, [user.id])

  return (
    <Flex flexDir={"column"} gap={12} align={"center"}>
      <Text fontWeight={"bold"} fontSize={["xl", "3xl"]}>
        Lista de vantagens
      </Text>

      {advantages.length === 0 ? (
        <Text>Não possui vantagens</Text>
      ) : (
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th isNumeric>Valor</Th>
              </Tr>
            </Thead>
            <Tbody>
              {advantages.map((advantage) => (
                <Tr key={advantage.Advantage.id}>
                  <Td>{advantage.Advantage.name}</Td>
                  <Td>{advantage.Advantage.price}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Flex>
  )
}

export default ManageAdvantages
