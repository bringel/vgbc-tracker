//@flow
import * as React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { suggestionsCollection } from '../../services/firebase';
import { type SearchResponseGame } from '../../types/GameSearchResponse';
import type { GameSuggestion } from '../../types/GameSuggestion';
import GameSearch from './GameSearch';

type Props = {
  isOpen: boolean,
  toggleOpen: () => void,
  onSave: (savePromise: Promise<*>) => void
};

type State = {
  selectedResult: ?SearchResponseGame
};

class AddSuggestionModal extends React.Component<Props, State> {
  state = {
    selectedResult: null
  };

  save = () => {
    const { onSave } = this.props;
    const { selectedResult } = this.state;
    if (selectedResult) {
      const suggestionDoc: GameSuggestion = {
        giantBombID: selectedResult.id,
        displayName: selectedResult.name,
        coverURL: selectedResult.image.medium_url,
        giantBombLink: selectedResult.site_detail_url,
        user: {
          userID: '',
          userName: ''
        },
        releaseDate: selectedResult.original_release_date
          ? selectedResult.original_release_date
          : new Date(
              selectedResult.expected_release_year,
              selectedResult.expected_release_month - 1,
              selectedResult.expected_release_day
            ).toISOString()
      };

      onSave(suggestionsCollection().add(suggestionDoc));
    }
  };

  onSelectionChange = suggestion => {
    this.setState({ selectedResult: suggestion });
  };

  render() {
    const { isOpen, toggleOpen } = this.props;
    const { selectedResult } = this.state;

    return (
      <Modal isOpen={isOpen} toggle={toggleOpen} size="xl" backdrop="static" scrollable>
        <ModalHeader toggle={toggleOpen}>Add Game Suggestion</ModalHeader>
        <ModalBody>
          <GameSearch onSelectionChanged={this.onSelectionChange} />
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.save} disabled={!selectedResult} color="primary">
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default AddSuggestionModal;
