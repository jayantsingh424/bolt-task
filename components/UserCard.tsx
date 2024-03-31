import React, { useState } from "react";
import Modal from "./modal/Modal";
import Image from "next/image";
import EditUserForm from "./forms/editUserForm";
import DeleteUserForm from "./forms/deleteUserForm";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openEditModal = () => setIsEditOpen(true);
  const closeEditModal = () => setIsEditOpen(false);

  const openDeleteModal = () => setIsDeleteOpen(true);
  const closeDeleteModal = () => setIsDeleteOpen(false);

  return (
    <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-5 shadow">
      <div className="user-details">
        <div className="user-image">
          <Image
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            width={100}
            height={100}
            className="mx-auto rounded-full mb-2 border-4 border-blue p-1"
          />
        </div>
        <p className="text-lg font-semibold text-blue-900 mb-2">
          {user.first_name} {user.last_name}
        </p>
        <p className="text-gray-600 mb-4">Email: {user.email}</p>
      </div>
      <button
        onClick={openEditModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
      >
        Edit
      </button>
      <button
        onClick={openDeleteModal}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Delete
      </button>

      <Modal isOpen={isEditOpen} onClose={closeEditModal}>
        <EditUserForm user={user} />
      </Modal>

      <Modal isOpen={isDeleteOpen} onClose={closeDeleteModal}>
        <DeleteUserForm
          userId={user.id}
        />
      </Modal>
    </div>
  );
};

export default UserCard;
