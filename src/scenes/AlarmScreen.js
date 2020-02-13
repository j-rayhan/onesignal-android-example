/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import Layout from '../Layout';

const AlarmScreen = props => {
  return (
    <View style={styles.container}>
      <View style={styles.logoImage}>
        <Image
          source={require('../assets/icon/shusthothakun.jpg')}
          style={styles.img1}
        />
      </View>
      <View style={styles.medImage}>
        <Image
          source={require('../assets/icon/medeat.png')}
          style={styles.img2}
        />

        <Text style={{marginTop: 20}}>Medicine name</Text>
        {props.medicinName &&
          props.medicinName.map(name => (
            <Text key={name} style={{fontSize: 18, fontWeight: 'bold'}}>
              {name}
            </Text>
          ))}
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 20,
            paddingRight: 5,
            marginBottom: 2,
          }}>
          <Text>Did you took the medicine?</Text>
          <View
            style={{
              flexDirection: 'row',
              width: 115,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={styles.yesNoButton}
              onPress={() => props.yesButton()}>
              <Text>YES</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.yesNoButton}
              onPress={() => props.laterButton()}>
              <Text>LATER</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: Layout.window.width,
          height: 50,
          backgroundColor: '#FF0000',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => props.stopButton()}>
        <Text style={{color: '#fff'}}>STOP ALARM</Text>
      </TouchableOpacity>
    </View>
  );
};

AlarmScreen.navigationOptions = {
  header: null,
};

export default AlarmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: Layout.window.height,
    justifyContent: 'space-between',
  },
  logoImage: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img1: {height: 70, width: '85%'},
  medImage: {
    marginTop: 15,
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img2: {height: 190, width: '45%'},
  yesNoButton: {
    backgroundColor: '#C4C4C4',
    width: 55,
    height: 35,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
