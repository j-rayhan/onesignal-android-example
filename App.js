import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import Video from './src/scenes/Video';

class App extends Component {

  constructor(properties) {
    super(properties);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Hello</Text>
        <Video />
      </View>
    );
  }
}


export default App;
