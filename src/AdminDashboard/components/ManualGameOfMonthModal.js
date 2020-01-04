//@flow
import axios from 'axios';
import { addMonths } from 'date-fns';
import React, { useCallback, useState } from 'react';
import { Button, ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import GameSearch from './GameSearch';

type Props = {
  isOpen: boolean,
  toggle: () => void
};

const ManualGameOfMonthModal = (props: Props) => {
  const { isOpen, toggle } = props;
  const [month, setMonth] = useState<'thisMonth' | 'nextMonth'>('thisMonth');
  const [game, setGame] = useState(null);

  const handleSave = useCallback(() => {
    if (!game) {
      return;
    }
    const activeDate = month === 'thisMonth' ? new Date() : addMonths(new Date(), 1);

    const activeMonth = activeDate.getMonth() + 1;
    const activeYear = activeDate.getFullYear();

    axios
      .post('/selectGameOfTheMonth', {
        gameID: game.id,
        month: activeMonth,
        year: activeYear
      })
      .then(() => toggle());
  }, [game, month, toggle]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="xl" backdrop="static" scrollable>
      <ModalHeader toggle={toggle}>Set Game of the Month</ModalHeader>
      <ModalBody>
        <div style={{ marginBottom: 12 }}>
          <ButtonGroup>
            <Button color="primary" active={month === 'thisMonth'} onClick={() => setMonth('thisMonth')}>
              This Month
            </Button>
            <Button color="primary" active={month === 'nextMonth'} onClick={() => setMonth('nextMonth')}>
              Next Month
            </Button>
          </ButtonGroup>
        </div>
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
