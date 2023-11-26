import { Flex, Text } from "@chakra-ui/layout"
import useUser from "../../../../hooks/useUser"
import { useEffect, useState } from "react"
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
  TeacherSchema,
} from "../../../../hooks/useQuery/useGetSchools"
import useGetCompanies from "../../../../hooks/useQuery/useGetCompanies"
import useGetStudentTransactions from "../../../../hooks/useQuery/useGetStudentTransactions"

type HistorySchema = {
  id: string
  date: Date
  quantity: number
  description: string
  studentId: string
  teacherId: string
  toCompanyId: string
}

function ManageHistory() {
  const { user } = useUser()
  const [history, setHistory] = useState<HistorySchema[]>([] as HistorySchema[])

  const { data } = useGetSchools()
  const { data: companyData } = useGetCompanies()
  const [teacher, setTeacher] = useState<TeacherSchema[]>([] as TeacherSchema[])

  const { data: transactions } = useGetStudentTransactions({ id: user.id })

  setHistory(transactions)

  useEffect(() => {
    if (!user) return

    if (!data) return

    const teachers = data.find((schools) =>
      schools.students.find((student) => student.id === user.id)
    )?.teachers

    if (!teachers) return

    setTeacher(teachers)
  }, [user, data])

  const getTeacherName = (teacherId: string) => {
    return teacher.find((teacher) => teacher.id === teacherId)?.name || "-"
  }

  const getCompanyName = (companyId: string) => {
    return companyData?.find((company) => company.id === companyId)?.name || "-"
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
                <Th>Professor</Th>
                <Th>Parceiros</Th>
                <Th isNumeric>Valor</Th>
              </Tr>
            </Thead>
            <Tbody>
              {history
                ?.sort(
                  (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
                )
                .map((h) => (
                  <Tr key={h.id}>
                    <Td>{String(h.date)}</Td>
                    <Td>{h.description}</Td>
                    <Td>{getTeacherName(h.teacherId)}</Td>
                    <Td>{getCompanyName(h.toCompanyId)}</Td>
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
