//@flow
import * as React from 'react';
import { Button, Modal, ModalHeader, ModalBody /*ModalFooter */ } from 'reactstrap';

import GBGameSearch from '../components/GBGameSearch';

import './SuggestionsTab.scss';

type Props = {};
type State = {
  showAddModal: boolean
};

class SuggestionsTab extends React.Component<Props, State> {
  state = {
    showAddModal: false
  };

  toggleModal = () => {
    this.setState((prevState) => ({ showAddModal: !prevState.showAddModal }));
  };
  render() {
    return (
      <>
        <Button onClick={() => this.toggleModal()} color="primary">
          Add suggestion
        </Button>
        {this.state.showAddModal && (
          <Modal isOpen={this.state.showAddModal} toggle={this.toggleModal} size="xl" backdrop="static">
            <ModalHeader toggle={this.toggleModal}>Add Game Suggestion</ModalHeader>
            <ModalBody>
              <div className="game-search">
                {/* TODO: Do something about the save button */}
                <GBGameSearch
                  onSave={(savePromise) => {
                    savePromise.then(() => this.setState({ showAddModal: false }));
                  }}
                />
              </div>
            </ModalBody>
          </Modal>
        )}
      </>
    );
  }
}

export default SuggestionsTab;
