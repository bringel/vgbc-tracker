//@flow
import './SuggestionsTab.scss';

import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';

import { suggestionsCollection } from '../../services/firebase';
import { type GameSuggestion } from '../../types/GameSuggestion';
import GBGameSearch from '../components/GBGameSearch';
import ManualGameOfMonthModal from '../components/ManualGameOfMonthModal';
import GameSuggestionsList from './GameSuggestionsList';

const SuggestionsTab = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<GameSuggestion>>([]);
  const [showManualGameModal, setShowManualGameModal] = useState(false);

  useEffect(() => {
    return suggestionsCollection().onSnapshot(snapshot => {
      const suggestions = snapshot.docs.map(suggestionDoc => {
        return suggestionDoc.data();
      });

      setSuggestions(suggestions);
    });
  }, []);

  return (
    <div>
      <div className="actions">
        <Button onClick={() => setShowAddModal(true)} color="primary">
          Add suggestion
        </Button>
        <Button color="primary" onClick={() => setShowManualGameModal(true)}>
          Manually Select Game
        </Button>
      </div>
      <GBGameSearch
        isOpen={showAddModal}
        toggleOpen={() => setShowAddModal(prevState => !prevState)}
        onSave={savePromise => {
          savePromise.then(() => setShowAddModal(false));
        }}
      />
      <ManualGameOfMonthModal
        isOpen={showManualGameModal}
        toggle={() => setShowManualGameModal(prevState => !prevState)}
      />
      <GameSuggestionsList suggestions={suggestions}></GameSuggestionsList>
    </div>
  );
};

export default SuggestionsTab;
