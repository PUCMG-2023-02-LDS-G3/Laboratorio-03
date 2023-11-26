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

function SchoolTable({ data, handleEditSchool, handleDeleteSchool }: { data: any, handleEditSchool: any, handleDeleteSchool: any }) {
    return (
        <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nome</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((school: any) => (
              <Tr key={school.id}>
                <Td>{school.name}</Td>
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
                          onClick={() => handleEditSchool(school.id)}
                          display={"flex"}
                          gap={4}>
                          <LuPencil size="20px" />
                          <Text>Editar</Text>
                        </Button>
                        <Button
                          bgColor={"transparent"}
                          color={"orange.500"}
                          onClick={() => handleDeleteSchool(school.id)}
                          display={"flex"}
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

export default SchoolTable