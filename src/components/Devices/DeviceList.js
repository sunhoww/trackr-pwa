// @flow

import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { List, CircularProgress, Typography } from '@material-ui/core';
import { ReportProblemOutlined as WarningIcon } from '@material-ui/icons';
import DeviceListItem from './DeviceListItem';
import useStyles from './styles';

const DEVICES = gql`
  {
    me {
      devices {
        name
        id
        uniqueId
        status
      }
    }
  }
`;

export default function DeviceList() {
  const classes = useStyles();
  return (
    <Query query={DEVICES}>
      {({ data, loading }) => {
        if (loading) {
          return (
            <div className={classes.emptyWrapper}>
              <CircularProgress />
            </div>
          );
        }
        const { devices } = data.me;
        if (devices.length === 0) {
          return (
            <div className={classes.emptyWrapper}>
              <WarningIcon className={classes.emptyIcon} />
              <Typography variant="body1">No devices yet.</Typography>
            </div>
          );
        }
        return (
          <List>
            {devices.map(({ id, name, uniqueId, status }) => (
              <DeviceListItem
                key={id}
                primary={name}
                secondary={uniqueId}
                connectionStatus={status}
              />
            ))}
          </List>
        );
      }}
    </Query>
  );
}
