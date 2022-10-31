import { chakra, Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { FiHome } from "react-icons/fi";

interface ISidebarItemProps {
    children: React.ReactNode;
    isActive?: boolean;
    icon?: React.ReactNode;
}

const SidebarItem: React.FC<ISidebarItemProps> = ({
    isActive = false,
    icon,
    children,
}) => {
    return (
        <Flex
            alignItems={"center"}
            fontWeight="500"
            color="whiteAlpha.900"
            _hover={{
                bg: "gray.700",
            }}
            rounded={"md"}
            py={3}
            cursor="pointer"
        >
            {icon && (
                <chakra.span fontSize="20px" mx={3}>
                    {icon}
                </chakra.span>
            )}
            <chakra.div>{children}</chakra.div>
        </Flex>
    );
};

export default SidebarItem;
