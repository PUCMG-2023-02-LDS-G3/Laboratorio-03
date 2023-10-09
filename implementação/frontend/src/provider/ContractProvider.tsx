import { createContext } from "react"
import { useLocalState } from "../Utils/useLocalStorage"
import notify from "../hooks/useNotify"

interface Order {
  cpf: string
  cnpj: string
  matricula: string
  data: Date
  aproved: boolean | null
  credito: {
    valor: number
    cnpj: string
  } | null
}

interface Contract {
  cpf: string
  cnpj: string
  matricula: string
  dataInicio: Date
  dataFim: Date
  valor: number
}

interface ContractContextData {
  contracts: Contract[]
  orders: Order[]
  createContract: (contract: Contract) => void
  createOrder: (order: Order) => void
  getUserOrders: (cpf: string) => Order[]
  removeOrder: (order: Order) => void
  getAgentOrders: (cnpj: string) => Order[]
  getUserContracts: (cpf: string) => Contract[]
  getAgentContracts: (cnpj: string) => Contract[]
  acceptOrder: (order: Order, dataFim: Date) => void
  rejectOrder: (order: Order) => void
    rejectContract: (contract: Contract) => void
}

export const ContractContext = createContext({} as ContractContextData)

function ContractProvider({ children }: any) {
  const [contracts, setContracts] = useLocalState(
    "@contracts",
    [] as Contract[]
  )
  const [orders, setOrders] = useLocalState("@orders", [] as Order[])

  const createContract = (contract: Contract) => {
    setContracts((c) => [...c, contract])
  }

  const createOrder = (order: Order) => {
    setOrders((o) => [...o, order])
    notify({message: "Pedido enviado com sucesso!", type: "success"})
  }

  const getUserOrders = (cpf: string) => {
    return orders.filter((o) => o.cpf === cpf)
  }

  const getAgentOrders = (cnpj: string) => {
    return orders.filter((o) => o.cnpj === cnpj)
  }

  const getUserContracts = (cpf: string) => {
    return contracts.filter((c) => c.cpf === cpf)
  }

  const getAgentContracts = (cnpj: string) => {
    return contracts.filter((c) => c.cnpj === cnpj)
  }

  const removeOrder = (order: Order) => {
    setOrders((o) => o.filter((o) => o !== order))
    notify({message: "Pedido cancelado", type: "success"})
  }

  const acceptOrder = (order: Order, dataFim: Date) => {
    removeOrder(order)
    createContract({
      cpf: order.cpf,
      cnpj: order.cnpj,
      matricula: order.matricula,
      dataInicio: order.data,
      dataFim,
      valor: order.credito!.valor,
    })
    notify({message: "Pedido aceito com sucesso!", type: "success"})

  }

  const rejectOrder = (order: Order) => {
    const newOrder = { ...order, aproved: false }
    removeOrder(order)
    createOrder(newOrder)
    notify({message: "Pedido reprovado", type: "success"})
  }

  const rejectContract = (contract: Contract) => {
    setContracts((c) => c.filter((c) => c !== contract))
    notify({message: "Contrato rejeitado", type: "success"})
  }

  return (
    <ContractContext.Provider
      value={{
        contracts,
        orders,
        createContract,
        createOrder,
        getUserOrders,
        removeOrder,
        getAgentOrders,
        acceptOrder,
        rejectOrder,
        getAgentContracts,
        getUserContracts,
        rejectContract
      }}>
      {children}
    </ContractContext.Provider>

  )
}

export default ContractProvider
