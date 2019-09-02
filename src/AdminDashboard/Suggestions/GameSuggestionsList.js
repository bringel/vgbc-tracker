//@flow
import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

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
          <div>
            <GameCoverImage imageURL={g.coverURL} height={200} />
            <div>{g.displayName}</div>
          </div>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
};

export default GameSuggestionsList;
