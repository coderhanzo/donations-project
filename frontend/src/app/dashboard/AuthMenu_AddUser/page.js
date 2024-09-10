'use client'
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { register, reset } from "../../lib/features/auth/authSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const InstitutionSettings = () => {
    const dispatch = useDispatch();

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [re_password, setRePassword] = useState("");
    const [roles, setRole] = useState("");

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            toast.success("User Created Successfully");
            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setRePassword('');
            setRole('');
        }
        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== re_password) {
            toast.error("Passwords do not match");
        } else {
            const userData = { first_name, last_name, email, password, re_password, roles };
            dispatch(register(userData));
        }
    }

    return (
        <>
            <div id="createUserModal" tabIndex="-1" aria-hidden="true" className={`p-4 h-max lg:m-auto max-lg:w-full`}>
                <div className="relative w-full lg:w-[70vw]">
                    <div className="relative bg-white rounded-2xl shadow">
                        <div className="flex items-start justify-between p-4 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Add New User
                            </h3>
                        </div>
                        <div className="p-6 max-h-[calc(100vh-20rem)] overflow-x-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-1">
                                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                                    <input type="text" value={first_name} id="first_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                                    <input type="text" value={last_name} id="last_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input type="email" value={email} id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900">Select Role</label>
                                    <select id="roles" value={roles} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={(e) => setRole(e.target.value)}>
                                        <option value="" disabled>--Select User Role--</option>
                                        <option value="institution_admin">Admin</option>
                                        <option value="bsystems_admin">Super Admin</option>
                                    </select>
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                    <input type="password" value={password} id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="re_password" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                                    <input type="password" value={re_password} id="re_password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={(e) => setRePassword(e.target.value)} placeholder="Confirm Password" />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b">
                            <button onClick={handleSubmit} type="submit" className="text-white bg-green-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InstitutionSettings;
