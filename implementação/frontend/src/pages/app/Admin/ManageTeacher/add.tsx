import { Button, Flex, Input, Select, Text, VStack } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import notify from "../../../../hooks/useNotify"

import useAddTeacher, {
  AddTeacherProps,
} from "../../../../hooks/useMutation/school/useAddTeacher"
import useGetSchools from "../../../../hooks/useQuery/useGetSchools"

function AddTeacher() {
  const { mutateAsync } = useAddTeacher()
  const { data } = useGetSchools()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      password: "",
      cpf: "",
      email: "",
      schoolId: "",
    },
    values: {
        name: "",
        password: "",
        cpf: "",
        email: "",
        schoolId: "",
    },
  })

  const onSubmit = async (data: AddTeacherProps) => {
    try {
      if (!data.name || !data.password || !data.schoolId || !data.cpf) {
        return
      }

      await mutateAsync(data)
      notify({ message: "Instituição de ensino editada com sucesso" })
    } catch (error) {
      console.log(error)
      notify({ message: "Erro ao editar instituição de ensino", type: "error" })
    }
  }

  return (
    <Flex flexDir={"column"} gap={10}>
      <Text fontWeight={"bold"} fontSize={["xl", "3xl"]}>
        Adicionar novo professor
      </Text>

      <VStack>
        <Text fontSize={"xl"}>Nome</Text>
        <Input {...register("name")} />
      </VStack>

      <VStack>
        <Text fontSize={"xl"}>CPF</Text>
        <Input {...register("cpf")} />
      </VStack>

      <VStack>
        <Text fontSize={"xl"}>Email</Text>
        <Input {...register("email")} />
      </VStack>

      <VStack>
        <Text fontSize={"xl"}>Senha</Text>
        <Input {...register("password")} />
      </VStack>

      <VStack>
        <Text fontSize={"xl"}>Instituição de ensino</Text>
        <Select {...register("schoolId")}>
          {data?.map((school) => (
            <option key={school.id} value={school.id}>
              {school.name}
            </option>
          ))}
        </Select>
      </VStack>

      <Button colorScheme="orange" onClick={handleSubmit(onSubmit)}>
        Adicionar novo professor
      </Button>
    </Flex>
  )
}

export default AddTeacher
