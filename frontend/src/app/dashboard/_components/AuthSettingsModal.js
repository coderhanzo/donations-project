'use client'
import Modal from "./Modal"

const AuthSettingsModal = ({isOpen, onClose}) =>{
 return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <h4 className="text-lg font-semibold mb-4"> Edit User Details</h4>
        <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    First Name
                </label>
                <input
                type="text"
                placeholder="Enter New Name"
                className="w-full px-3 py-2 border-gray-300 rounded-lg"/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Last Name
                </label>
                <input
                type="text"
                placeholder="Enter New Name"
                className="w-full px-3 py-2 border-gray-300 rounded-lg"/>
            </div>
        </div>
    </Modal>
 )
}
 export default AuthSettingsModal;