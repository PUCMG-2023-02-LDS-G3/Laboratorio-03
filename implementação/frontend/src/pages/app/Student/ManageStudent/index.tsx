import { Button, Flex, Input, Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import api from "../../../../Utils/api"
import useUser from "../../../../hooks/useUser"
import { StudentSchema } from "../../../../hooks/useQuery/useGetSchools"
import notify from "../../../../hooks/useNotify"

function ManageStudent() {
  const { user } = useUser()
  const [student, setStudent] = useState<StudentSchema>({} as StudentSchema)
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      major: "",
      password: "",
      address: "",
    },
    values: {
      name: student.name,
      major: student.major,
      password: student.password,
      address: student.address,
    },
  })

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await api.post("/student/profile", {
        id: user.id,
      })

      setStudent(data)
    }

    fetchData()
  }, [user.id])

  const onSubmit = async ({
    name,
    address,
    major,
    password,
  }: {
    name: string
    password: string
    major: string
    address: string
  }) => {
    try {
      await api.post("/student/update", {
        id: user.id,
        name,
        password,
        major,
        address,
      })
      notify({ message: "Perfil atualizado com sucesso" })
    } catch (err) {
      console.log(err)
      notify({ message: "Erro ao atualizar o perfil", type: "error" })
    }
  }

  return (
    <Flex flexDir={"column"} gap={12} align={"center"}>
      <Text fontWeight={"bold"} fontSize={["xl", "3xl"]}>
        Perfil
      </Text>

      <VStack>
        <Text fontSize={"xl"}>Nome</Text>
        <Input {...register("name")} />
      </VStack>

      <VStack>
        <Text fontSize={"xl"}>Senha</Text>
        <Input {...register("password")} />
      </VStack>

      <VStack>
        <Text fontSize={"xl"}>Curso</Text>
        <Input {...register("major")} />
      </VStack>

      <VStack>
        <Text fontSize={"xl"}>Endereço</Text>
        <Input {...register("address")} />
      </VStack>

      <Button onClick={handleSubmit(onSubmit)} w={"100%"} colorScheme="orange">
        <Text fontSize={"xl"}>Salvar</Text>
      </Button>
    </Flex>
  )
}

export default ManageStudent
