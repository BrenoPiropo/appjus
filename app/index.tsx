import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import AppNavigator from './navigation/AppNavigator';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#060707',
  },
};

const IndexScreen = () => (
  <PaperProvider theme={theme}>
    <AppNavigator />
  </PaperProvider>
);

export default IndexScreen;
