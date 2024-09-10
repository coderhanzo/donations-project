'use client'
import Modal from "./Modal";

const AuthPasswordModal = ({isOpen, onClose})=> {
    return(
      <Modal isOpen={isOpen} onClose={onClose}>
        <h4 className="text-lg font-semibold mb-4">Edit User Password</h4>
        <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Enter New Password 
                </label>
                <input
                type="text"
                placeholder="Enter New Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Confirm New Password 
                </label>
                <input
                type="text"
                placeholder="Confirm New Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"/>
            </div>
            <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b">
                <button type="submit" className="text-white bg-green-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Save
                </button>
             </div>
        </div>
    </Modal>            
    )
}
export default AuthPasswordModal;