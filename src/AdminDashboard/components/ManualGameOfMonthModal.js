//@flow
import addMonths from 'date-fns/add_months';
import format from 'date-fns/format';
import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import GameSearch from './GameSearch';

type Props = {
  isOpen: boolean,
  toggle: () => void
};

const ManualGameOfMonthModal = (props: Props) => {
  const { isOpen, toggle } = props;
  const today = new Date();
  const nextMonth = addMonths(today, 1);
  const [month, setMonth] = useState(today.getMonth());
  const [game, setGame] = useState(null);

  const handleRadioButton = e => {
    setMonth(Number(e.target.value));
  };

  const handleSave = () => {};

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="xl" backdrop="static" scrollable>
      <ModalHeader toggle={toggle}>Set Game of the Month</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup check inline>
            <Label check>
              <Input
                type="radio"
                name="month"
                value={today.getMonth()}
                checked={month === today.getMonth()}
                onChange={handleRadioButton}
              />
              {format(today, 'MMMM')}
            </Label>
          </FormGroup>
          <FormGroup check inline>
            <Label check>
              <Input
                type="radio"
                name="month"
                value={nextMonth.getMonth()}
                checked={month === nextMonth.getMonth()}
                onChange={handleRadioButton}
              />
              {format(nextMonth, 'MMMM')}
            </Label>
          </FormGroup>
        </Form>
        <GameSearch onSelectionChanged={game => setGame(game)} />
      </ModalBody>
      <ModalFooter>
        <Button disabled={!game} color="primary" onClick={handleSave}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ManualGameOfMonthModal;
