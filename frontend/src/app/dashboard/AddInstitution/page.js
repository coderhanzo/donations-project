'use client'
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { register, reset } from "../../lib/features/auth/authSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddInstitution = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [re_password, setRePassword] = useState("");
    const [phone, setPhone] = useState("");
    const [institution_certificate, setCertificate] = useState("");
    const [institution_license, setLicense] = useState("");
    const [contact_person, setContactPerson] = useState("");
    const [contact_person_email, setContactPersonEmail] = useState("");
    const [contact_person_phone, setContactPersonPhone] = useState("");

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            toast.success("User Created Successfully");
            setName('');
            setEmail('');
            setPassword('');
            setRePassword('');
            setPhone('');
            setCertificate('');
            setLicense('');
            setContactPerson('');
            setContactPersonEmail('');
            setContactPersonPhone('');
        }
        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== re_password) {
            toast.error("Passwords do not match");
        } else {
            const userData = { name, email, password, re_password, phone, institution_certificate, institution_license, contact_person, contact_person_email, contact_person_phone };
            dispatch(register(userData));
        }
    }

    return (
        <>
            <form id="createUserModal" tabIndex="-1" aria-hidden="true" className="p-4 w-full lg:m-auto max-w-full" onSubmit={handleSubmit}>
                <div className="relative w-full lg:w-[70vw] max-w-full mx-auto">
                    <div className="relative bg-white rounded-2xl shadow">
                        <div className="flex items-start justify-between p-4 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Create An Institution
                            </h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-gray-900">Institution Details</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Institution Name</label>
                                        <input type="text" value={name} id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={(e) => setName(e.target.value)} placeholder="Institution Name" />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Institution Phone Number</label>
                                        <input type="text" value={phone} id="phone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                        <input type="email" value={email} id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Institution Email" />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                        <input type="password" value={password} id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
                                    </div>
                                    <div>
                                        <label htmlFor="re_password" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                                        <input type="password" value={re_password} id="re_password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={(e) => setRePassword(e.target.value)} placeholder="Confirm Password" />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="institution_license" className="block mb-2 text-sm font-medium text-gray-900">Upload Institution License</label>
                                            <input type="file" id="institution_license" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
                                        </div>
                                        <div>
                                            <label htmlFor="institution_certificate" className="block mb-2 text-sm font-medium text-gray-900">Upload Institution Certificate</label>
                                            <input type="file" id="institution_certificate" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-lg font-semibold text-gray-900">Contact Person Details</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="contact_person" className="block mb-2 text-sm font-medium text-gray-900">Contact Person</label>
                                        <input type="text" value={contact_person} id="contact_person" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={(e) => setContactPerson(e.target.value)} placeholder="Enter Contact Person Name" />
                                    </div>
                                    <div>
                                        <label htmlFor="contact_person_email" className="block mb-2 text-sm font-medium text-gray-900">Contact Person Email</label>
                                        <input type="email" value={contact_person_email} id="contact_person_email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={(e) => setContactPersonEmail(e.target.value)} placeholder="Enter Contact Person Email" />
                                    </div>
                                    <div>
                                        <label htmlFor="contact_person_phone" className="block mb-2 text-sm font-medium text-gray-900">Contact Person Phone</label>
                                        <input type="text" value={contact_person_phone} id="contact_person_phone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={(e) => setContactPersonPhone(e.target.value)} placeholder="Enter Contact Person Phone Number" />
                                    </div>
                                    <div>
                                        <label htmlFor="contact_person_position" className="block mb-2 text-sm font-medium text-gray-900">Contact Person Position</label>
                                        <input type="text" value="" id="contact_person_position" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Enter Contact Person Position" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b">
                            <button type="submit" className="text-white bg-green-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save All</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddInstitution;
