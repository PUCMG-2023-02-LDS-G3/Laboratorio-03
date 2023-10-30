import { Button, Flex, Input, Text, VStack } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import notify from "../../../../hooks/useNotify"
import useEditSchool from "../../../../hooks/useMutation/school/useEditSchool"
import { useEffect, useState } from "react"
import useGetSchools from "../../../../hooks/useQuery/useGetSchools"

function EditSchool() {
  const { id } = useParams()
  const [schoolName, setSchoolName] = useState("")
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
    },
    values: {
      name: schoolName,
    },
  })

  const navigateTo = useNavigate()

  const { mutateAsync } = useEditSchool()
  const {data} = useGetSchools()

  useEffect(() => {
    if (!id) {
      navigateTo("/app/admin/")
      return
    }

    const schoolName = data?.find((school) => school.id === id)?.name


    if (!schoolName) {
      navigateTo("/app/admin/")
      return
    }

    setSchoolName(schoolName)
  }, [id, navigateTo, data])

  const onSubmit = async (data: { name: string }) => {
    console.log(data)

    try {
      if (!id) {
        navigateTo("/app/admin/")
        return
      }

      await mutateAsync({ id, name: data.name })
      notify({ message: "Instituição de ensino editada com sucesso" })
    } catch (error) {
      console.log(error)
      notify({ message: "Erro ao editar instituição de ensino", type: "error" })
    }
  }

  return (
    <Flex flexDir={"column"} gap={10}>
      <Text fontWeight={"bold"} fontSize={["xl", "3xl"]}>
        Editar instituição de ensino
      </Text>

      <VStack>
        <Text fontSize={"xl"}>Nome da instituição</Text>
        <Input {...register("name")} />
      </VStack>

      <Button colorScheme="orange" onClick={handleSubmit(onSubmit)}>Editar</Button>
    </Flex>
  )
}

export default EditSchool
