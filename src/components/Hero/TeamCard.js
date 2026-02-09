'use client';

import React from 'react';

const TeamCard = ({ member }) => {
  const { name, title, description, image, social } = member;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <img src={image} alt={name} className="w-full h-64 object-cover" />
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-orange-500 text-sm font-semibold font-poppins">{title}</h3>
            <h2 className="text-xl font-bold text-gray-900 font-playfair">{name}</h2>
            <p className="mt-2 text-gray-600 text-sm font-poppins">{description}</p>
          </div>
        </div>
        <div className="flex space-x-2 mt-4">
          {social.map((platform, index) => (
            <span key={index} className="text-orange-500 hover:text-orange-700 cursor-pointer">
              {platform === 'facebook' && 'f'}
              {platform === 'twitter' && 't'}
              {platform === 'instagram' && 'i'}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamCard;