import React from 'react';

const AddDepartmentPopup = ({ onClose }) => {
    const departments = ['Department A', 'Department B', 'Department C', 'Department D']; // Example list of departments

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to handle form submission here
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white p-8 rounded-lg shadow-lg md:w-2/4"> {/* Increased padding for a bigger popup */}
                <h2 className="text-2xl text-gray-900 font-semibold mb-4 text-center">Add Department</h2> {/* Larger font size */}
                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        <select
                            className="block border-gray-400 text-gray-600 w-full py-3 pl-3 pr-10 text-lg border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
                            required
                        >
                            <option value="" disabled style={{color: 'grey'}}>
                                Select a department
                            </option>
                            {departments.map((department, index) => (
                                <option key={index} value={department} style={{color: 'black'}}>
                                    {department}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg
                                className="w-6 h-6 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.293 5.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 7.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 010 1.414zM4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="flex justify-end mt-8"> {/* Increased margin for more spacing */}
                        <button
                            type="button"
                            className="px-6 py-2 mr-2 text-lg font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:ring-blue-400"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 text-lg font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDepartmentPopup;
