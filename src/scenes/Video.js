import React, {Component} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import WebView from 'react-native-webview';
import moment from 'moment';

import AppLauncher from 'react-native-app-launcher';

// use in other file

const dayKeys = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const computeNextAlarmTimestamp = (
  hour,
  minute,
  doesRepeat,
  repeatMap,
) => {
  const bufferSeconds = 5; // to prevent double firing
  const now = moment();
  const fire = moment();
  fire.hour(hour);
  fire.minute(minute);
  fire.seconds(0);
  console.log('PRINT IN %s=====>','moment', moment().format());
  // no repeat => fire as soon as possible once
  if (!doesRepeat) {
    // either today or tomorrow depending on if current time is already over the specified hour:minute
    if (fire.diff(now, 'seconds') < bufferSeconds) {
      fire.add(1, 'day');
    }
    return fire;
  }

  // is any repeat even checked?
  const someDayOnRepeat = Object.values(repeatMap).some(val => val);
  if (!someDayOnRepeat) {
    return null;
  }

  const dayKeyIndex = now.day(); // 0 .. 6 where 0 = Sunday
  // is it on repeat for today?
  if (repeatMap[dayKeys[dayKeyIndex]]) {
    // can we still fire today?
    if (!(fire.diff(now, 'seconds') < bufferSeconds)) {
      return fire;
    } // fire for today is still in the future, return
  }

  // cannot fire today, find correct day of the week starting with tomorrow checking one full week inclusive
  for (let offset = 1; offset <= 7; offset += 1) {
    if (repeatMap[dayKeys[(dayKeyIndex + offset) % 7]]) {
      fire.day(dayKeyIndex + offset, 'days'); // no % 7 because of the way moment.js works with last/next week
      return fire;
    }
  }

  throw new Error('computeNextAlarmTimestamp: Unreachable code');
};

/**
 * Sets the alarm for the schedule provided as a parameter, with Android's AlarmManager.
 * Returns a new alarmObj.
 */
const setAlarm = scheduleObj => {
  const {id, enabled, time, doesRepeat, repeatMap} = scheduleObj;
  let timestamp = null; // timestamp when the alarm goes off next
  if (enabled) {
    const date = computeNextAlarmTimestamp(
      time.hour,
      time.minute,
      doesRepeat,
      repeatMap,
    );
    console.log('PRINT IN %s=====>', 'Date', date);
    // date = 2020-02-11T01:30:00.319Z
    if (date != null) {
      timestamp = date.valueOf();
      console.log('PRINT IN %s=====>', 'timestamp', timestamp);
      // AppLauncher.setAlarm(id, timestamp);
    }
  } else {
    // clear alarm
    // AppLauncher.clearAlarm(id);
  }
  return {
    id,
    enabled,
    timestamp,
  };
};

/**
 * A schedule object is the visual representation of an alarm.
 * {
 * "doesRepeat": true,
 * "enabled": true,
 * "id": 1,
 * "time": {"hour": 7, "minute": 30}
 * "repeatMap": {"Fri": true, "Mon": true, "Sat": false, "Sun": false, "Thu": true, "Tue": true, "Wed": true},
 * }

 */
export const createScheduleObj = (id, enabled, doesRepeat, hour, minute) => ({
  id,
  enabled: typeof enabled === 'undefined' ? true : enabled,
  time: {
    hour: hour || 7,
    minute: minute || 30,
  },
  doesRepeat: typeof doesRepeat === 'undefined' ? true : doesRepeat,
  repeatMap: dayKeys.reduce(
    (obj, dayKey, i) => Object.assign(obj, {[dayKey]: i > 0 && i < 6}),
    {},
  ),
});

// --------------------
class Video extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // const videoId = 'idyZRfRScbk'
    // const volume = '50'
    const source = {
      // html: website,
      // uri: `http://cmichel.io/test/api.html?nocache=${Date.now()}&videoid=${videoId}&volume=${volume}`, // may not be called index.html, bug?
      uri: 'http://www.youtube.com/embed/hbkZrOU1Zag?autoplay=1',
      // uri: 'https://www.youtube.com/embed/hbkZrOU1Zag?rel=0&autoplay=1&showinfo=0&controls=1&loop=1&vq=small'
    };
    // console.log(source);
    return (
      <View style={styles.container}>
        <WebView
          style={styles.webView}
          javaScriptEnabled
          injectedJavaScript={''}
          mediaPlaybackRequiresUserAction={false}
          allowUniversalAccessFromFileURLs
          source={source}
        />
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={this.onPress}
            title="Start Timer For 1 Min"
            color="#841584"
            accessibilityLabel="Start the Alarm Manager timer which launches this app."
          />
          <Button
            style={styles.button}
            onPress={this.onPress2}
            title="Start Timer 6 minutes"
            color="#0000ff"
            accessibilityLabel="Start the Alarm Manager timer which launches this app."
          />
          <Button
            style={styles.button}
            onPress={this.onClear}
            title="Clear"
            color="#ff0000"
          />
        </View>
      </View>
    );
  }

  onPress = () => {
    // setAlarm(createScheduleObj(1));
    const date = moment().add(1, 'm');
    const timestamp = date.valueOf();
    // console.log('PRINT IN %s=====>', 'Video', timestamp);
    AppLauncher.setAlarm('1', timestamp, false);
  };

  onPress2 = () => {
    // AppLauncher.setAlarm('2', 10, false);
  };

  onClear = () => {
    AppLauncher.clearAlarm('1');
    // AppLauncher.clearAlarm('2');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
    alignSelf: 'stretch',
  },
  buttonContainer: {
    padding: 10,
    height: 200,
    justifyContent: 'space-around',
  },
});

export default Video;
