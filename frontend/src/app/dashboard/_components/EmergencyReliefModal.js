'use client'
import Modal from "./Modal";
import { LuX } from "react-icons/lu";

const EmergencyReliefModal = ({isOpen, onClose}) => {
 return (
   <Modal isOpen={isOpen} onClose={onClose}>
     <div className="flex items-start justify-between p-4 border-b rounded-t ">
             <h4 className="text-lg font-semibold mb-4">Add Emergency Relief Beneficiary</h4>
             <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " >
            <LuX className="scale-[1.5] stroke-2" onClick={onClose} />
             </button>
      </div>
             <form className="grid grid-cols-3 gap-4">
               <div className="mb-4">
                 <label className="block text-gray-700 text-sm font-bold mb-2">
                   Relief Effort Name
                 </label>
                 <input
                   type="text"
                   placeholder="Enter relief effort name"
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                 />
               </div>
               <div className="mb-4">
                 <label className="block text-gray-700 text-sm font-bold mb-2">
                   Type of Disaster/Emergency
                 </label>
                 <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                   <option value="disabled">Select Type Of Disaster/Emergency</option>
                   <option>Natural Disaster</option>
                   <option>War</option>
                   <option>Pandemic </option>
                 </select>
               </div>
               <div className="mb-4">
                 <label className="block text-gray-700 text-sm font-bold mb-2">
                   Location
                 </label>
                 <input
                   type="text"
                   placeholder="Enter location"
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                 />
               </div>
               
               <div className="mb-4">
                 <label className="block text-gray-700 text-sm font-bold mb-2">
                   Immediate Needs
                 </label>
                 <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                 <option value="disabled">Select Immediate Needs</option>
                   <option>Shelter</option>
                   <option>Food</option>
                   <option>Medical Supplies</option>
                 </select>
               </div>
               <div className="mb-4">
                 <label className="block text-gray-700 text-sm font-bold mb-2">
                   Number of Individuals 
                 </label>
                 <input
                   type="number"
                   placeholder="Enter number of individuals"
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                 />
               </div>
               <div className="mb-4">
                 <label className="block text-gray-700 text-sm font-bold mb-2">
                   Relief Timeline
                 </label>
                 <input
                   type="text"
                   placeholder="Enter relief timeline"
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                 />
               </div>
               <div className="mb-4">
                 <label className="block text-gray-700 text-sm font-bold mb-2">
                   Contact Person
                 </label>
                 <input
                   type="text"
                   placeholder="Enter contact person"
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                 />
               </div>
               <div className="mb-4">
                 <label className="block text-gray-700 text-sm font-bold mb-2">
                   Contact Email
                 </label>
                 <input
                   type="email"
                   placeholder="Enter email"
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                 />
               </div>
               <div className="mb-4">
                 <label className="block text-gray-700 text-sm font-bold mb-2">
                   Contact Phone Number
                 </label>
                 <input
                   type="tel"
                   placeholder="Enter phone number"
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                 />
               </div>
               <div className="col-span-3">
                 <label className="block text-gray-700 text-sm font-bold mb-2">
                   Description of Support Required
                 </label>
                 <textarea
                   placeholder="Describe the support needed"
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                 />
               </div>
               <div className="col-span-2">
                 <button
                   type="submit"
                   className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-green-500"
                 >
                   Submit
                 </button>
               </div>
             </form>
   </Modal>
 )
}
export default EmergencyReliefModal;