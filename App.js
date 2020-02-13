import React, {Component} from 'react';
import {View, StyleSheet, ToastAndroid, BackHandler} from 'react-native';
import SoundPlayer from 'react-native-sound';
import moment from 'moment';
import AppLauncher from 'react-native-app-launcher';
//
import Video from './src/scenes/Video';
import AlarmScreen from './src/scenes/AlarmScreen';

let song = null;
const getSong = () => {
  const songPlayer = new SoundPlayer(
    'audio_file.mp3',
    SoundPlayer.MAIN_BUNDLE,
    error => {
      if (error) {
        ToastAndroid.show(
          'Error when init SoundPlayer :(((',
          ToastAndroid.SHORT,
        );
      }
    },
  );
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(songPlayer), 1000);
  });
};
class App extends Component {
  constructor(properties) {
    super(properties);
    this.state = {pause: false};
  }
  async componentDidMount() {
    song = await getSong();
    // song = new SoundPlayer('audio_file.mp3', SoundPlayer.MAIN_BUNDLE, error => {
    //   if (error) {
    //     ToastAndroid.show(
    //       'Error when init SoundPlayer :(((',
    //       ToastAndroid.SHORT,
    //     );
    //   }
    // });
    song.play(success => {
      console.log('PRINT IN %s=====>', 'did mount', success);
      if (!success) {
        ToastAndroid.show(
          'Error when play SoundPlayer :(((',
          ToastAndroid.SHORT,
        );
      }
    });
    song.setNumberOfLoops(-1);
  }
  handlePause = () => {
    if (song != null) {
      if (!this.state.pause) {
        song.pause();
      }
      this.setState({pause: true});
    }
  };
  handleYes = () => {
    console.log('PRINT IN %s=====>', 'Yes');
    // song.play(success => {
    //   if (!success) {
    //     ToastAndroid.show(
    //       'Error when play SoundPlayer :(((',
    //       ToastAndroid.SHORT,
    //     );
    //   }
    // });
    // song.setNumberOfLoops(-1);
    this.setState({pause: false});
  };
  handleLater = () => {
    console.log('PRINT IN %s=====>', 'Later');
    ToastAndroid.show('Set Alarm For 1 min:(((', ToastAndroid.SHORT);
    const date = moment().add(1, 'm');
    const timestamp = date.valueOf();
    AppLauncher.setAlarm('1', timestamp, false);
    this.handlePause();
    BackHandler.exitApp();
  };
  handleStop = () => {
    console.log('PRINT IN %s=====>', 'Stop');
    AppLauncher.clearAlarm('1');
    this.handlePause();
    BackHandler.exitApp();
  };
  render() {
    return (
      <View style={styles.container}>
        <AlarmScreen
          medicinName={['Napa']}
          yesButton={() => this.handleYes()}
          laterButton={() => this.handleLater()}
          stopButton={() => this.handleStop()}
        />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
