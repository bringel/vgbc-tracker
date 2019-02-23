//@flow
import * as React from 'react';

import Button from '../../components/Button';
import Input from '../../components/Input';

import './GBGameSearch.scss';

type Props = {};

class GBGameSearch extends React.Component<Props> {
  render() {
    return (
      <div className="search-field-wrapper">
        <Input label="Search" id="searchField" type="text" />
        <Button onClick={() => {}}>Search</Button>
      </div>
    );
  }
}

export default GBGameSearch;
