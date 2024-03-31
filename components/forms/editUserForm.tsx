import React, { useState } from 'react';
import Input from '../UI/Input';
import { UserData, updateUser } from '../../pages/api/users';

interface EditUserFormProps {
    id: number;
    first_name: UserData['first_name'];
    last_name: UserData['last_name'];
    email: UserData['email'];
}

const EditUserForm: React.FC<EditUserFormProps> = ({ id, first_name, last_name, email }) => {
    const [updatedUser, setUpdatedUser] = useState({
        email: email || '',
        first_name: first_name || '',
        last_name: last_name || '',
    });

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
            await updateUser(id, updatedUser);
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
