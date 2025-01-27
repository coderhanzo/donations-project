'use client'
import { useDispatch, useSelector } from "react-redux"
import { toggleProfileEdit } from "../../../lib/features/profile/profileSlice"

const EditProfileForm = () => {
    const dispatch = useDispatch()
    const { editProfileFormEditable } = useSelector((state) => state.profile)
    const { user } = useSelector((state) => state.auth)

    const resetState = () => {
        // Add your reset logic here
    }

    const handleCancelEdit = () => {
        resetState()
        dispatch(toggleProfileEdit())
    }

    return (
        <>
            <div id="createEventModal" tabIndex="-1" aria-hidden="true" className={`p-4 h-max lg:m-auto max-lg:w-full`}>
                <div className="relative w-full lg:w-[70vw] ">
                    {/* Modal Content */}
                    <div className="relative bg-white rounded-2xl shadow ">
                        {/* Modal Header */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Your Profile - ROLE
                            </h3>
                        </div>
                        {/* Modal Body */}
                        <div className="p-6 max-h-[calc(100vh-20rem)] overflow-x-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="col-span-1">
                                    <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                                    <input type="text" name="first-name" id="first-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Esi Green" required readOnly={!editProfileFormEditable} />
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                                    <input type="text" name="last-name" id="last-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="Esi Green" required readOnly={!editProfileFormEditable} />
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                    <input type="text" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="esi.green@email.com" required readOnly />
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="phone-number" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                                    <input type="tel" name="phone-number" id="phone-number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="e.g. +(12)3456 789" required readOnly={!editProfileFormEditable} />
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Set New Password</label>
                                    <input type="password" name="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="123456" required readOnly />
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm New Password</label>
                                    <input type="password" name="confirm-password" id="confirm-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="123456" required readOnly />
                                </div>
                            </div>
                        </div>
                        {/* Modal Footer */}
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b">
                            <button type="submit" className="text-white bg-green-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfileForm
