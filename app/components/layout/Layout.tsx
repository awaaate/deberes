import { chakra, Flex } from "@chakra-ui/react";
import React from "react";

import Sidebar from "../sidebar";
import Topbar from "../topbar";
interface LayoutProps {
    children: React.ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Flex bg="gray.900" minH="100vh" color="white" h="100%">
            <Sidebar />

            <chakra.div w="100%">
                <Topbar />
                {children}
            </chakra.div>
        </Flex>
    );
};
