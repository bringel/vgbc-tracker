//@flow
import './GameSuggestionList.scss';

import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';

import GameCoverImage from '../../components/GameCoverImage';
import { type GameSuggestion } from '../../types/GameSuggestion';

type Props = {
  suggestions: Array<GameSuggestion>
};

const GameSuggestionsList = (props: Props) => {
  return (
    <ListGroup>
      {props.suggestions.map(g => (
        <ListGroupItem key={g.giantBombID}>
          <div className="suggestion-row">
            <GameCoverImage imageURL={g.coverURL} height={200} width={175} />
            <div className="suggestion-data">
              <div className="suggestion-title">{g.displayName}</div>
              <div className="suggestion-user">Suggested by: </div>
            </div>
            <div className="suggestion-actions">
              <Button>Set as Game of the Month</Button>
            </div>
          </div>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default GameSuggestionsList;
