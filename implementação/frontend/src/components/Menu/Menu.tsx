import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
} from "@chakra-ui/react"
import useDrawer from "../../hooks/useDrawer"
import { LuMenu } from "react-icons/lu"

type MenuProps = {
  title: string
  children: React.ReactNode
}

function Menu({ title, children }: MenuProps) {
  const { isOpen, onClose, onOpen } = useDrawer()

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
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Menu
