'use client'
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { confirm_password, create_user, reset, signup_user } from "../../../lib/features/auth/authSlice"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const InstitutionSettings = () => {

    const dispatch = useDispatch()

    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")
    const [re_password, setRePassword] = useState("")
    const [user, setUser] = useState("")
    const [institution_admin, setInstitutionAdmin] = useState(false)

    const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            toast.success("User Created Successfully")
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            setRePassword('')
            setUser('')
            setInstitutionAdmin('')
        }
        dispatch(reset())
    }, [isError, isSuccess, message, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (password !== re_password) {
            toast.error("Passwords do not match")
            return
        }

        const userData = {
            first_name,
            last_name,
            email,
            password,
            user,
            institution_admin,
        }
        

        dispatch(signup_user(userData))
    }

    return (
        <>
           
            <div id="createUserModal" tabIndex="-1" aria-hidden="true" className={`p-4 h-max lg:m-auto max-lg:w-full`}>
                <div className="relative w-full lg:w-[70vw]">
                    {/* Modal Content */}
                    <div className="relative bg-white rounded-2xl shadow">
                        {/* Modal Header */}
                        <div className="flex items-start justify-between p-4 border-b rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900">
                                Create User
                            </h3>
                        </div>
                        {/* Modal Body */}
                        <div className="p-6 max-h-[calc(100vh-20rem)] overflow-x-auto">
                            <div className="flex flex-col md:flex-row space-x-6">
                                <div className="md:w-1/2 2xl:w-3/4 space-y-6">
                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                                        <input type="text" value={first_name} name="first_namename" id="first_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" required="" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                                        <input type="text" value={last_name} name="last_name" id="last_name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" required="" />
                                    </div>

                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                        <input type="email" name="email" id="email" value={email} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required="" />
                                    </div>

                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Select Role</label>
                                        <select type="select" name="user" id="user" value={user} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={(e) => setUser(e.target.value)} placeholder="" required="">
                                            <option >Select User Role</option>
                                            <option value="">User</option>
                                            <option value={institution_admin}>Admin</option>
                                        </select>
                                    </div>


                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                        <input type="password" name="password" id="password" value={password} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required="" />
                                    </div>

                                    <div className="col-span-6 sm:col-span-4">
                                        <label htmlFor="re_password" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                                        <input type="password" name="re_password" id="re_password" value={re_password} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" onChange={(e) => setRePassword(e.target.value)} placeholder="Confirm Password" required="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Modal Footer */}
                        <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b">
                            <button onClick={handleSubmit} type="submit" className="text-white bg-green-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InstitutionSettings
