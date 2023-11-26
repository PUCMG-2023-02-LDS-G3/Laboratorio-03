import { Button, Flex, Input, Text, VStack } from "@chakra-ui/react"
import { useForm } from "react-hook-form"
import useUser from "../../../../hooks/useUser"
import notify from "../../../../hooks/useNotify"
import useAddAdvantage from "../../../../hooks/useMutation/school/useAddAdvantage"

function AddAdvantages() {
  const { user } = useUser()

  const { mutateAsync } = useAddAdvantage()

  const { handleSubmit, register } = useForm({
    defaultValues: {
      name: "",
      price: 0,
    },
  })

  const onSubmit = async ({ name, price }: { name: string; price: number }) => {
    if (Number(price) <= 0 || !name) return

    try {
        await mutateAsync({ name, price: Number(price), companyId: user.id })
        notify({ message: "Vantagem adicionada com sucesso" })

    } catch (err) {
        console.error(err)
        notify({ message: "Erro ao adicionar vantagem", type: "error" })
    }
  }

  return (
    <Flex flexDir={"column"} gap={10}>
      <Text fontWeight={"bold"} fontSize={["xl", "3xl"]}>
        Adicionar nova vantagem
      </Text>

      <VStack>
        <Text fontSize={"xl"}>Nome</Text>
        <Input {...register("name")} />
      </VStack>

      <VStack>
        <Text fontSize={"xl"}>Preço</Text>
        <Input {...register("price")} />
      </VStack>

      <Button colorScheme="orange" onClick={handleSubmit(onSubmit)}>
        Adicionar nova vantagem
      </Button>
    </Flex>
  )
}

export default AddAdvantages
