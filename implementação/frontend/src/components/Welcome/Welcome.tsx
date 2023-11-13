import { Box, Flex, Text, VStack } from "@chakra-ui/react"
import useUser from "../../hooks/useUser"
import { UserType } from "../../Utils/enum/UserType"

function Welcome() {
  const { user } = useUser()

  return (
    <VStack>
      <Flex align={"center"} gap={2}>
        <Text fontWeight={"bold"} fontSize={["xl", "3xl"]}>
          Seja bemvindo ao{" "}
        </Text>
        <Text color={"orange"} fontWeight={"bold"} fontSize={"2xl"}>
          TrocaCoins
        </Text>
      </Flex>

      {user.type === UserType.STUDENT || user.type === UserType.TEACHER ? (
        <Box>
          <Text fontSize={"xl"}>Seu saldo é de:</Text>
          <Text fontSize={"2xl"}>{user?.coins} moedas</Text>
        </Box>
      ) : (
        <Box>
          <Flex align={"center"} gap={2}>
            <Text fontSize={"xl"}>Você esta logado como</Text>
            {user.type === UserType.ADMIN ? (
              <Text fontSize={"xl"}>Admin</Text>
            ) : (
              <Text fontSize={"xl"}>Parceiro</Text>
            )}{" "}
          </Flex>
        </Box>
      )}
    </VStack>
  )
}

export default Welcome
