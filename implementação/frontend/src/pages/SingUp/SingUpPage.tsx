import {
  Box,
  Button,
  Center,
  HStack,
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
import { useState } from "react"
import notify from "../../hooks/useNotify"
import useGetSchools from "../../hooks/useQuery/useGetSchools"

const schema = yup.object().shape({
  id: yup.string().required("Obrigatório"),
  email: yup.string().email("Email inválido").required("Obrigatório"),
  school: yup.string().required("Obrigatório"),
  name: yup.string().required("Obrigatório").min(3, "Nome muito curto"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "Senha deve ter no mínimo 6 dígitos"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas precisam ser iguais"),
})

function SingUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const navigate = useNavigate()
  const [userType, setUserType] = useState<"estudante" | "parceiro">(
    "estudante"
  )

  const { data: schools, isLoading } = useGetSchools()

  const onSubmit = async (data: any) => {
    try {
      switch (userType) {
        case "estudante":
          await api.post("/student/register", {
            email: data.email,
            password: data.password,
            name: data.name,
            cpf: data.id,
            schoolId: data.school,
            rg: "{{RG}}",
            address: "{{ADDRESS}}",
            major: "{{MAJOR}}",
          })
          notify({ message: "Conta criada com sucesso" })
          break
        case "parceiro":
          await api.post("/company/register", {
            email: data.email,
            password: data.password,
            name: data.name,
            cnpj: data.id,
          })
          notify({ message: "Conta criada com sucesso" })
          break
        default:
          notify({ message: "Tipo de usuário inválido", type: "error" })
          break
      }
      navigate("/")
    } catch (error) {
      notify({ message: "Erro ao criar conta", type: "error" })
      console.log(error)
    }
  }

  const handleChangeUserType = (type: "estudante" | "parceiro") => {
    setUserType(type)
  }

  return (
    <>
      <Helmet>
        <title>Criar conta | TrocaCoins</title>
      </Helmet>
      <Center h={"100vh"}>
        <VStack gap={"8"}>
          <Heading color="orange.500">TrocaCoins</Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack gap={"8"}>
              {userType === "estudante" ? (
                <>
                  <VStack align={"start"}>
                    <Box>
                      <Text>CPF</Text>
                      <Input {...register("id")} />
                    </Box>
                    {errors.id && (
                      <Text color={"red.600"}>{errors.id.message}</Text>
                    )}
                  </VStack>
                  <VStack align={"start"}>
                    <Box>
                      <Text>Instituição de ensino</Text>
                      <Select {...register("school")}>
                        {isLoading ? (
                          <option>Carregando...</option>
                        ) : (
                          <>
                            {schools?.map((school) => (
                              <option key={school.id} value={school.id}>
                                {school.name}
                              </option>
                            ))}
                          </>
                        )}
                      </Select>
                    </Box>
                    {errors.id && (
                      <Text color={"red.600"}>{errors.id.message}</Text>
                    )}
                  </VStack>
                </>
              ) : (
                <VStack align={"start"}>
                  <Box>
                    <Text>CNPJ</Text>
                    <Input {...register("id")} />
                  </Box>
                  {errors.id && (
                    <Text color={"red.600"}>{errors.id.message}</Text>
                  )}
                </VStack>
              )}

              <VStack align={"start"}>
                <Box>
                  <Text>Nome</Text>
                  <Input {...register("name")} />
                </Box>
                {errors.name && (
                  <Text color={"red.600"}>{errors.name.message}</Text>
                )}
              </VStack>

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

              <VStack align={"start"}>
                <Box>
                  <Text>Confirmar senha</Text>
                  <Input {...register("confirmPassword")} />
                </Box>
                {errors.confirmPassword && (
                  <Text color={"red.600"}>
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </VStack>

              <Box>
                <Text>Entrar como</Text>
                <HStack gap={"4"}>
                  {["estudante", "parceiro"].map((type) => (
                    <Button
                      key={type}
                      onClick={() => handleChangeUserType(type as any)}
                      colorScheme={userType === type ? "teal" : "gray"}>
                      {String(type).toLocaleUpperCase()}
                    </Button>
                  ))}
                </HStack>
              </Box>

              <Button type="submit" colorScheme="orange">
                Criar conta
              </Button>
            </VStack>
          </form>

          <Text>
            Já possui uma conta?
            <Link to={"/"}>Entre com sua conta</Link>
          </Text>
        </VStack>
      </Center>
    </>
  )
}

export default SingUpPage
