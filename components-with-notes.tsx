// src/components/common/button/Button.tsx
import React from 'react';
import './Button.css';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type = 'button', disabled = false }) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className="btn">
      {children}
    </button>
  );
};

export default Button;


/* src/components/common/Button.css */
.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #0056b3;
}

.btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
/*
- Compnent Design and Reusability and Modular
1. Use funcational components with Hooks
  - Prefer functional components over class components for simplicity and better performance
2. Single Responsibility Principle
  - Each component should have a single responsibility or purpose.
  - for example Button component should container button code not input component code
3. Presentational vs. Container Components
  - Presentational Components: Focus on UI, receive data via props
  - Container Components: Handle logic, state, and pass data to presentational components.
4. Prop Validation and Type Safety
  - Use typescript interfaces or PropTypes to define expeted props.
5. Avoid Prop Drilling
  - Use Context API or State management libraries to manage state across components.
*/ 
// Example with Presentational compoent UserCard.tsx
// src/components/common/UserCard.tsx
import React from 'react';

interface UserCardProps {
  name: string;
  email: string;
  avatarUrl: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, email, avatarUrl }) => {
  return (
    <div className="user-card">
      <img src={avatarUrl} alt={`${name}'s avatar`} />
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
};
export default UserCard;

/* src/components/common/UserCard.css */
.user-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  width: 200px;
  margin: 10px;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
}

.user-card img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.user-card h3 {
  margin: 10px 0 5px;
  font-size: 1.2em;
}

.user-card p {
  margin: 0;
  color: #555;
}



// Container Component UserList.tsx
// src/pages/UserList.tsx
import React, { useEffect, useState } from 'react';
import UserCard from '../components/common/UserCard';
import { fetchUsers } from '../services/userService';

interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-list">
      {users.map(user => (
        <UserCard key={user.id} name={user.name} email={user.email} avatarUrl={user.avatarUrl} />
      ))}
    </div>
  );
};

export default UserList;


// Service Layer (get list data) userService
// src/services/userService.ts
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
}

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get('/api/users');
  return response.data;
};


















