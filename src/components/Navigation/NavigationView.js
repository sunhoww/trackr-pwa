// @flow

import React from 'react';
import { List, Divider } from '@material-ui/core';
import {
  Place as PlaceIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
} from '@material-ui/icons';

import ListItemLink from './ListItemLink';

type Props = {
  onSelect?: Function,
};

const primaryLinks = [
  { label: 'Devices', path: '/devices', icon: <PlaceIcon /> },
  { label: 'Settings', path: '/settings', icon: <SettingsIcon /> },
];
const secondaryLinks = [{ label: 'About', path: '/about', icon: <InfoIcon /> }];

export default function NavigationView({ onSelect }: Props) {
  return (
    <React.Fragment>
      <List>
        {primaryLinks.map(({ label, path, icon }) => (
          <ListItemLink
            key={path}
            primary={label}
            to={path}
            icon={icon}
            onClick={onSelect}
          />
        ))}
      </List>
      <Divider />{' '}
      <List>
        {secondaryLinks.map(({ label, path, icon }) => (
          <ListItemLink
            key={path}
            primary={label}
            to={path}
            icon={icon}
            onClick={onSelect}
          />
        ))}
      </List>
    </React.Fragment>
  );
}