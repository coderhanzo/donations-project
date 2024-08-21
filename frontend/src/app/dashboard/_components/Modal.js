
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
                <button onClick={onClose} className="absolute top-2 right-2 text-5xl text-white">
                    &times; 
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
