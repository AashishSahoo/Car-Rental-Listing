'use client';
import React, { Children } from 'react';
import ReduxProvider from './reduxProvider';

const ClientLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  );
};

export default ClientLayout;

