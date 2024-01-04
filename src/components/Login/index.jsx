import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo_kspi.png'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        // Implement your authentication logic here
        // For simplicity, let's assume a hardcoded admin and user credentials
        const admins = [
            { username: 'admin', password: 'admin123', role: 'admin' },
            { username: 'manager', password: 'manager123', role: 'manager' },
        ];

        const user = { username: 'user', password: 'user123', role: 'user' };

        const foundAdmin = admins.find(admin => admin.username === username && admin.password === password);

        if (foundAdmin) {
            // Redirect to the admin panel based on the role
            const redirectPath = `/${foundAdmin.role}`;
            navigate(redirectPath);
        } else if (username === user.username && password === user.password) {
            // Redirect to the user panel
            navigate('/asosiy');
        } else {
            alert('Foydalanuvchi nomi yoki parol xato!');
        }
    };
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md max-w-xs sm:max-w-sm lg:max-w-lg">
                <div className='flex justify-center'>
                    <img className='w-[80px]' src={logo} alt="" />
                </div>
                <h1 className="text-xl font-bold text-center text-success mb-2">
                    Qo'qon davlat pedagogika instituti
                </h1>
                <h2 className="text-lg font-semibold text-center text-black">
                    Institut ichki kengashiga kirish
                </h2>
                <form className="mt-6">
                    <div className="mb-2">
                        <label for="username" className="block text-sm font-semibold text-gray-800">
                            Foydalanuvchi nomi
                        </label>
                        <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Foydalanuvchi nomi' className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#28a745] focus:ring-[#25a620] focus:outline-none focus:ring focus:ring-opacity-40"/>
                    </div>
                    <div className="mb-2">
                        <label for="password" className="block text-sm font-semibold text-gray-800">
                            Parol
                        </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Parol' className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-[#28a745] focus:ring-[#25a620] focus:outline-none focus:ring focus:ring-opacity-40"/>
                    </div>
                    <div className="mt-6">
                        <button onClick={handleLogin} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#28a745] rounded-md hover:bg-[#25a620] focus:outline-none">
                            Kirish
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;