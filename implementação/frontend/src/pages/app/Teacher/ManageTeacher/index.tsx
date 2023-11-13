import { Button } from "@chakra-ui/button"
import { Input } from "@chakra-ui/input"
import { Flex, Text, VStack } from "@chakra-ui/layout"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import useUser from "../../../../hooks/useUser"
import useGetSchools, {
  StudentSchema,
} from "../../../../hooks/useQuery/useGetSchools"
import { Skeleton } from "@chakra-ui/skeleton"
import { Select } from "@chakra-ui/select"
import notify from "../../../../hooks/useNotify"
import api from "../../../../Utils/api"

function ManageTeacher() {
  const { user } = useUser()
    const { data, isLoading } = useGetSchools()
  const [students, setStudents] = useState<StudentSchema[]>(
    [] as StudentSchema[]
  )
  const { register, handleSubmit, resetField } = useForm({
    defaultValues: {
      amount: 0,
      description: "",
      studentId: "",
    },
    values: {
      amount: 0,
      description: "",
      studentId: students ? students[0]?.id : "",
    }
  })


  useEffect(() => {
    if (!user) return

    if (!data) return

    const students = data.find((school) =>
      school.teachers.find((teacher) => teacher.id === user.id)
    )?.students

    if (!students) return

    setStudents(students)
  }, [user, data])

  const onSubmit = async ({
    amount,
    description,
    studentId,
  }: {
    amount: number
    description: string
    studentId: string
  }) => {
    if (Number(amount) <= 0 || !description || !studentId) return

    try {
      await api.post("/teacher/exchange/coins", {
        email: user.email,
        quantity: Number(amount),
        studentId,
        description,
      })
      notify({ message: "Moeda enviada com sucesso" })
      resetField("amount")
      resetField("description")
    } catch (err) {
      console.error(err)
      notify({ message: "Erro ao enviar moeda", type: "error" })
    }
  }

  return (
    <Flex flexDir={"column"} gap={12} align={"center"}>
      <Text fontWeight={"bold"} fontSize={["xl", "3xl"]}>
        Enviar moeda
      </Text>

      <VStack w="100%">
        <Text fontSize={"xl"}>Aluno</Text>
        {isLoading ? (
          <Skeleton w={"100%"} />
        ) : (
          <Select w="100%" {...register("studentId")}>
            {students?.map((school) => (
              <option key={school.id} value={school.id}>
                {school.name}
              </option>
            ))}
          </Select>
        )}
      </VStack>

      <VStack>
        <Text fontSize={"xl"}>Quantidade</Text>
        <Input {...register("amount")} />
      </VStack>

      <VStack>
        <Text fontSize={"xl"}>Descrição</Text>
        <Input {...register("description")} />
      </VStack>

      <Button w="100%" colorScheme="orange" onClick={handleSubmit(onSubmit)}>
        Enviar moeda
      </Button>
    </Flex>
  )
}

export default ManageTeacher
