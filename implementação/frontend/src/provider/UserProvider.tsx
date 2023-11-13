import { createContext } from "react"
import { useLocalState } from "../Utils/useLocalStorage"

export type UserSchema = {
  email: string
  password: string
  type: string
  id: string
  schoolId?: string
  coins?: number
}

interface UserContextData {
  user: UserSchema
  SingIn: (user: UserSchema) => void
  updateUser: (user: UserSchema) => void
  SingOut: () => void
  isUserLogged: () => boolean
}

interface UserProviderProps {
  children: React.ReactNode
}

export const UserContext = createContext({} as UserContextData)

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useLocalState<UserSchema>(
    "TrocaCoins@user",
    {} as UserSchema
  )

  const SingIn = (user: UserSchema) => {
    setUser(user)
  }

  const SingOut = () => {
    setUser((u) => {
      return { ...u, email: "", password: "" }
    })
  }

  const updateUser = (user: UserSchema) => {
    setUser(user)
  }

  const isUserLogged = () => user.email !== "" && user.password !== ""

  return (
    <UserContext.Provider value={{ SingIn, SingOut, user, isUserLogged, updateUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
