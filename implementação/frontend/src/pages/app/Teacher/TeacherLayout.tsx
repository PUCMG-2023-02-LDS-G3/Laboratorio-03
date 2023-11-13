import {
  Flex,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react"
import Menu from "../../../components/Menu/Menu"
import { Link } from "react-router-dom"

type TeacherLayoutProps = {
  children: React.ReactNode
}

function TeacherLayout({ children }: TeacherLayoutProps) {
  return (
    <div>
      <Menu title="Menu do parceiro">
        <Flex flexDir={"column"} gap={8}>
          <Link to={"/app/teacher/"}>
            <ChakraLink>Saldo da conta</ChakraLink>
          </Link>
          <Link to={"/app/teacher/send"}>
            <ChakraLink>Enviar moeda</ChakraLink>
          </Link>
          <Link to={"/app/teacher/history"}>
            <ChakraLink>Historia</ChakraLink>
          </Link>
        </Flex>
      </Menu>

      <VStack h={"100vh"} mt={12}>
        {children}
      </VStack>
    </div>
  )
}

export default TeacherLayout
