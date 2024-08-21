'use client'
import Modal from "./Modal";

const AuthPassword = ({isOpen, onClose})=> {
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
                className="w-full px-3 py-2 border-gray-300 rounded-lg"/>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Confirm New Password 
                </label>
                <input
                type="text"
                placeholder="Confirm New Password"
                className="w-full px-3 py-2 border-gray-300 rounded-lg"/>
            </div>
        </div>
    </Modal>            
    )
}
export default AuthPassword;