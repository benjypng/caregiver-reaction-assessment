import {
  Card,
  CardBody,
  CardHeader,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { useContext } from 'react'

import { handleAge } from '@/libs/table-helpers/handle-age'
import { handleCapitalise } from '@/libs/table-helpers/handle-capitalise'
import { handleCaregivingLength } from '@/libs/table-helpers/handle-caregiving-length'
import { handleMainCaregiver } from '@/libs/table-helpers/handle-main-caregiver'
import { ProfileContext } from '@/pages/cra-results/[id]'

import ProfileCard from './ProfileCard'

const ProfileResults = () => {
  const profile = useContext(ProfileContext)
  if (!profile) return null
  const msw_name = profile.msw_name
  if (!msw_name) return null

  return (
    <Card mb="10">
      <CardHeader display="flex" justifyContent="space-between">
        <Text textStyle="h4">Profile: {profile.id}</Text>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <SimpleGrid columns={2} gap="2">
            <ProfileCard value={msw_name} label={'MSW Name'} />
            <ProfileCard
              value={format(new Date(profile.survey_date), 'dd-MM-yyyy')}
              label={'Survey Date'}
            />
          </SimpleGrid>
          <SimpleGrid columns={2}>
            <ProfileCard
              value={handleAge(profile.age_group)}
              label={'Age Group'}
            />
            <ProfileCard
              value={handleCapitalise(profile.gender)}
              label={'Gender'}
            />
          </SimpleGrid>
          <SimpleGrid columns={2} gap="2">
            <ProfileCard
              value={handleCapitalise(profile.race)}
              label={'Ethnicity'}
            />
            <ProfileCard
              value={handleCapitalise(profile.marital_status)}
              label={'Marital Status'}
            />
          </SimpleGrid>
          <SimpleGrid columns={2} gap="2">
            <ProfileCard
              value={handleCapitalise(profile.education_level)}
              label={'Education Level'}
            />
            <ProfileCard
              value={handleCapitalise(profile.employment_status)}
              label={'Employment Status'}
            />
          </SimpleGrid>
          <SimpleGrid columns={2} gap="2">
            <ProfileCard
              value={handleMainCaregiver(profile.main_caregiver)}
              label={'Are you the main caregiver?'}
            />
            <ProfileCard
              value={handleCaregivingLength(profile.caregiving_length)}
              label={'Length of Caregiving'}
            />
          </SimpleGrid>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default ProfileResults
