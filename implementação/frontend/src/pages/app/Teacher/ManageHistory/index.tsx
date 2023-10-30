import { Flex, Text } from "@chakra-ui/layout"
import useUser from "../../../../hooks/useUser"
import { useEffect, useState } from "react"
import api from "../../../../Utils/api"
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import useGetSchools, {
  StudentSchema,
} from "../../../../hooks/useQuery/useGetSchools"

type HistorySchema = {
  id: string
  date: Date
  quantity: number
  description: string
  studentId: string
  teacherId: string
  toCompany: string
}

function ManageHistory() {
  const { user } = useUser()
  const [history, setHistory] = useState<HistorySchema[]>([] as HistorySchema[])

  const { data } = useGetSchools()
  const [students, setStudents] = useState<StudentSchema[]>(
    [] as StudentSchema[]
  )

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.post("/teacher/transactions", {
        email: user.email,
      })

      setHistory(response.data)
    }

    fetchData()
  }, [user.email])

  useEffect(() => {
    if (!user) return

    if (!data) return

    const students = data.find((school) =>
      school.teachers.find((teacher) => teacher.id === user.id)
    )?.students

    if (!students) return

    setStudents(students)
  }, [user, data])

  const getStudentName = (studentId: string) => {
    return students.find((student) => student.id === studentId)?.name || "-"
  }

  return (
    <Flex flexDir={"column"} gap={12} align={"center"}>
      <Text fontWeight={"bold"} fontSize={["xl", "3xl"]}>
        Historia de transações
      </Text>

      {history.length === 0 ? (
        <Text>Não possui transações</Text>
      ) : (
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Data</Th>
                <Th>Descrição</Th>
                <Th>Aluno</Th>
                <Th isNumeric>Quantidade</Th>
              </Tr>
            </Thead>
            <Tbody>
              {history
                ?.sort(
                  (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
                )
                .map((h) => (
                  <Tr>
                    <Td>{String(h.date)}</Td>
                    <Td>{h.description}</Td>
                    <Td>{getStudentName(h.studentId)}</Td>
                    <Td isNumeric>{h.quantity}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Flex>
  )
}

export default ManageHistory
