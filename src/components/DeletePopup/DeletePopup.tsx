import React from 'react';
import Modal from 'react-modal';
import './DeletePopup.css';

interface DeletePopupProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  confirmRemove: () => void;
}

const DeletePopup: React.FC<DeletePopupProps> = ({ showModal, setShowModal, confirmRemove }) => {
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      contentLabel="Confirm Remove"
      className="modal"
      overlayClassName="overlay"
    >
      <div className='delete-popup'>
        <h2>Confirm Remove</h2>
        <p>Are you sure you want to remove this product from the cart?</p>
        <div className='delete-popup-buttons'>
            <button onClick={() => setShowModal(false)} style={{ color: 'var(--dark)', fontWeight: 'bold'  }}>Cancel</button>
            <button onClick={confirmRemove} style={{ backgroundColor: 'rgb(134, 25, 25)', color: 'white', fontWeight: 'bold' }}>Remove</button>
            </div>
      </div>
    </Modal>
  );
};

export default DeletePopup;