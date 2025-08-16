import { Box } from '@chakra-ui/react'

import ProfileResults from './components/ProfileResults'
import QuestionsResults from './components/QuestionsResults'
import Score from './components/Score'

const CRAResults = () => {
  return (
    <Box maxW={['100%', '100%', '90%']}>
      <ProfileResults />
      <Score />
      <QuestionsResults />
    </Box>
  )
}

export default CRAResults
