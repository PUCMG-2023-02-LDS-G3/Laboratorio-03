import {
  Flex,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react"
import Menu from "../../../components/Menu/Menu"
import { Link } from "react-router-dom"

type CompanyLayoutProps = {
  children: React.ReactNode
}

function CompanyLayout({ children }: CompanyLayoutProps) {
  return (
    <div>
      <Menu title="Menu do parceiro">
        <Flex flexDir={"column"} gap={8}>
          <Link to={"/app/company/advantages"}>
            <ChakraLink>Vantagens</ChakraLink>
          </Link>
          <Link to={"/app/company/profile"}>
            <ChakraLink>Perfil</ChakraLink>
          </Link>
        </Flex>
      </Menu>

      <VStack h={"100vh"} mt={12}>
        {children}
      </VStack>
    </div>
  )
}

export default CompanyLayout
