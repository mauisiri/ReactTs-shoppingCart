import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeletePopup from './DeletePopup';

const setup = (showModal = true) => {
  const setShowModal = jest.fn();
  const confirmRemove = jest.fn();

  render(
    <DeletePopup
      showModal={showModal}
      setShowModal={setShowModal}
      confirmRemove={confirmRemove}
    />
  );

  return {
    setShowModal,
    confirmRemove
  };
};

describe('DeletePopup Component', () => {
  test('opens delete confirmation modal when delete button is clicked', () => {
    setup();
    expect(screen.getByText(/Are you sure/i)).toBeInTheDocument();
  });

  test('removes item from cart when confirmed in delete modal', () => {
    const { confirmRemove } = setup();
    const confirmButton = screen.getByRole('button', { name: /Remove/i });
    fireEvent.click(confirmButton);
    expect(confirmRemove).toHaveBeenCalled();
  });

  test('closes modal when cancel button is clicked', () => {
    const { setShowModal } = setup();
    const cancelButton = screen.getByText(/Cancel/i);
    fireEvent.click(cancelButton);
    expect(setShowModal).toHaveBeenCalledWith(false);
  });
  
  //  // Failing test
  //  test('fails to find a non-existent element', () => {
  //   setup();
  //   expect(screen.getByText(/Non-existent element/i)).toBeInTheDocument();
  // });
});