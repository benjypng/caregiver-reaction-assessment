import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Citations = () => {
  return (
    <Box mt="10">
      <Text fontWeight="bold" fontSize="sm">
        Citations
      </Text>
      <Text fontSize="sm">
        Malhotra R, Chan A, Malhotra C, Østbye T. Validity and reliability of
        the Caregiver Reaction Assessment scale among primary informal
        caregivers for older persons in Singapore. Aging & Mental Health. 2012;
        16(8): 1004-15.
        <br />
        Given CW, Given B, Stommel M, Collins C, King S, Franklin S. The
        caregiver reaction assessment (CRA) for caregivers to persons with
        chronic physical and mental impairments. Research in Nursing & Health.
        1992; 15: 271–283.
      </Text>
    </Box>
  );
};

export default Citations;
