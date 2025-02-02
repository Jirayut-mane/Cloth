import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface MyProfilePageProps {
  onClose: () => void;
}

const MyProfilePage: React.FC<MyProfilePageProps> = ({ onClose }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 234 567 8900',
    dateOfBirth: '1990-01-01',
    location: 'New York, USA'
  });

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Implement save logic here
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center mb-8">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full mr-4"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold">My Profile</h2>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
            <img
              src="https://cdn.discordapp.com/attachments/1334441583000682496/1334441989571084308/SignUp.png?ex=679d3433&is=679be2b3&hm=ea4388471193a47035076c6dbc70f61e8dacbaed846d00472cf846eb08540c4c&"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleEditProfile}
              className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50"
            >
              Edit Profile
            </button>
            <button
              className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50"
            >
              Manage Address
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Of Birth
            </label>
            <input
              type="date"
              value={profileData.dateOfBirth}
              onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={profileData.location}
              onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 disabled:text-gray-500"
            />
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;