import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'

type ProfileCardProps = {
  value: string | boolean
  label: string
}

const ProfileCard = ({ value, label }: ProfileCardProps) => {
  return (
    <Box>
      <Heading size="xs" textTransform="uppercase">
        {label}
      </Heading>
      <Text pt="2" fontSize="sm">
        {value}
      </Text>
    </Box>
  )
}

export default ProfileCard
