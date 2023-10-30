import {
  Flex,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react"
import Menu from "../../../components/Menu/Menu"
import { Link } from "react-router-dom"

type AdminLayoutProps = {
  children: React.ReactNode
}

function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div>
      <Menu title="Menu do admin">
        <Flex flexDir={"column"} gap={8}>
          <Link to={"/app/admin/school"}>
            <ChakraLink>Instituilções de ensino</ChakraLink>
          </Link>
          <Link to={"/app/admin/teacher"}>
            <ChakraLink>Professores</ChakraLink>
          </Link>
        </Flex>
      </Menu>

      <VStack h={"100vh"} mt={12}>
        {children}
      </VStack>
    </div>
  )
}

export default AdminLayout
