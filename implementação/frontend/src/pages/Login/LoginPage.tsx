import {
  Box,
  Button,
  Center,
  Heading,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import Helmet from "react-helmet"
import { useForm } from "react-hook-form"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import api from "../../Utils/api"
import notify from "../../hooks/useNotify"
import useUser from "../../hooks/useUser"
import { UserType } from "../../Utils/enum/UserType"
import { UserSchema } from "../../provider/UserProvider"

const schema = yup.object().shape({
  email: yup.string().required("Obrigatório"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "Senha deve ter no mínimo 6 dígitos"),
  type: yup.string().required("Obrigatório"),
})

type LoginSchema = {
  email: string
  password: string
  type: string
}

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const navigateTo = useNavigate()
  const { SingIn } = useUser()

  const onSubmit = async ({ email, password, type }: LoginSchema) => {
    const newUser: UserSchema = {
      email,
      password,
      type: "",
    }
    try {
      switch (type) {
        case "student":
          await api.post("/student/login", { email, password })
          newUser.type = UserType.STUDENT
          SingIn(newUser)
          notify({ message: "Login do aluno realizado com sucesso" })
          navigateTo("/app/student/home")

          break
        case "company":
          await api.post("/company/login", { email, password })
          SingIn({ email, password, type: UserType.COMPANY })
          notify({ message: "Login da parceira realizado com sucesso" })
          navigateTo("/app/company/home")

          break
        case "teacher":
          await api.post("/teacher/login", { email, password })
          SingIn({ email, password, type: UserType.TEACHER })
          notify({ message: "Login do professor realizado com sucesso" })
          navigateTo("/app/teacher/home")
          break
        case "admin":
          await api.post("/admin/login", { email, password })
          SingIn({ email, password, type: UserType.ADMIN })
          notify({ message: "Login do administrador realizado com sucesso" })
          navigateTo("/app/admin")
          break
        default:
          alert("Tipo de usuário inválido")
          break
      }
    } catch (error) {
      console.error(error)
      notify({ message: "Erro ao fazer login", type: "error" })
    }
  }

  return (
    <>
      <Helmet>
        <title>Fazer login | TrocaCoins</title>
      </Helmet>
      <Center h={"100vh"}>
        <VStack gap={"8"}>
          <Heading color="orange.500">TrocaCoins</Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={"8"}>
              <VStack align={"start"}>
                <Box>
                  <Text>Email</Text>
                  <Input {...register("email")} />
                </Box>
                {errors.email && (
                  <Text color={"red.600"}>{errors.email.message}</Text>
                )}
              </VStack>

              <VStack align={"start"}>
                <Box>
                  <Text>Senha</Text>
                  <Input {...register("password")} />
                </Box>
                {errors.password && (
                  <Text color={"red.600"}>{errors.password.message}</Text>
                )}
              </VStack>

              <Box textAlign={"center"}>
                <Text>Entrar como</Text>
                <Select {...register("type")}>
                  <option value="student">Estudante</option>
                  <option value="company">Parceiro</option>
                  <option value="teacher">Professor</option>
                  <option value="admin">Admin</option>
                </Select>
              </Box>

              <Button type="submit" colorScheme="orange">
                Entrar
              </Button>
            </VStack>
          </form>

          <Text>
            Não possui uma conta?
            <Link to={"/singup"}>Crie uma conta</Link>
          </Text>
        </VStack>
      </Center>
    </>
  )
}

export default LoginPage
