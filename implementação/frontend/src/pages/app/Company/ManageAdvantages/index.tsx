import {
  Button,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import useUser from "../../../../hooks/useUser"
import { useNavigate } from "react-router-dom"
import notify from "../../../../hooks/useNotify"
import useGetAdvantages from "../../../../hooks/useQuery/useGetAdvantages"
import AdvantagesTable from "./subcomponents/AdvantagesTable"
import useDeleteAdvantage from "../../../../hooks/useMutation/school/useDeleteAdvantage"

type AdvantageSchema = {
  id: string
  companyId: string
  name: string
  price: number
}

function ManageAdvantages() {

  const { user } = useUser()

  const { mutateAsync } = useDeleteAdvantage()

  const navigateTo = useNavigate()

  const { data } = useGetAdvantages(user)

  const [advantages, setAdvantages] = useState<AdvantageSchema[]>(data || [])

  const handleAddAdvantages = () => {
    navigateTo("./add")
  }

  const handleEditAdvantages = (id: string) => {
    navigateTo(`./edit/${id}`)
  }

  const handleDeleteAdvantage = async (id: string) => {
    try {
        await mutateAsync({ id, companyId: user.id })
        setAdvantages(d => d.filter(advantage => advantage.id !== id))
        notify({ message: "Vantagem deletada com sucesso" })
    } catch (err) {
        console.error(err)
        notify({ message: "Erro ao deletar vantagem", type: "error" })
    }
  }

  return (
    <VStack>
      <Text fontWeight={"bold"} fontSize={["xl", "3xl"]}>
        Gerenciar vantagens
      </Text>

      <Button colorScheme="orange" onClick={handleAddAdvantages}>
        <Text>Adicionar vantagem</Text>
      </Button>

      {advantages.length === 0 ? (
        <Text>Nenhuma vantagem cadastrada</Text>
      ) : (
        <AdvantagesTable advantages={advantages} handleEditAdvantages={handleEditAdvantages} handleDeleteAdvantage={handleDeleteAdvantage} />
      )}
    </VStack>
  )
}

export default ManageAdvantages
