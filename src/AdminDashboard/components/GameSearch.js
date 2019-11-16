//@flow
import './GameSearch.scss';

import axios from 'axios';
import { format, parseISO } from 'date-fns';
import React, { useEffect, useReducer } from 'react';
import { Button, Input, Label, ListGroup, ListGroupItem, Media } from 'reactstrap';

import { type GameSearchResponse, type SearchResponseGame } from '../../types/GameSearchResponse';

type State = {
  query: string,
  currentResultPage: number,
  totalResultPages: number,
  results: ?Array<SearchResponseGame>,
  selectedResult: ?number,
  loading: boolean
};

const initialState: State = {
  query: '',
  currentResultPage: 0,
  totalResultPages: 0,
  results: null,
  selectedResult: null,
  loading: false
};

function reducer(state: State, action: *): State {
  switch (action.type) {
    case 'updateQuery':
      return {
        ...state,
        query: action.query
      };
    case 'toggleResultSelection':
      return {
        ...state,
        selectedResult: state.selectedResult === action.resultID ? null : action.resultID
      };

    case 'resultsLoaded':
      return {
        ...state,
        currentResultPage: action.currentPage,
        totalResultPages: action.totalPages,
        results: !!state.results && state.results.length !== 0 ? [...state.results, ...action.results] : action.results,
        loading: false
      };
    case 'loading':
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}

type Props = {
  onSelectionChanged: (suggestion: ?SearchResponseGame) => void
};

const GameSearch = (props: Props) => {
  const { onSelectionChanged } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const { query, currentResultPage, totalResultPages, results, selectedResult, loading } = state;

  useEffect(() => {
    if (onSelectionChanged) {
      const suggestion = results ? results.find(r => r.id === selectedResult) : null;

      onSelectionChanged(suggestion);
    }
  }, [onSelectionChanged, results, selectedResult]);

  const handleSearchTextChange = (event: *) => {
    dispatch({ type: 'updateQuery', query: event.target.value });
  };

  const handleResultClicked = (resultID: number) => {
    dispatch({ type: 'toggleResultSelection', resultID: resultID });
  };

  const search = () => {
    dispatch({ type: 'loading' });
    axios.get<GameSearchResponse>(`/gameSearch?title=${query}`).then(res => {
      const { currentPage, totalPages, results } = res.data;

      dispatch({
        type: 'resultsLoaded',
        currentPage: currentPage,
        totalPages: totalPages,
        results: results
      });
    });
  };

  const handleLoadMore = () => {
    if (loading) {
      return;
    }

    dispatch({ type: 'loading' });

    axios.get<GameSearchResponse>(`/gameSearch?title=${query}&page=${currentResultPage + 1}`).then(res => {
      const { currentPage, totalPages, results } = res.data;

      dispatch({
        type: 'resultsLoaded',
        currentPage: currentPage,
        totalPages: totalPages,
        results: results
      });
    });
  };

  const hasMoreResults = currentResultPage < totalResultPages;

  return (
    <>
      <div className="search-field-wrapper">
        <Label for="searchField">Search</Label>
        <Input
          id="searchField"
          type="text"
          value={query}
          onChange={handleSearchTextChange}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              event.preventDefault();
              search();
            }
          }}
          autoFocus
        />
        <Button onClick={search} color="primary">
          Search
        </Button>
      </div>

      {results && (
        <>
          <ListGroup>
            {results.map(r => (
              <ListGroupItem key={r.id} active={r.id === selectedResult} onClick={() => handleResultClicked(r.id)}>
                <Media>
                  <Media className="poster">
                    <img src={r.image.small_url} alt="" />
                  </Media>
                  <Media body>
                    <div className="result-details">
                      <div className="result-title">{`${r.name} (${
                        r.original_release_date
                          ? format(parseISO(r.original_release_date), 'yyyy')
                          : r.expected_release_year
                      })`}</div>
                      <div className="result-description">{r.deck}</div>
                    </div>
                  </Media>
                </Media>
              </ListGroupItem>
            ))}
          </ListGroup>
          {hasMoreResults && (
            <div className="load-more" onClick={handleLoadMore}>
              Load More
            </div>
          )}
        </>
      )}
    </>
  );
};

export default GameSearch;
