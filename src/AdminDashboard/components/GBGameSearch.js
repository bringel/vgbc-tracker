//@flow
import * as React from 'react';
import axios from 'axios';
import format from 'date-fns/format';
import classnames from 'classnames';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { type GameSearchResponse, type SearchResponseGame } from '../../types/GameSearchResponse';

import './GBGameSearch.scss';

type Props = {};

type State = {
  query: string,
  currentResultPage: number,
  totalResultPages: number,
  results: ?Array<SearchResponseGame>,
  selectedResult: ?number
};

class GBGameSearch extends React.Component<Props, State> {
  state = {
    query: '',
    currentResultPage: 0,
    totalResultPages: 0,
    results: null,
    selectedResult: null
  };

  handleSearchTextUpdate = (event: SyntheticInputEvent<*>) => {
    const { value } = event.target;

    this.setState({ query: value });
  };

  search = () => {
    const { query } = this.state;

    axios.get<void, GameSearchResponse>(`/gameSearch?title=${query}`).then((response) => {
      const { currentPage, totalPages, results } = response.data;

      this.setState({ currentResultPage: currentPage, totalResultPages: totalPages, results: results });
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

    axios.get<void, GameSearchResponse>(`/gameSearch?title=${query}&page=${currentResultPage + 1}`).then((response) => {
      const { currentPage, totalPages, results } = response.data;

      this.setState((prevState) => {
        return {
          currentResultPage: currentPage,
          totalResultPages: totalPages,
          results: [...prevState.results, ...results]
        };
      });
    });
  };

  render() {
    const { query, results, currentResultPage, totalResultPages } = this.state;
    const hasMoreResults = currentResultPage < totalResultPages;
    return (
      <>
        <div className="search-field-wrapper">
          <Input
            label="Search"
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
            autofocus
          />
          <Button onClick={this.search}>Search</Button>
        </div>
        {results && (
          <div className="results">
            {results.map((r) => (
              <div
                key={r.id}
                className={classnames('search-result', { selected: r.id === this.state.selectedResult })}
                onClick={() => this.handleResultClicked(r.id)}>
                <div className="poster">
                  <img src={r.image.small_url} />
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
      </>
    );
  }
}

export default GBGameSearch;
