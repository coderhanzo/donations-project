'use client'
import Modal from "./Modal"

const AuthStatusModal = ({isOpen, onClose}) =>{
 return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <h4 className="text-lg font-semibold mb-4"> Edit User Status</h4>
        <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    User Status
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="disabled">Select User Status</option>
                <option value="" className="success">Active</option>
                <option value="" className="danger">Disable</option>
                </select>
            </div>
        </div>
    </Modal>
 )
}
 export default AuthStatusModal;