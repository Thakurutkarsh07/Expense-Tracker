import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserFromToken, getToken } from '../utils';
import api from '../api';
import { User, Mail, Fingerprint } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const user = getUserFromToken();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await api.get(`/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  if (!profile) return <p className="text-center mt-10 text-gray-500">Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">User Profile</h2>
      <div className="space-y-4 text-gray-700">
        <div className="flex items-center gap-3">
          <Fingerprint className="text-indigo-500" />
          <span><strong>ID:</strong> {profile._id}</span>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="text-indigo-500" />
          <span><strong>Email:</strong> {profile.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <User className="text-indigo-500" />
          <span><strong>Name:</strong> {profile.name || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
