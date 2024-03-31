// EditUserForm.tsx

import React, { useState } from 'react';
import Input from '../UI/Input';
import { updateUser } from '../../pages/api/users';

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

interface EditUserFormProps {
    user: User;
}

const EditUserForm: React.FC<EditUserFormProps> = ({ user }) => {
    const [updatedUser, setUpdatedUser] = useState<User>(user);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUpdatedUser(prevUser => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await updateUser(updatedUser.id, updatedUser);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                type="text"
                name="first_name"
                value={updatedUser.first_name}
                onChange={handleChange}
                placeholder="First Name"
                label='First Name'
            />
            <Input
                type="text"
                name="last_name"
                value={updatedUser.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                label='Last Name'
            />
            <Input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
                placeholder="Email"
                label='Email'
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Save
            </button>
        </form>
    );
};

export default EditUserForm;
