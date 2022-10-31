import { chakra, Flex } from "@chakra-ui/react";
import React from "react";

interface ITopbarProps {}

export const Topbar: React.FC<ITopbarProps> = ({}) => {
    return (
        <Flex bg="gray.800" borderBottom={"1px solid"} borderColor="gray.700" h="70px" w="100%">
            <chakra.div>hello</chakra.div>
        </Flex>
    );
};

