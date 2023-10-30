import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
} from "@chakra-ui/react"
import useDrawer from "../../hooks/useDrawer"
import { LuMenu } from "react-icons/lu"
import { useNavigate } from "react-router-dom"

type MenuProps = {
  title: string
  children: React.ReactNode
}

function Menu({ title, children }: MenuProps) {
  const { isOpen, onClose, onOpen } = useDrawer()

  const navigateTo = useNavigate()

  const handleLoggout = () => {
    navigateTo("/")
  }

  return (
    <>
      <Flex
        bg={"orange.400"}
        padding={4}
        align={"center"}
        justifyContent={"space-between"}
        paddingX={10}>
        <Button colorScheme="orange" onClick={onOpen}>
          <LuMenu size={"25px"} />
        </Button>

        <Text color={"white"} fontWeight={"bold"} fontSize={"2xl"}>
          TrocaCoins
        </Text>
      </Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{title}</DrawerHeader>

          <DrawerBody>{children}</DrawerBody>
          <DrawerFooter>
            <Button onClick={handleLoggout} colorScheme="red" w="100%">
              Sair
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Menu
