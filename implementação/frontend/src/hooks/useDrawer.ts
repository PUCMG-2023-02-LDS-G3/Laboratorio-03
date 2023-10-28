import { useDisclosure } from "@chakra-ui/react"
import { useRef } from "react"

function useDrawer() {
  const btnRef = useRef()
  return {...useDisclosure(), btnRef}
}

export default useDrawer
