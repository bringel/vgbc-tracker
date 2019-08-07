//@flow
import * as React from 'react';
import axios from 'axios';
import format from 'date-fns/format';
import classnames from 'classnames';
import { Button, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { suggetionsCollection } from '../../services/firebase';
import { type GameSearchResponse, type SearchResponseGame } from '../../types/GameSearchResponse';
import type { GameSuggestion } from '../../types/GameSuggestion';

import './GBGameSearch.scss';

type Props = {
  isOpen: boolean,
  toggleOpen: () => void,
  onSave: (savePromise: Promise<*>) => void
};

type State = {
  query: string,
  currentResultPage: number,
  totalResultPages: number,
  results: ?Array<SearchResponseGame>,
  selectedResult: ?number,
  loading: boolean
};

class GBGameSearch extends React.Component<Props, State> {
  state = {
    query: '',
    currentResultPage: 0,
    totalResultPages: 0,
    results: null,
    selectedResult: null,
    loading: false
  };

  handleSearchTextUpdate = (event: SyntheticInputEvent<*>) => {
    const { value } = event.target;

    this.setState({ query: value });
  };

  search = () => {
    const { query } = this.state;
    this.setState({ loading: true });

    axios.get<void, GameSearchResponse>(`/gameSearch?title=${query}`).then((response) => {
      const { currentPage, totalPages, results } = response.data;

      this.setState({ currentResultPage: currentPage, totalResultPages: totalPages, results: results, loading: false });
    });
  };

  handleResultClicked = (resultID: number) => {
    this.setState((prevState) => {
      if (prevState.selectedResult === resultID) {
        return {
          selectedResult: null
        };
      } else {
        return {
          selectedResult: resultID
        };
      }
    });
  };

  handleLoadMoreClicked = () => {
    const { query, currentResultPage } = this.state;
    if (this.state.loading) {
      return;
    }
    this.setState({ loading: true });

    axios.get<void, GameSearchResponse>(`/gameSearch?title=${query}&page=${currentResultPage + 1}`).then((response) => {
      const { currentPage, totalPages, results } = response.data;

      this.setState((prevState) => {
        const previousResults = prevState.results || [];
        return {
          currentResultPage: currentPage,
          totalResultPages: totalPages,
          results: [...previousResults, ...results],
          loading: false
        };
      });
    });
  };

  save = () => {
    const { onSave } = this.props;
    const { selectedResult, results } = this.state;
    if (selectedResult && results) {
      const selectedGame = results.find((r) => r.id === selectedResult);
      if (selectedGame) {
        const suggestionDoc: GameSuggestion = {
          giantBombID: selectedGame.id,
          displayName: selectedGame.name,
          coverURL: selectedGame.image.medium_url,
          giantBombLink: selectedGame.site_detail_url,
          user: {
            userID: '',
            userName: ''
          }
        };

        onSave(suggetionsCollection().add(suggestionDoc));
      }
    }
  };

  render() {
    const { isOpen, toggleOpen } = this.props;
    const { query, results, currentResultPage, totalResultPages, selectedResult } = this.state;

    const hasMoreResults = currentResultPage < totalResultPages;
    return (
      <Modal isOpen={isOpen} toggle={toggleOpen} size="xl" backdrop="static" scrollable>
        <ModalHeader toggle={toggleOpen}>Add Game Suggestion</ModalHeader>
        <ModalBody>
          <div className="search-field-wrapper">
            <Label for="searchField">Search</Label>
            <Input
              id="searchField"
              type="text"
              value={query}
              onChange={this.handleSearchTextUpdate}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  this.search();
                }
              }}
              autoFocus
            />
            <Button onClick={this.search} color="primary">
              Search
            </Button>
          </div>
          {results && (
            <div className="results">
              {results.map((r) => (
                <div
                  key={r.id}
                  className={classnames('search-result', { selected: r.id === this.state.selectedResult })}
                  onClick={() => this.handleResultClicked(r.id)}>
                  <div className="poster">
                    <img src={r.image.small_url} alt="" />
                  </div>
                  <div className="result-details">
                    <div className="result-title">{`${r.name} (${format(r.original_release_date, 'YYYY')})`}</div>
                    <div className="result-description">{r.deck}</div>
                  </div>
                </div>
              ))}
              {hasMoreResults && (
                <div className="load-more" onClick={this.handleLoadMoreClicked}>
                  Load More
                </div>
              )}
            </div>
          )}
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

export default GBGameSearch;
