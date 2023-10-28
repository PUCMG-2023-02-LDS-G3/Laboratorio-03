import { createContext } from "react"
import { useLocalState } from "../Utils/useLocalStorage"

export type UserSchema = {
  email: string
  password: string
  type: string
}

interface UserContextData {
  user: UserSchema
  SingIn: (user: UserSchema) => void
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

  const isUserLogged = () => user.email !== "" && user.password !== ""

  return (
    <UserContext.Provider value={{ SingIn, SingOut, user, isUserLogged }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
