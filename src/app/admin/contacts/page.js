'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import AdminLayout from '../components/AdminLayout.js'
import DataTable from '../components/DataTable.js'
import AdminApiService from '../services/admin-api.js'

export default function ContactsPage() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const result = await AdminApiService.getContactForms({ page: 1, limit: 100 })
      if (result.success) {
        setContacts(result.data)
      }
    } catch (error) {
      console.error('Error fetching contact forms:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      const result = await AdminApiService.updateContactStatus(contactId, newStatus)
      if (result.success) {
        fetchContacts() // Refresh the list
      } else {
        alert('Failed to update contact status: ' + result.message)
      }
    } catch (error) {
      console.error('Error updating contact status:', error)
      alert('An error occurred while updating the contact status')
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
      key: 'subject',
      label: 'Subject',
      render: (value) => (
        <div className="font-medium text-gray-900 max-w-xs truncate">
          {value}
        </div>
      )
    },
    {
      key: 'message',
      label: 'Message',
      render: (value) => (
        <div className="max-w-xs truncate text-gray-500">
          {value}
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => {
        const statusColors = {
          new: 'bg-blue-100 text-blue-800',
          read: 'bg-yellow-100 text-yellow-800',
          replied: 'bg-green-100 text-green-800'
        }
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[value] || 'bg-gray-100 text-gray-800'}`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        )
      }
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (value) => format(new Date(value), 'MMM dd, yyyy')
    }
  ]

  const actions = [
    {
      key: 'read',
      label: 'Mark as Read',
      type: 'view'
    },
    {
      key: 'replied',
      label: 'Mark as Replied',
      type: 'edit'
    }
  ]

  const handleAction = (action, contact) => {
    handleStatusChange(contact.id, action)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Forms</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage incoming contact form submissions
          </p>
        </div>

        <DataTable
          title="All Contact Submissions"
          data={contacts}
          columns={columns}
          actions={actions}
          onAction={handleAction}
          loading={loading}
          searchable={true}
          filterable={true}
          filters={[
            {
              key: 'status',
              label: 'Status',
              options: [
                { value: '', label: 'All Status' },
                { value: 'new', label: 'New' },
                { value: 'read', label: 'Read' },
                { value: 'replied', label: 'Replied' }
              ]
            }
          ]}
        />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      New Messages
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {contacts.filter(c => c.status === 'new').length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Messages
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {contacts.length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Replied
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {contacts.filter(c => c.status === 'replied').length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}