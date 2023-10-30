import { Button, Flex, Input, Text, VStack } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import notify from "../../../../hooks/useNotify"
import { useEffect, useState } from "react"
import useGetSchools, {
  TeacherSchema,
} from "../../../../hooks/useQuery/useGetSchools"
import useEditTeacher from "../../../../hooks/useMutation/school/useEditTeacher"

function EditTeacher() {
  const { id, schoolId } = useParams()
  const [teacher, setTeacher] = useState<TeacherSchema>({} as TeacherSchema)
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      password: "",
    },
    values: {
      name: teacher.name,
      password: teacher.password,
    },
  })

  const navigateTo = useNavigate()

  const { mutateAsync } = useEditTeacher()
  const { data } = useGetSchools()

  useEffect(() => {
    if (!id || !schoolId) {
      navigateTo("/app/admin/")
      return
    }

    const teacher = data
      ?.find((school) => school.id === schoolId)
      ?.teachers.find((teacher) => teacher.id === id)

    if (!teacher) {
      navigateTo("/app/admin/")
      return
    }

    setTeacher(teacher)
  }, [data, id, navigateTo, schoolId])

  const onSubmit = async (data: { name: string, password: string }) => {

    try {
      if (!id) {
        navigateTo("/app/admin/")
        return
      }

      if(!data.name || !data.password) {
        return
      }

      await mutateAsync({ ...teacher, ...data})
      notify({ message: "Instituição de ensino editada com sucesso" })
    } catch (error) {
      console.log(error)
      notify({ message: "Erro ao editar instituição de ensino", type: "error" })
    }
  }

  return (
    <Flex flexDir={"column"} gap={10}>
      <Text fontWeight={"bold"} fontSize={["xl", "3xl"]}>
        Editar professor
      </Text>

      <VStack>
        <Text fontSize={"xl"}>Nome do professor</Text>
        <Input {...register("name")} />
      </VStack>

      <VStack>
        <Text fontSize={"xl"}>Senha do professor</Text>
        <Input {...register("password")} />
      </VStack>

      <Button colorScheme="orange" onClick={handleSubmit(onSubmit)}>
        Editar
      </Button>
    </Flex>
  )
}

export default EditTeacher
