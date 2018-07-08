//@flow
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './StoreLink.scss';

type Props = {
  type: string,
  linkURL: string
};

function iconNameFromType(type: string) {
  switch (type) {
    case 'playstation':
      return 'playstation';
    case 'microsoft':
      return 'windows';
    case 'nintendo':
      return 'nintendo-switch';
    case 'steam':
      return 'steam';
    case 'gog':
      return '';
    default:
      return '';
  }
}

const storeLink = (props: Props) => (
  <a href={props.linkURL} className="store-link" target="_blank">
    <FontAwesomeIcon icon={['fab', iconNameFromType(props.type)]} />
    {props.type.toUpperCase()}
  </a>
);

export default storeLink;
