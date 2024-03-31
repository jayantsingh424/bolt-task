import { useState, useEffect } from 'react';
import Image from 'next/image';
import Modal from './modal/Modal';
import AddUserForm from './forms/AddUserForm';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const openAddUserModal = () => {
    setShowAddUserModal(true);
  };

  const closeAddUserModal = () => {
    setShowAddUserModal(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 transition-all ${
        isScrolled ? 'h-16' : 'h-20'
      } bg-white shadow-md`}
    >
      <div className="flex items-center space-x-4">
        <Image
          src="/logo.jpg"
          alt="Logo"
          width={isScrolled ? 40 : 50}
          height={isScrolled ? 40 : 50}
        />
      </div>
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded-md"
        onClick={openAddUserModal}
      >
        Add User
      </button>
      <Modal isOpen={showAddUserModal} onClose={closeAddUserModal}>
        <AddUserForm onAddUser={closeAddUserModal} />
      </Modal>
    </header>
  );
};

export default Header;
