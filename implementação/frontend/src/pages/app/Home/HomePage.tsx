import { Box, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import * as yup from "yup"

function HomePage() {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Home | TrocaCoins </title>
      </Helmet>

      <Box>
        email: <Text></Text>
      </Box>
    </>
  )
}

export default HomePage
