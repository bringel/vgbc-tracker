//@flow
import * as React from 'react';
import { Button } from 'reactstrap';

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
        <GBGameSearch
          isOpen={this.state.showAddModal}
          toggleOpen={this.toggleModal}
          onSave={(savePromise) => {
            savePromise.then(() => this.setState({ showAddModal: false }));
          }}
        />
      </>
    );
  }
}

export default SuggestionsTab;
