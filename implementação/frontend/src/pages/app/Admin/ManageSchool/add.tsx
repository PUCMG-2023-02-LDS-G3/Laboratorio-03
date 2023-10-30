import { Button, Flex, Input, Text, VStack } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import notify from "../../../../hooks/useNotify"
import useAddSchool from "../../../../hooks/useMutation/school/useAddSchool"

function AddSchool() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
    },
  })

  const { mutateAsync } = useAddSchool()

  const onSubmit = async (data: { name: string }) => {
    console.log(data)

    try {
      await mutateAsync({ name: data.name })
      notify({ message: "Instituição de ensino editada com sucesso" })
    } catch (error) {
      console.log(error)
      notify({ message: "Erro ao editar instituição de ensino", type: "error" })
    }
  }

  return (
    <Flex flexDir={"column"} gap={10}>
      <Text fontWeight={"bold"} fontSize={["xl", "3xl"]}>
        Adicionar nova instituição de ensino
      </Text>

      <VStack>
        <Text fontSize={"xl"}>Nome da instituição</Text>
        <Input {...register("name")} />
      </VStack>

      <Button colorScheme="orange" onClick={handleSubmit(onSubmit)}>
        Editar
      </Button>
    </Flex>
  )
}

export default AddSchool
