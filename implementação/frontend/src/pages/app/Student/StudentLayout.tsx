import { Flex, VStack, Link as ChakraLink } from "@chakra-ui/react"
import Menu from "../../../components/Menu/Menu"
import { Link } from "react-router-dom"

type StudentLayoutProps = {
  children: React.ReactNode
}

function StudentLayout({ children }: StudentLayoutProps) {
  return (
    <div>
      <Menu title="Menu do estudante">
        <Flex flexDir={"column"} gap={8}>
          <Link to={"/app/student/"}>
            <ChakraLink>Saldo da conta</ChakraLink>
          </Link>
          <Link to={"/app/student/exchange"}>
            <ChakraLink>Trocar moedas</ChakraLink>
          </Link>
          <Link to={"/app/student/profile"}>
            <ChakraLink>Perfil</ChakraLink>
          </Link>
          <Link to={"/app/student/history"}>
            <ChakraLink>Historia</ChakraLink>
          </Link>
          <Link to={"/app/student/advantages"}>
            <ChakraLink>Vantagens</ChakraLink>
          </Link>
        </Flex>
      </Menu>

      <VStack h={"100vh"} mt={12}>
        {children}
      </VStack>
    </div>
  )
}

export default StudentLayout
