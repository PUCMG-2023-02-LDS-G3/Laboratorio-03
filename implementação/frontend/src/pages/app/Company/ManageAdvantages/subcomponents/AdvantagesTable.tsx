import {
    Button,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react"
import { LuGripVertical, LuPencil, LuTrash } from "react-icons/lu"

function AdvantagesTable({ advantages, handleEditAdvantages, handleDeleteAdvantage }: { advantages: any, handleEditAdvantages: any, handleDeleteAdvantage: any }) {
    return (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th isNumeric>Preço</Th>
              </Tr>
            </Thead>
            <Tbody>
              {advantages?.map((advantage: any) => (
                <Tr key={advantage.id}>
                  <Td>{advantage.name}</Td>
                  <Td isNumeric>{advantage.price}</Td>
                  <Td>
                    <Popover matchWidth>
                      <PopoverTrigger>
                        <Button bgColor={"transparent"} color={"orange.500"}>
                          <LuGripVertical />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <PopoverBody>
                          <Button
                            bgColor={"transparent"}
                            color={"orange.500"}
                            display={"flex"}
                            onClick={() => handleEditAdvantages(advantage.id)}
                            gap={4}>
                            <LuPencil size="20px" />
                            <Text>Editar</Text>
                          </Button>
                          <Button
                            bgColor={"transparent"}
                            color={"orange.500"}
                            display={"flex"}
                            onClick={() => handleDeleteAdvantage(advantage.id)}
                            gap={4}>
                            <LuTrash size="20px" />
                            <Text>Deletar</Text>
                          </Button>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
    )
}

export default AdvantagesTable