import React from 'react';
import * as Progress from 'react-native-progress';

export  const ProgressIndicator = (props) =>{
  return(
    <Progress.Circle size={30} indeterminate={true} />
  )
}
