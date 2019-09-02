//@flow
import './SuggestionsTab.scss';

import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';

import { suggestionsCollection } from '../../services/firebase';
import { type GameSuggestion } from '../../types/GameSuggestion';
import GBGameSearch from '../components/GBGameSearch';
import GameSuggestionsList from './GameSuggestionsList';

const SuggestionsTab = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<GameSuggestion>>([]);

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
      <Button onClick={() => setShowAddModal(true)} color="primary">
        Add suggestion
      </Button>
      <GBGameSearch
        isOpen={showAddModal}
        toggleOpen={() => setShowAddModal(prevState => !prevState)}
        onSave={savePromise => {
          savePromise.then(() => setShowAddModal(false));
        }}
      />
      <GameSuggestionsList suggestions={suggestions}></GameSuggestionsList>
    </div>
  );
};

export default SuggestionsTab;
