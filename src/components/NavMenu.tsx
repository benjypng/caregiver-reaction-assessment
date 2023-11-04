import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const NavMenu = () => {
  return (
    <Flex fontSize="sm" bgColor="telegram.500" color="white" mt="0" p="3">
      Links:{" "}
      <NextLink passHref href="/api/auth/signin">
        <Text textDecoration="underline" color="white">
          Sign In
        </Text>
      </NextLink>
      {" | "}
      <NextLink passHref href="/api/auth/signout">
        <Text textDecoration="underline" color="white">
          Sign Out
        </Text>
      </NextLink>
      {" | "}
      <NextLink passHref href="/admin">
        <Text textDecoration="underline" color="white">
          Admin (must be signed in)
        </Text>
      </NextLink>
    </Flex>
  );
};

export default NavMenu;
