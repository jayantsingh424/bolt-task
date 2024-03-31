import React from 'react';
import { deleteUser } from '../../pages/api/users';

interface DeleteUserFormProps {
    userId: number;
}

const DeleteUserForm: React.FC<DeleteUserFormProps> = ({ userId }) => {
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await deleteUser(userId);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>Delete User Form</div>
            <p>Are you sure you want to delete this user?</p>
            <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Delete User</button>
        </form>
    );
};

export default DeleteUserForm;
