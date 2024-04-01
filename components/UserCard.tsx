import React, { useState } from "react";
import Link from "next/link"; // Import Link from next/link
import Image from "next/image";
import Modal from "./modal/Modal";
import EditUserForm from "./forms/editUserForm";
import DeleteUserForm from "./forms/deleteUserForm";
import { UserData } from "@/pages/api/users";

interface UserCardProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
}

const UserCard: React.FC<UserCardProps> = ({ id, first_name, last_name, email, avatar }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openEditModal = () => setIsEditOpen(true);
  const closeEditModal = () => setIsEditOpen(false);

  const openDeleteModal = () => setIsDeleteOpen(true);
  const closeDeleteModal = () => setIsDeleteOpen(false);

  // Provide a default value for avatar if it's undefined
  const avatarSrc = avatar || 'https://via.placeholder.com/100';

  return (
    <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-5 shadow">
      <div className="user-details">
        <Link href={`/user/${id}`}> {/* Link to the user details page */}
            <div className="user-image">
              <Image
                src={avatarSrc}
                alt={`${first_name} ${last_name}`}
                width={100}
                height={100}
                className="mx-auto rounded-full mb-2 border-4 border-blue p-1"
              />
            </div>
            <p className="text-lg font-semibold text-blue-900 mb-2">
              {first_name} {last_name}
            </p>
            <p className="text-gray-600 mb-4">Email: {email}</p>
        </Link>
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
        <EditUserForm id={id} first_name={first_name} last_name={last_name} email={email} />
      </Modal>

      <Modal isOpen={isDeleteOpen} onClose={closeDeleteModal}>
        <DeleteUserForm userId={id} />
      </Modal>
    </div>
  );
};

export default UserCard;
