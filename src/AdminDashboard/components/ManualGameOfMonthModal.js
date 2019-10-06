//@flow
import React from 'react';
import { Modal, ModalHeader } from 'reactstrap';

type Props = {
  isOpen: boolean,
  toggle: () => void
};

const ManualGameOfMonthModal = (props: Props) => {
  const { isOpen, toggle } = props;
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Set Game of the Month</ModalHeader>
    </Modal>
  );
};

export default ManualGameOfMonthModal;
