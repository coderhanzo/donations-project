'use client'
import Modal from "./Modal";
import { LuX } from "react-icons/lu";

const DisabilityModal = ({isOpen, onClose}) => {
 return (
   <Modal isOpen={isOpen} onClose={onClose}>
     <div className="flex items-start justify-between p-4 border-b rounded-t ">
             <h4 className="text-lg font-semibold mb-2">Add Disability Beneficiary</h4>
             <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " >
            <LuX className="scale-[1.5] stroke-2" onClick={onClose} />
             </button>
      </div>
             <form className="grid grid-cols-2 gap-4">
               <div className="mb-4">
                 <label className="block text-gray-700 text-sm font-bold mb-2">
                   Beneficiary Name
                 </label>
                 <input
                   type="text"
                   placeholder="Enter beneficiary name"
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                 />
               </div>
               <div className="mb-4">
                 <label className="block text-gray-700 text-sm font-bold mb-2">
                   Type of Disability Support
                 </label>
                 <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                   <option value="disabled">Select Type Of Disability Support</option>
                   <option>Mobility Aids</option>
                   <option>Rehabilitation</option>
                   <option>Inclusive Education</option>
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
                   Number of Individuals Benefiting
                 </label>
                 <input
                   type="number"
                   placeholder="Enter number of students"
                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                 />
               </div>
               <div className="mb-4">
                 <label className="block text-gray-700 text-sm font-bold mb-2">
                   Specific Needs
                 </label>
                 <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                 <option value="disabled">Select Specific Needs</option>
                   <option>Assistive Devices</option>
                   <option>Accessibility Improvements</option>
                 </select>
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
               <div className="col-span-2">
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
export default DisabilityModal;