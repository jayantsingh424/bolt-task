import React, { useState } from 'react';
import { handleAddUser } from '@/pages/api/users';

interface AddUserFormProps {
  onAddUser: () => void;
}

interface NewUserData {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

const AddUserForm: React.FC<AddUserFormProps> = ({ onAddUser }) => {
  const [newUser, setNewUser] = useState<NewUserData>({
    email: '',
    first_name: '',
    last_name: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await handleAddUser(newUser);
      onAddUser();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex flex-col space-y-2">
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          required
        />
        <input
          type="text"
          name="first_name"
          value={newUser.first_name}
          onChange={handleInputChange}
          placeholder="First Name"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          required
        />
        <input
          type="text"
          name="last_name"
          value={newUser.last_name}
          onChange={handleInputChange}
          placeholder="Last Name"
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <button type="submit" className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Add
      </button>
    </form>
  );
};

export default AddUserForm;
