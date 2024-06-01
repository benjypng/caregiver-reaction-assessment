import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const NavMenu = () => {
  const { status } = useSession();
  const currPath = usePathname();

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
      {status === "unauthenticated" && (
        <NextLink passHref href="/api/auth/signin">
          <Text textDecoration="underline" color="white">
            Sign In
          </Text>
        </NextLink>
      )}
      {status === "authenticated" && (
        <>
          {currPath === "/admin" && (
            <>
              <NextLink passHref href="/">
                <Text textDecoration="underline" color="white">
                  Home
                </Text>
              </NextLink>
              {" | "}
            </>
          )}
          {currPath === "/" && (
            <>
              <NextLink passHref href="/admin">
                <Text textDecoration="underline" color="white">
                  Admin
                </Text>
              </NextLink>
              {" | "}
            </>
          )}
          <NextLink passHref href="/api/auth/signout">
            <Text textDecoration="underline" color="white">
              Sign Out
            </Text>
          </NextLink>
        </>
      )}
    </Flex>
  );
};

export default NavMenu;
