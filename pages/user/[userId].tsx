import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { UserData, fetchUsers } from '@/pages/api/users';
import Image from 'next/image'; // Import Image from next/image
import Modal from '@/components/modal/Modal';
import EditUserForm from '@/components/forms/editUserForm';
import DeleteUserForm from '@/components/forms/deleteUserForm';
import Link from 'next/link';

const UserDetailsPage: React.FC = () => {
  const router = useRouter();
  const { userId } = router.query;
  const [user, setUser] = useState<UserData | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const response = await fetchUsers();
          const userData = response.data.find((user: UserData) => user.id === parseInt(userId as string));
          setUser(userData || null); // Set to null if userData is undefined
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUserData();
  }, [userId]);

  console.log(user); // Log user state to see its structure

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteOpen(false);
  };

  return (
    <div className="p-4 flex justify-center">
      {user !== null && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="user-details flex flex-col items-center">
            <div className="user-image mb-4">
              <Image
                src={user.avatar || 'https://via.placeholder.com/100'}
                alt={`${user.first_name} ${user.last_name}`}
                width={100}
                height={100}
                className="mx-auto rounded-full border-4 border-blue p-1"
              />
            </div>
            <h1 className="text-lg font-semibold text-blue-900 mb-2">{user.first_name} {user.last_name}</h1>
            <p className="text-gray-600">{user.email}</p>
            {/* Display other user details here */}
            <div className="flex mt-4">
              <button
                onClick={handleEditClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
            <div className="mt-4">
              <Link href="/">
                <div className="text-blue-500 cursor-pointer">Back to Main Page</div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      <Modal isOpen={isEditOpen} onClose={handleCloseEditModal}>
        <EditUserForm id={user?.id || 0} first_name={user?.first_name || ''} last_name={user?.last_name || ''} email={user?.email || ''} />
      </Modal>

      {/* Delete User Modal */}
      <Modal isOpen={isDeleteOpen} onClose={handleCloseDeleteModal}>
        <DeleteUserForm userId={user?.id || 0} />
      </Modal>
    </div>
  );
};

export default UserDetailsPage;
