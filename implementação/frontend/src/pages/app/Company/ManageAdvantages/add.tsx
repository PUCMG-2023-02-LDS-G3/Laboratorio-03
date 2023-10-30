import { Button, Flex, Input, Text, VStack } from "@chakra-ui/react"
import { useForm } from "react-hook-form"

function AddAdvantages() {
  const { handleSubmit, register } = useForm()

  const onSubmit = (data) => {
    console.log(data)
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
        <Text fontSize={"xl"}>Value</Text>
        <Input {...register("price")} />
      </VStack>

      <Button colorScheme="orange" onClick={handleSubmit(onSubmit)}>
        Adicionar
      </Button>
    </Flex>
  )
}

export default AddAdvantages
