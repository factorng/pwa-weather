import React from 'react';
import classes from './IOSNotification.module.scss';

export function IOSNotification(props) {

  if (!props.isOpen) { return null; }

  return (
    <div className={classes.installInstructions}>
      <div className={classes.tooltip}>
        Click Share button to install
      </div>
    </div>
  );
}


