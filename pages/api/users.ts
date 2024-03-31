import axios from 'axios';

const API_BASE_URL = 'https://reqres.in/api';

export interface UserData {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserData[];
}

export const fetchUsers = async (page: number = 1, perPage: number = 20): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(`${API_BASE_URL}/users`, {
      params: {
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const handleAddUser = async (newUser: UserData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, newUser);
    console.log('User added successfully:', response.data);
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

export const updateUser = async (userId: number, updatedUser: UserData): Promise<UserData> => {
  try {
    const response = await axios.put<UserData>(`${API_BASE_URL}/users/${userId}`, updatedUser);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId: number): Promise<void> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
    if (response.status === 204) {
      console.log('User deleted successfully');
    } else {
      throw new Error('Failed to delete user');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};
