'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import AdminLayout from '../../components/AdminLayout.js'
import DataTable from '../../components/DataTable.js'
import AdminApiService from '../../services/admin-api.js'

export default function VolunteerApplicationsPage() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const result = await AdminApiService.getVolunteerSubmissions({ page: 1, limit: 100 })
      if (result.success) {
        setApplications(result.data)
      }
    } catch (error) {
      console.error('Error fetching volunteer applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (value, item) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-gray-500 text-sm">{item.email}</div>
        </div>
      )
    },
    {
      key: 'phone',
      label: 'Phone'
    },
    {
      key: 'opportunity',
      label: 'Opportunity',
      render: (value) => (
        <div className="font-medium text-gray-900">
          {value?.title || 'N/A'}
        </div>
      )
    },
    {
      key: 'createdAt',
      label: 'Applied On',
      render: (value) => format(new Date(value), 'MMM dd, yyyy')
    }
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Volunteer Applications</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage volunteer applications
          </p>
        </div>

        <DataTable
          title="All Volunteer Applications"
          data={applications}
          columns={columns}
          actions={[]}
          loading={loading}
          searchable={true}
        />
      </div>
    </AdminLayout>
  )
}