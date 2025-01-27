'use client'
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { register, reset } from "../../../lib/features/auth/authSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MaxDonations = () => {
    const [maxDonations, setMaxDonations] = useState('');

    return (
        <>
            <div id="createUserModal" tabIndex="-1" aria-hidden="true" className={`p-4 h-max lg:m-auto max-lg:w-full`}>
                <div className="relative w-full lg:w-[70vw]">
                    <div className="relative bg-white rounded-2xl shadow">
                        <div className="flex items-start justify-between p-4 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Maximum Donations Allowed For Each Campaign 
                            </h3>
                        </div>
                        <div className="p-6 max-h-[calc(100vh-20rem)] overflow-x-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                <div className="col-span-1">
                                    <label htmlFor="total_characters" className="block mb-2 text-sm font-medium text-gray-900">Enter Amount</label>
                                    <input
                                        type="number"
                                        value={maxDonations}
                                        id="total_characters"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                                        placeholder="Enter max. donations allowed"
                                        onChange={(e) => setMaxDonations(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b">
                            <button type="submit" className="text-white bg-green-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MaxDonations;
