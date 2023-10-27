import { SimpleGrid, Text } from "@chakra-ui/react";
import {
  age_group,
  gender,
  race,
  marital_status,
  education_level,
  employment_status,
  caregiving_length,
} from "@prisma/client";
import CaregiverSelect from "./CaregiverSelectComponent";

const CaregiverDetails = () => {
  return (
    <>
      <Text size="20" textStyle="h5" mb="5">
        Caregiver Details
      </Text>
      <SimpleGrid columns={[1, null, 2]} gap={3} w="full" mb="10">
        <CaregiverSelect
          name="age_group"
          description={"Age Group"}
          field={age_group}
        />
        <CaregiverSelect name="gender" description={"Gender"} field={gender} />
        <CaregiverSelect name="race" description={"Ethnicity"} field={race} />
        <CaregiverSelect
          name="marital_status"
          description={"Marital Status"}
          field={marital_status}
        />
        <CaregiverSelect
          name="education_level"
          description={"Education Level"}
          field={education_level}
        />
        <CaregiverSelect
          name="employment_status"
          description={"Employment Status"}
          field={employment_status}
        />
        <CaregiverSelect
          name="caregiving_length"
          description={"Caregiving Length"}
          field={caregiving_length}
        />
        <CaregiverSelect
          name="main_caregiver"
          description={"Are you the Main Caregiver?"}
        />
      </SimpleGrid>
    </>
  );
};

export default CaregiverDetails;
