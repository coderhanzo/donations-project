 import Modal from "./Modal";

 const EducationModal = ({isOpen, onClose}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h4 className="text-lg font-semibold mb-4">Add Education Beneficiary</h4>
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
                    Institution Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter institution name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Type of Institution
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="disabled">Select Type Of institution</option>
                    <option>Primary School</option>
                    <option>Secondary School</option>
                    <option>University</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Level of Education
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="disabled">Select Level Of Education</option>
                    <option>Elementary</option>
                    <option>High School</option>
                    <option>Undergraduate</option>
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
                    Number of Students Benefiting
                  </label>
                  <input
                    type="number"
                    placeholder="Enter number of students"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Educational Needs
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="disabled">Select Educational Needs</option>
                    <option>Books</option>
                    <option>Scholarships</option>
                    <option>Infrastructure</option>
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
                    className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-gray-900"
                  >
                    Submit
                  </button>
                </div>
              </form>
    </Modal>
  )
 }
 export default EducationModal;