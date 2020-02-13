import React from 'react';
import { Progress } from 'antd';
import { useSelector } from 'react-redux';
import { isNetworkActive } from '../../store/api/selectors';

const NetworkIndicator: React.FC = () => {
  if (!useSelector(isNetworkActive)) {
    return null;
  }

  return <Progress status="active" percent={100} showInfo={false} />;
};

export default NetworkIndicator;
