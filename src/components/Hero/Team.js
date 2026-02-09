'use client';

import React, { useState, useEffect } from 'react';
import TeamCard from './TeamCard';
import SiteApiService from '@/app/services/site-api';

const playfairStyle = { fontFamily: "'Playfair Display', serif" };

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllMembers, setShowAllMembers] = useState(false);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await SiteApiService.getActiveTeamMembers(3); // Fetch 3 team members for the homepage
        console.log('Team API Response:', response); // Debug log
        
        console.log('=== Checking response structure ===');
        console.log('Response:', response);
        console.log('Response.success:', response.success);
        console.log('Response.data:', response.data);
        console.log('Response.data type:', typeof response.data);
        
        // Check if response.data has the nested structure
        const teamData = response.data && response.data.success && response.data.data ? response.data.data : response.data;
        console.log('Team data (extracted):', teamData);
        console.log('Is team data an array:', Array.isArray(teamData));
        
        if (response.success && teamData) {
          console.log('=== Processing team members ===');
          console.log('Raw API Data:', teamData);
          console.log('Is Array:', Array.isArray(teamData));
          
          // Transform the team member data to match the expected format for TeamCard
          let transformedMembers = [];
          
          if (Array.isArray(teamData)) {
            console.log('=== Starting map function ===');
            transformedMembers = teamData.map((member, index) => {
              console.log(`=== Processing team member ${index} ===`);
              console.log('Team member data:', member);
              
              const transformedMember = {
                name: member.name,
                title: member.position,
                description: member.bio?.substring(0, 100) + '...' || 'Team member bio coming soon...',
                image: member.imageUrl || '/images/team/default-avatar.jpg',
                social: ['facebook', 'twitter', 'instagram'],
              };
              
              console.log('Transformed team member:', transformedMember);
              return transformedMember;
            });
            console.log('=== Map function completed ===');
          } else {
            console.log('=== teamData is not an array ===');
            console.log('teamData:', teamData);
          }
          
          console.log('Final transformed team members:', transformedMembers);
          setTeamMembers(transformedMembers);
        } else {
          console.error('Failed to fetch team members:', response.message || 'No data returned');
          setError(response.message || 'Failed to load team members');
        }
      } catch (error) {
        console.error('Error fetching team members:', error);
        setError('An error occurred while fetching team members');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
          <div className="text-center">
            <h2 className="text-yellow-600 text-sm font-semibold tracking-wide uppercase font-poppins">Loading Team</h2>
            <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl font-playfair"
              style={playfairStyle}>Loading Our Optimistic Leaders</h1>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="animate-pulse flex flex-col space-y-4">
                <div className="h-64 bg-gray-200 rounded-xl"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button className="bg-yellow-400 text-white px-6 py-3 rounded-full hover:bg-yellow-500 transition duration-300 font-poppins">
              Loading Members
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (error || teamMembers.length === 0) {
    return (
      <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
          <div className="text-center">
            <h2 className="text-yellow-600 text-sm font-semibold tracking-wide uppercase font-poppins">Meet Our Team</h2>
            <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl font-playfair"
              style={playfairStyle}>Our Optimistic Leaders</h1>
          </div>
          <div className="mt-12 text-center py-12">
            <p className="text-gray-600 font-poppins">
              {error || 'No team members available at the moment. Please check back later or visit our team page.'}
            </p>
          </div>
          <div className="mt-12 text-center">
            <button className="bg-yellow-400 text-white px-6 py-3 rounded-full hover:bg-yellow-500 transition duration-300 font-poppins">
              Know More Members
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl'>
        <div className="text-center">
          <h2 className="text-yellow-600 text-sm font-semibold tracking-wide uppercase font-poppins">Meet Our Team</h2>
          <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl font-playfair"
            style={playfairStyle}>Our Optimistic Leaders</h1>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.slice(0, showAllMembers ? teamMembers.length : 3).map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <button 
            className="bg-yellow-400 text-white px-6 py-3 rounded-full hover:bg-yellow-500 transition duration-300 font-poppins"
            onClick={() => setShowAllMembers(!showAllMembers)}
          >
            {showAllMembers ? 'Know Less Members' : 'Know More Members'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Team;
