import { Button } from '@chakra-ui/react'
import React from 'react'
import { CSVLink } from 'react-csv'

import { AdminTableProps } from './AdminTable'

const ExportCSV = ({ data }: AdminTableProps) => {
  const csvData = [
    [
      'id',
      'msw_name',
      'survey_date',
      'age_group',
      'gender',
      'race',
      'marital_status',
      'education_level',
      'employment_status',
      'main_caregiver',
      'caregiving_length',
      'mSWId',
      'qn1',
      'qn2',
      'qn3',
      'qn4',
      'qn5',
      'qn6',
      'qn7',
      'qn8',
      'qn9',
      'qn10',
      'qn11',
      'qn12',
      'qn13',
      'qn14',
      'qn15',
      'qn16',
      'qn17',
      'qn18',
      'qn19',
      'qn20',
      'qn21',
    ],
    ...data.map(
      ({
        id,
        msw_name,
        survey_date,
        age_group,
        gender,
        race,
        marital_status,
        education_level,
        employment_status,
        main_caregiver,
        caregiving_length,
        qn1,
        qn2,
        qn3,
        qn4,
        qn5,
        qn6,
        qn7,
        qn8,
        qn9,
        qn10,
        qn11,
        qn12,
        qn13,
        qn14,
        qn15,
        qn16,
        qn17,
        qn18,
        qn19,
        qn20,
        qn21,
      }) => [
        id,
        msw_name,
        survey_date,
        age_group,
        gender,
        race,
        marital_status,
        education_level,
        employment_status,
        main_caregiver,
        caregiving_length,
        qn1,
        qn2,
        qn3,
        qn4,
        qn5,
        qn6,
        qn7,
        qn8,
        qn9,
        qn10,
        qn11,
        qn12,
        qn13,
        qn14,
        qn15,
        qn16,
        qn17,
        qn18,
        qn19,
        qn20,
        qn21,
      ],
    ),
  ]

  return (
    <Button variant="ghost" mb="5" mr="3">
      <CSVLink className="downloadbtn" filename="cra.csv" data={csvData}>
        Export Table to CSV
      </CSVLink>
    </Button>
  )
}

export default ExportCSV
