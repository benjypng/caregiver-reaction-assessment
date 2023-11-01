import { ProfileContext } from "@/pages/cra-results/[id]";
import {
  Box,
  Text,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import React, { useContext } from "react";

const Score = () => {
  const profile = useContext(ProfileContext);
  if (!profile) return null;

  return (
    <Card mb="10">
      <CardHeader>
        <Heading size="md">Client Report</Heading>
      </CardHeader>

      <CardBody display={{ md: "flex" }}>
        <Box p="2" w="100%" display="flex" flexDir="column">
          <Heading size="xs" textTransform="uppercase">
            Disturbed Schedule & Poor Health
          </Heading>
          <Text pt="2" fontSize="sm">
            {profile.poor_health.toFixed(2)}
          </Text>
        </Box>
        <Box p="2" w="100%" display="flex" flexDir="column">
          <Heading size="xs" textTransform="uppercase">
            Lack of Finances
          </Heading>
          <Spacer />
          <Text pt="2" fontSize="sm">
            {profile.lack_of_finances.toFixed(2)}
          </Text>
        </Box>
        <Box p="2" w="100%" display="flex" flexDir="column">
          <Heading size="xs" textTransform="uppercase">
            Lack of Family Support
          </Heading>
          <Text pt="2" fontSize="sm">
            {profile.lack_of_family_support.toFixed(2)}
          </Text>
        </Box>
        <Box p="2" w="100%" display="flex" flexDir="column">
          <Heading size="xs" textTransform="uppercase">
            Esteem
          </Heading>
          <Text pt="2" fontSize="sm">
            {profile.esteem.toFixed(2)}
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default Score;
