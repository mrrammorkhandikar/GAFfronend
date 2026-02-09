'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Plus, X, FileText, CheckCircle } from 'lucide-react'
import AdminLayout from '../../../components/AdminLayout'
import AdminApiService from '../../../services/admin-api'

export default function CreateVolunteerOpportunityPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isActive: true
  })
  const [requirements, setRequirements] = useState([''])
  const [benefits, setBenefits] = useState([''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleListItemChange = (list, index, value) => {
    if (list === 'requirements') {
      const newRequirements = [...requirements]
      newRequirements[index] = value
      setRequirements(newRequirements)
    } else {
      const newBenefits = [...benefits]
      newBenefits[index] = value
      setBenefits(newBenefits)
    }
  }

  const addListItem = (list) => {
    if (list === 'requirements') {
      setRequirements([...requirements, ''])
    } else {
      setBenefits([...benefits, ''])
    }
  }

  const removeListItem = (list, index) => {
    if (list === 'requirements' && requirements.length > 1) {
      setRequirements(requirements.filter((_, i) => i !== index))
    } else if (benefits.length > 1) {
      setBenefits(benefits.filter((_, i) => i !== index))
    }
  }

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required')
      return false
    }
    if (!formData.description.trim()) {
      setError('Description is required')
      return false
    }
    const validRequirements = requirements.filter(item => item.trim() !== '')
    const validBenefits = benefits.filter(item => item.trim() !== '')
    if (validRequirements.length === 0) {
      setError('At least one requirement is required')
      return false
    }
    if (validBenefits.length === 0) {
      setError('At least one benefit is required')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    setError('')

    try {
      const data = {
        ...formData,
        requirements: JSON.stringify(requirements.filter(item => item.trim() !== '')),
        benefits: JSON.stringify(benefits.filter(item => item.trim() !== ''))
      }

      const result = await AdminApiService.createVolunteerOpportunity(data)
      
      if (result.success) {
        router.push('/admin/volunteers/opportunities')
      } else {
        setError(result.message || 'Failed to create volunteer opportunity')
      }
    } catch (err) {
      setError('An error occurred while creating the volunteer opportunity')
      console.error('Error creating volunteer opportunity:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-4 inline-flex items-center text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create Volunteer Opportunity</h1>
              <p className="mt-1 text-sm text-gray-500">
                Create a new volunteer opportunity for your organization
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    Basic Information
                  </h3>
                </div>
                
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Opportunity Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={formData.title}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter opportunity title"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={6}
                    required
                    value={formData.description}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe the volunteer opportunity in detail"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                    Active Opportunity
                  </label>
                </div>
              </div>

              {/* Requirements and Benefits */}
              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900">Requirements & Benefits</h3>
                </div>

                {/* Requirements Section */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-md font-medium text-gray-900 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-red-600" />
                      Requirements *
                    </h4>
                    <button
                      type="button"
                      onClick={() => addListItem('requirements')}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Requirement
                    </button>
                  </div>
                  <div className="space-y-3">
                    {requirements.map((requirement, index) => (
                      <div key={index} className="flex">
                        <input
                          type="text"
                          value={requirement}
                          onChange={(e) => handleListItemChange('requirements', index, e.target.value)}
                          className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder={`Requirement ${index + 1}`}
                        />
                        {requirements.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeListItem('requirements', index)}
                            className="ml-2 px-3 py-2 text-red-600 hover:text-red-800"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits Section */}
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-md font-medium text-gray-900 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                      Benefits *
                    </h4>
                    <button
                      type="button"
                      onClick={() => addListItem('benefits')}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Benefit
                    </button>
                  </div>
                  <div className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex">
                        <input
                          type="text"
                          value={benefit}
                          onChange={(e) => handleListItemChange('benefits', index, e.target.value)}
                          className="flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder={`Benefit ${index + 1}`}
                        />
                        {benefits.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeListItem('benefits', index)}
                            className="ml-2 px-3 py-2 text-red-600 hover:text-red-800"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Opportunity...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Opportunity
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}