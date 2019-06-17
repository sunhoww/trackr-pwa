// @flow

import * as React from 'react';
import { Query } from 'react-apollo';
import { Avatar, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { SESSION } from '../../graphql/queries';
import { getInitials, reduceToIndex } from '../../utils/string';
import useStyles, { colorChoices } from './styles';

type Props = {
  className: String,
  drawerAction?: React.Node,
};

export default function ProfileContainer({ className, drawerAction }: Props) {
  const classes = useStyles();
  return (
    <Query query={SESSION}>
      {({ data = {}, loading }) => {
        if (loading) {
          return null;
        }
        const { name, email } = data.me || {};
        const colorIndex = reduceToIndex(email, colorChoices.length);
        return (
          <div className={classes.root}>
            {drawerAction && (
              <div className={classes.action}>{drawerAction}</div>
            )}
            <Avatar
              className={clsx(
                classes.avatar,
                classes[colorChoices[colorIndex]]
              )}
            >
              <Typography component="div" variant="h5">
                {getInitials(name)}
              </Typography>
            </Avatar>
            <Typography variant="h5">{name}</Typography>
            <Typography component="p" variant="subtitle1" color="textSecondary">
              {email}
            </Typography>
          </div>
        );
      }}
    </Query>
  );
}
