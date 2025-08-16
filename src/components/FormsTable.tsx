import React from 'react'

import AdminTable from '@/features/admin/components/AdminTable'
import ExportCSV from '@/features/admin/components/ExportCSV'
import { trpc } from '@/utils/trpc-hooks'

const FormsTable = () => {
  const res = trpc.forms.getAllForms.useQuery()
  const data = res.data?.map((d) => ({
    ...d,
    msw_name: d.User?.name,
    survey_date: new Date(d.survey_date),
  }))

  return (
    <>
      {data && <ExportCSV data={data} />}
      {data && <AdminTable data={data} />}
    </>
  )
}

export default FormsTable
