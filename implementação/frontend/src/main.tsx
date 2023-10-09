import React from "react"
import ReactDOM from "react-dom/client"
import Routes from "./Routes.js"

import { ChakraProvider } from "@chakra-ui/react"
import UserProvider from "./provider/UserProvider.js"
import ContractProvider from "./provider/ContractProvider.js"
import NotifyProvider from "./provider/NotifyProvider.js"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <UserProvider>
        <ContractProvider>
          <>
            <NotifyProvider />
            <Routes />
          </>
        </ContractProvider>
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>
)
