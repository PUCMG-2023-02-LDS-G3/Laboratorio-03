import { Button } from "@chakra-ui/button"
import { Input } from "@chakra-ui/input"
import { Flex, Text, VStack } from "@chakra-ui/layout"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import api from "../../../../Utils/api"
import useUser from "../../../../hooks/useUser"
import notify from "../../../../hooks/useNotify"

function ManageProfile() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const { user } = useUser()

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      password: "",
    },
    values: {
      name,
      password,
    },
  })

  useEffect(() => {
    const fecthData = async () => {
      const { data } = await api.post("/company/profile", { id: user.id })

      setName(data.name)
      setPassword(data.password)
    }

    fecthData()
  }, [user.id])

  const onSubmit = async (data: { name: string; password: string }) => {
    console.log(data)

    try {
      await api.post("/company/profile", {
        id: user.id,
        name: data.name,
        password: data.password,
      })
      notify({ message: "Parceira editada com sucesso" })
    } catch (error) {
      console.log(error)
      notify({ message: "Erro ao editar parceira", type: "error" })
    }
  }

  return (
    <Flex flexDir={"column"} gap={10} align={"center"}>
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

      <Button onClick={handleSubmit(onSubmit)} colorScheme="orange">
        Editar perfil
      </Button>
    </Flex>
  )
}

export default ManageProfile
