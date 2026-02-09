// Site API Service for frontend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

class SiteApiService {
  // Generic API call without authentication
  static async apiCall(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    }

    // Debug: Log the full URL being called
    const fullUrl = `${API_BASE_URL}${endpoint}`;
    console.log('API Call URL:', fullUrl);

    try {
      const response = await fetch(fullUrl, {
        ...options,
        headers
      })

      // Check if response is OK
      if (!response.ok) {
        // Handle different HTTP status codes
        return {
          success: false,
          message: `HTTP error! status: ${response.status}`,
          status: response.status
        };
      }
      
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text(); // Read response as text if not JSON
        console.error('Non-JSON response received:', text);
        return {
          success: false,
          message: 'Server returned non-JSON response',
          status: response.status
        };
      }
      
      const data = await response.json();
      
      // If the backend response already follows the { success, data } pattern, return it directly
      if (data && typeof data === 'object' && 'success' in data) {
        return data;
      }
                
      // Return successful response with data
      return {
        success: true,
        data: data
      };
    } catch (error) {
      console.error('API call error:', error)

      // Provide more specific error messages
      let message = 'Network error occurred'
      if (error.message.includes('Failed to fetch')) {
        message = 'Unable to connect to server. Please check if the backend is running.'
      } else if (error.message.includes('non-JSON')) {
        message = 'Server returned invalid response format'
      } else if (error.message.includes('HTTP error')) {
        message = `Server error: ${error.message}`
      }

      return {
        success: false,
        message
      }
    }
  }

  // Public Campaigns
  static async getActiveCampaigns(limit = 4) {
    return this.apiCall('/campaigns/public')
  }

  static async getAllCampaigns() {
    return this.apiCall('/campaigns')
  }

  static async getCampaign(id) {
    return this.apiCall(`/campaigns/${id}`)
  }

  // Public Events
  static async getUpcomingEvents(limit = 4) {
    return this.apiCall('/events/public')
  }

  static async getAllEvents() {
    return this.apiCall('/events')
  }

  static async getEvent(id) {
    return this.apiCall(`/events/${id}`)
  }

  // Team Members
  static async getActiveTeamMembers(limit = 4) {
    return this.apiCall('/team/public')
  }

  static async getAllTeamMembers() {
    return this.apiCall('/team')
  }

  static async getTeamMember(id) {
    return this.apiCall(`/team/${id}`)
  }

  // Careers
  static async getActiveCareers(limit = 4) {
    return this.apiCall('/careers/public')
  }

  static async getAllCareers() {
    return this.apiCall('/careers')
  }

  static async getCareer(id) {
    return this.apiCall(`/careers/${id}`)
  }

  // Volunteer Opportunities
  static async getActiveVolunteerOpportunities(limit = 4) {
    return this.apiCall('/volunteer-opportunities/public')
  }

  static async getAllVolunteerOpportunities() {
    return this.apiCall('/volunteer-opportunities')
  }

  // Contact Messages
  static async getContactMessages(limit = 4) {
    return this.apiCall('/contact/public')
  }

  // Volunteer Submissions
  static async getVolunteerSubmissions(limit = 4) {
    return this.apiCall('/volunteer-submissions/public')
  }
}

export default SiteApiService
