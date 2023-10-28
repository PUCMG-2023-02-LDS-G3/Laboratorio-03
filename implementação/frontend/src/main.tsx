import React from "react"
import ReactDOM from "react-dom/client"
import Routes from "./Routes.js"

import { ChakraProvider } from "@chakra-ui/react"
import NotifyProvider from "./provider/NotifyProvider.js"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import UserProvider from "./provider/UserProvider.js"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <>
            <NotifyProvider />
            <Routes />
          </>
        </UserProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
)
