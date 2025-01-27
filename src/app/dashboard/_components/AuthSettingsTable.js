'use client';
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { toggleAuthDropdown } from "../../lib/features/dropdown/dropdownSlice";

const AuthSettingsTable = ({ itemsPerPage, onAuthSettingsClick, onAuthPasswordClick, onAuthStatusClick }) => {
    const dispatch = useDispatch();
    const { isLoading } = useSelector((state) => state.auth); // Adjust this based on your Redux state structure

    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleAuthDropdownClick = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <>
            <div className="relative overflow-x-auto shadow-xl rounded-2xl min-h-[30vh] lg:mt-10 flex-grow bg-white">
                <div className="z-10 flex items-center justify-between flex-col md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white rounded-t-2xl">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-4 py-2">Name</th>
                                    <th className="px-4 py-2">Email</th>
                                    <th className="px-4 py-2">Role</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2">Name</td>
                                    <td className="px-4 py-2">Email</td>
                                    <td className="px-4 py-2">Role</td>
                                    <td className="px-4 py-2">Active</td>
                                    <td className="px-4 py-2 relative">
                                        <button
                                            id="dropdownActionButton"
                                            className="text-gray-600 ml-3 hover:underline text-2xl focus:outline-none"
                                            type="button"
                                            onClick={handleAuthDropdownClick}
                                        >
                                            ...
                                        </button>
                                        {dropdownVisible && (
                                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-20">
                                                <button
                                                    className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                                    onClick={onAuthSettingsClick}
                                                >
                                                    Edit User Details
                                                </button>
                                                <button
                                                    className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                                    onClick={onAuthPasswordClick}
                                                >
                                                    Edit Password
                                                </button>
                                                <button
                                                    className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                                                    onClick={onAuthStatusClick}
                                                >
                                                    Edit Status
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        // pageCount={pageCount} // Replace with your total page count
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        // onPageChange={handlePageClick} // Replace with your page change handler
                        containerClassName="flex justify-end space-x-1 p-[12px]"
                        pageClassName="mr-1"
                        pageLinkClassName="pb-2 pt-1 px-3 bg-white border-b border-gray-300 hover:bg-gray-100"
                        activeClassName="py-1 text-blue-500"
                        previousClassName="py-1 px-3 bg-white border border-gray-300 rounded hover:bg-gray-100"
                        nextClassName="py-1 px-3 bg-white border border-gray-300 rounded hover:bg-gray-100"
                    />
                </div>
            </div>
        </>
    );
};

export default AuthSettingsTable;
