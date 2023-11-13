import { Button, Flex, Select, Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import api from "../../../../Utils/api"
import useUser from "../../../../hooks/useUser"
import notify from "../../../../hooks/useNotify"
import useGetCompanies from "../../../../hooks/useQuery/useGetCompanies"
import { Student } from "../../../../Utils/models"

function ManageExchange() {
  const { user, updateUser } = useUser()
  const [companyId, setCompanyId] = useState("")
  const [advantages, setAdvantages] = useState([] as any[])
  const { data } = useGetCompanies()

  const { register, handleSubmit, resetField} = useForm({
    defaultValues: {
      changeCompanyId: "",
      advantageId: "",
    },
    values: {
      changeCompanyId: companyId,
      advantageId: advantages[0]?.id,
    },
  })

  useEffect(() => {
    if (!data) return

    const company = data[0]

    setCompanyId(company.id)
  }, [data])

  useEffect(() => {
    const company = data?.find((company) => company.id === companyId)

    if (!company) return

    setAdvantages(company.advantages)
  }, [data, companyId])

  const handleChangeCompany = (data: { changeCompanyId: string }) =>
    setCompanyId(data.changeCompanyId)

  const onSubmit = async ({ advantageId }: { advantageId: string }) => {
    try {
      const response = await api.post("/student/exchange/advantage", {
        id: user.id,
        advantageId: advantageId,
      })

      const student = response.data as Student
      updateUser({ ...user, coins: student.coins })

      resetField("advantageId")
      notify({ message: "Troca realizada com sucesso" })
    } catch (err) {
      console.log(err)
      notify({ message: "Erro ao realizar troca", type: "error" })
    }
  }

  return (
    <Flex flexDir={"column"} gap={12} align={"center"}>
      <Text fontWeight={"bold"} fontSize={["xl", "3xl"]}>
        Trocar Moedas
      </Text>

      <Text fontWeight={"bold"} fontSize={"xl"}>
        Saldo atual: {user?.coins} moedas
      </Text>

      <Flex align={"flex-end"} gap={8}>
        <VStack>
          <Text fontSize={"xl"}>Parceira selecionada</Text>
          <Select {...register("changeCompanyId")}>
            {data?.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </Select>
        </VStack>

        <Button
          colorScheme="orange"
          onClick={handleSubmit(handleChangeCompany)}>
          Trocar parceira
        </Button>
      </Flex>

      <VStack>
        <Text fontSize={"xl"}>Nome</Text>
        {advantages.length > 0 ? (
          <Select {...register("advantageId")}>
            {advantages.map((advantage) => (
              <option key={advantage.id} value={advantage.id}>
                {advantage.name} = {advantage.price} moedas
              </option>
            ))}
          </Select>
        ) : (
          <Text>Parceira não possui vantagem</Text>
        )}
      </VStack>

      <Button onClick={handleSubmit(onSubmit)} w={"100%"} colorScheme="orange">
        <Text fontSize={"xl"}>Trocar</Text>
      </Button>
    </Flex>
  )
}

export default ManageExchange
