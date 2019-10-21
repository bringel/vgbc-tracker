//@flow
import { addMonths } from 'date-fns';
import React, { useCallback, useState } from 'react';
import { Button, ButtonGroup, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { responseToGameOfTheMonthDocument } from '../../functions';
import { gamesCollection } from '../../services/firebase';
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
    const games = gamesCollection();

    const gameDoc = responseToGameOfTheMonthDocument(game, activeMonth, activeYear, true);

    games
      .add(gameDoc)
      .then(ref => {
        return games
          .where('current', '==', true)
          .get()
          .then(querySnapshot => {
            const ids = querySnapshot.docs.map(d => d.id).filter(id => id !== ref.id);
            ids.forEach(id => {
              games.doc(id).update({ current: false });
            });
          });
      })
      .then(() => toggle());
  }, [game, month, toggle]);

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="xl" backdrop="static" scrollable>
      <ModalHeader toggle={toggle}>Set Game of the Month</ModalHeader>
      <ModalBody>
        <div style={{ marginBottom: 12 }}>
          {/** TODO: does this make sense since the game set by this modal will be set as "current" */}
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
