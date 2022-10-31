import { Avatar, chakra, Flex, Stack } from "@chakra-ui/react";
import { FiHome } from "react-icons/fi";

import { FC } from "../../types";
import SidebarItem from "./SidebarItem";

export const Sidebar = () => {
    return (
        <Flex bg="gray.800" px={4} py={8} flexDir="column" borderRight={"1px solid"} borderColor="gray.700">
            <chakra.div my={8}>
                <chakra.p fontSize={"20px"} fontWeight="bold"  rounded={"lg"}>
                    Our Task <chakra.span color="brand.400">Manager</chakra.span>
                </chakra.p>
            </chakra.div>
            <SidebarItem icon={<FiHome />}>Dashboard</SidebarItem>
            <Stack mt={8}>
                <SidebarSectionTitle>TASKS</SidebarSectionTitle>
                <SidebarItem
                    icon={
                        <chakra.div
                            boxSize="10px"
                            bg="red.200"
                            rounded={"full"}
                        />
                    }
                >
                    To do
                </SidebarItem>
                <SidebarItem
                    icon={
                        <chakra.div
                            boxSize="10px"
                            bg="orange.200"
                            rounded={"full"}
                        />
                    }
                >
                    Pending
                </SidebarItem>
                <SidebarItem
                    icon={
                        <chakra.div
                            boxSize="10px"
                            bg="green.200"
                            rounded={"full"}
                        />
                    }
                >
                    Done
                </SidebarItem>
            </Stack>
            <Stack mt={8}>
                <SidebarSectionTitle>USERS</SidebarSectionTitle>
                <SidebarItem icon={<Avatar name="tomas" size={"sm"} />}>
                    Tomas
                </SidebarItem>
                <SidebarItem icon={<Avatar name="Carlos" size={"sm"} />}>
                    Carlos
                </SidebarItem>
            </Stack>
        </Flex>
    );
};
const SidebarSectionTitle: FC = ({ children }) => {
    return (
        <chakra.p fontWeight="semibold" color="gray.300">
            {children}
        </chakra.p>
    );
};
