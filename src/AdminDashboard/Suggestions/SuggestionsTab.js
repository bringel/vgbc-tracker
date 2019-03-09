//@flow
import * as React from 'react';

import Button from '../../components/Button';
import Modal from '../../components/Modal';
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

  handleAddButtonClick = () => {
    this.setState({ showAddModal: true });
  };
  render() {
    return (
      <>
        <Button onClick={this.handleAddButtonClick}>Add suggestion</Button>
        {this.state.showAddModal && (
          <Modal>
            <div className="game-search">
              <GBGameSearch />
            </div>
          </Modal>
        )}
      </>
    );
  }
}

export default SuggestionsTab;
