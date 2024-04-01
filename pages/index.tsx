import { useEffect, useState } from 'react';
import UserCard from '../components/UserCard';
import { fetchUsers } from './api/users';
import { UserData } from './api/users';

export default function IndexPage() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);
                const userData = await fetchUsers();
                setUsers(userData.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false);
            }
        };

        loadUsers();
    }, []);

    const loadMoreUsers = async () => {
        try {
            setLoading(true);
            const userData = await fetchUsers();
            setUsers(prevUsers => [...prevUsers, ...userData.data]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching more users:', error);
            setLoading(false);
        }
    };

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        console.log("scrollTop:", scrollTop);
        console.log("scrollHeight:", scrollHeight);
        console.log("clientHeight:", clientHeight);
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            loadMoreUsers();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    });

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 bg-stripes-fuchsia rounded-lg">
                {users.map(user => (
                    <UserCard
                        key={user.id}
                        id={user.id || 0}
                        first_name={user.first_name}
                        last_name={user.last_name}
                        email={user.email}
                        avatar={user.avatar}
                    />
                ))}
                {loading && <p>Loading...</p>}
            </div>
        </div>
    );
}
