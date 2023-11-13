import {
  Button,
  Flex,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
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
import { LuGripVertical, LuPencil, LuTrash } from "react-icons/lu"
import { useNavigate } from "react-router-dom"
import useDeleteSchool from "../../../../hooks/useMutation/school/useDeleteSchool"
import notify from "../../../../hooks/useNotify"
import useGetSchools, {
  TeacherSchema,
} from "../../../../hooks/useQuery/useGetSchools"
import { useEffect, useState } from "react"
import api from "../../../../Utils/api"
import { useForm } from "react-hook-form"
import useAddCoinToTeacher from "../../../../hooks/useMutation/school/useAddCoinToTeacher"

function ManageTeacher() {
  const navigateTo = useNavigate()
  const { data: schoolsData, isLoading } = useGetSchools()
  const { mutateAsync } = useDeleteSchool()
  const { mutateAsync: AddCoinMutationAsync } = useAddCoinToTeacher()

  const [teachers, setTeachers] = useState<TeacherSchema[]>([])
  const [schoolId, setSchoolId] = useState<string>("")

  const { register, handleSubmit } = useForm({
    defaultValues: {
      changeSchoolId: "",
      teacherId: "",
      amount: 0,
    },
    values: {
      changeSchoolId: schoolsData ? schoolsData[0]?.id : "",
      teacherId: teachers[0]?.id || "",
      amount: 0,
    },
  })

  useEffect(() => {
    if (!schoolsData) {
      navigateTo("/app/admin/school")
      return
    }

    const schoolId = schoolsData[0].id
    setSchoolId(schoolId)

    const getTeachers = async () => {
      const response = await api.post("/admin/school/teacher", { id: schoolId })
      setTeachers(response.data.teachers)
    }

    getTeachers()
  }, [schoolsData, navigateTo])

  useEffect(() => {
    const getTeachers = async () => {
      const response = await api.post("/admin/school/teacher", { id: schoolId })
      setTeachers(response.data.teachers)
    }

    getTeachers()
  }, [schoolId])

  const handleEditTeacher = (id: string) => {
    navigateTo(`./edit/${id}/school/${schoolId}/`)
  }

  const handleDeleteTeacher = async (id: string) => {
    try {
      await mutateAsync({ id })
      notify({ message: "Professor deletado com sucesso" })
    } catch (error) {
      console.log(error)
      notify({ message: "Erro ao deletar professor", type: "error" })
    }
  }

  const handleAddTeacher = () => navigateTo("./add")

  const handleChangeSchool = (data: { changeSchoolId: string }) => {
    console.log(data)
    setSchoolId(data.changeSchoolId)
  }

  const handleAddCoinsToTeacher = async (data: {
    teacherId: string
    amount: number
  }) => {
    try {
      console.log(data)

      if (!Number(data.amount) || !data.teacherId) {
        return
      }

      await AddCoinMutationAsync({
        id: data.teacherId,
        amount: Number(data.amount),
      })
      notify({ message: "Moedas adicionadas com sucesso" })
    } catch (error) {
      console.log(error)
      notify({ message: "Erro ao adicionar moedas", type: "error" })
    }
  }

  return isLoading ? (
    <Skeleton h={"500px"} />
  ) : (
    <VStack maxW={"1000px"} width={"100%"} gap={12}>
      <Text fontWeight={"bold"} fontSize={["xl", "3xl"]}>
        Gerenciar Professores
      </Text>

      <Button colorScheme={"orange"} onClick={handleAddTeacher}>
        <Text>Adicionar professor</Text>
      </Button>

      <Flex align={"flex-end"} gap={8}>
        <VStack>
          <Text fontSize={"xl"}>Instituição de ensino selecionada</Text>
          <Select {...register("changeSchoolId")}>
            {schoolsData?.map((school) => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </Select>
        </VStack>

        <Button onClick={handleSubmit(handleChangeSchool)}>
          Trocar instituição
        </Button>
      </Flex>

      <Flex align={"flex-end"} gap={8}>
        <VStack>
          <Text fontSize={"xl"}>Enviar moedas para...</Text>
          <Select {...register("teacherId")}>
            {teachers?.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </Select>
        </VStack>

        <VStack>
          <Text fontSize={"xl"}>Quantidade</Text>
          <Input type="number" {...register("amount")} />
        </VStack>

        <Button onClick={handleSubmit(handleAddCoinsToTeacher)}>
          Enviar moedas
        </Button>
      </Flex>

      {teachers.length === 0 ? (
        <Text>Nenhum professor cadastrado na instituição de ensino</Text>
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>CPF</Th>
                <Th>Email</Th>
                <Th isNumeric>Moedas</Th>
              </Tr>
            </Thead>
            <Tbody>
              {teachers?.map((teacher) => (
                <Tr key={teacher.id}>
                  <Td>{teacher.name}</Td>
                  <Td>{teacher.cpf}</Td>
                  <Td>{teacher.email}</Td>
                  <Td>{teacher.coins}</Td>
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
                            onClick={() => handleEditTeacher(teacher.id)}
                            display={"flex"}
                            gap={4}>
                            <LuPencil size="20px" />
                            <Text>Editar</Text>
                          </Button>
                          <Button
                            bgColor={"transparent"}
                            color={"orange.500"}
                            onClick={() => handleDeleteTeacher(teacher.id)}
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
      )}
    </VStack>
  )
}

export default ManageTeacher
