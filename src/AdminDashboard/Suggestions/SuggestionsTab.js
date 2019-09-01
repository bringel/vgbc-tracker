//@flow
import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';

import GBGameSearch from '../components/GBGameSearch';
import { type GameSuggestion } from '../../types/GameSuggestion';

import { suggestionsCollection } from '../../services/firebase';
import './SuggestionsTab.scss';

const SuggestionsTab = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<GameSuggestion>>([]);

  useEffect(() => {
    return suggestionsCollection().onSnapshot((snapshot) => {
      const suggestions = snapshot.docs.map((suggestionDoc) => {
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
        toggleOpen={() => setShowAddModal((prevState) => !prevState)}
        onSave={(savePromise) => {
          savePromise.then(() => setShowAddModal(false));
        }}
      />
    </div>
  );
};

export default SuggestionsTab;
