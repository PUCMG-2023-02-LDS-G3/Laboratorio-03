import { createContext, useCallback } from "react"
import { useLocalState } from "../Utils/useLocalStorage"
import notify from "../hooks/useNotify"

interface UserContextData {
  user: {
    email: string
    password: string
    isCliente: boolean
  }
  SingIn: (email: string, password: string, isCliente: boolean) => boolean
  SingOut: () => void
  isUserLogged: () => boolean
  createAccount: (email: string, password: string, isCliente: boolean) => void
}

interface Account {
  email: string
  password: string
  isCliente: boolean
}

interface UserProviderProps {
  children: React.ReactNode
}

export const UserContext = createContext({} as UserContextData)

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useLocalState("@user", {
    email: "",
    password: "",
    isCliente: false,
  })
  const [accounts, setAccounts] = useLocalState("@accounts", [] as Account[])

  const SingIn = (email: string, password: string, isCliente: boolean) => {
    const account = accounts.find(
      (acc) => acc.email === email && acc.password === password
    )

    if (account && account.isCliente === isCliente) {
      setUser({ email, password, isCliente })
      notify({ message: "Logado com sucesso!", type: "success" })
      return true
    }

    return false
  }

  const SingOut = () => {
    localStorage.removeItem("@user")
    notify({ message: "Deslogado com sucesso!", type: "success" })
  }

  const createAccount = useCallback(
    (email: string, password: string, isCliente: boolean) => {
      setAccounts((acc) => [...acc, { email, password, isCliente }])
      notify({ message: "Conta criada com sucesso!", type: "success" })
    },
    [setAccounts]
  )

  const isUserLogged = useCallback(() => {
    return user.email !== "" && user.password !== ""
  }, [user])

  return (
    <UserContext.Provider
      value={{ SingIn, SingOut, user, isUserLogged, createAccount }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
