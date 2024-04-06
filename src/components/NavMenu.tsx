import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useSession } from "next-auth/react";

const NavMenu = () => {
  const { data: session, status } = useSession();
  console.log(status);

  return (
    <Flex
      pos="fixed"
      bottom="0"
      w="100%"
      fontSize="sm"
      bgColor="telegram.500"
      color="white"
      mt="0"
      p="3"
    >
      <NextLink passHref href="/api/auth/signin">
        <Text textDecoration="underline" color="white">
          Sign In
        </Text>
      </NextLink>
      {status === "authenticated" && (
        <>
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
        </>
      )}
    </Flex>
  );
};

export default NavMenu;
