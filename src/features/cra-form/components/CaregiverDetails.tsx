import { SimpleGrid, Text } from '@chakra-ui/react'
import {
  age_group,
  caregiving_length,
  education_level,
  employment_status,
  gender,
  marital_status,
  race,
} from '@prisma/client'

import { dropdownHelper } from '@/libs/dropdown-helpers'

import CaregiverSelect from './CaregiverSelectComponent'

const CaregiverDetails = () => {
  return (
    <>
      <Text size="20" textStyle="h5" mb="5">
        Caregiver Details
      </Text>
      <SimpleGrid columns={[1, null, 2]} gap={3} w="full" mb="10">
        <CaregiverSelect
          name="age_group"
          description={'Age Group'}
          items={dropdownHelper('age_group', age_group)}
        />
        <CaregiverSelect
          name="gender"
          description={'Gender'}
          items={dropdownHelper('gender', gender)}
        />
        <CaregiverSelect
          name="race"
          description={'Ethnicity'}
          items={dropdownHelper('race', race)}
        />
        <CaregiverSelect
          name="marital_status"
          description={'Marital Status'}
          items={dropdownHelper('marital_status', marital_status)}
        />
        <CaregiverSelect
          name="education_level"
          description={'Education Level'}
          items={dropdownHelper('education_level', education_level)}
        />
        <CaregiverSelect
          name="employment_status"
          description={'Employment Status'}
          items={dropdownHelper('employment_status', employment_status)}
        />
        <CaregiverSelect
          name="caregiving_length"
          description={'Caregiving Length'}
          items={dropdownHelper('caregiving_length', caregiving_length)}
        />
        <CaregiverSelect
          name="main_caregiver"
          description={'Are you the Main Caregiver?'}
          items={[
            {
              value: 'true',
              label: 'Yes',
            },
            {
              value: 'false',
              label: 'No',
            },
          ]}
        />
      </SimpleGrid>
    </>
  )
}

export default CaregiverDetails
