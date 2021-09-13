import React, { useState } from 'react';
import { Text, View, StyleSheet, TextStyle } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { RoundededButton } from '../../components/RoundedButton';
import { Countdown } from '../../components/Countdown';
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

// onSubmitEditing is call when return/enter is pressed
export const Timing = ({ focusSubject,changeTime}) => {

  return (
    <>
    <View>
          <RoundededButton size={75} title="10" style={styles.timingButton} onPress = {() => changeTime(10)}/>
    </View>

    <View>
          <RoundededButton size={75} title="15" style={styles.timingButton} onPress = {() => changeTime(15)}/>
    </View>

    <View>
          <RoundededButton size={75} title="20" style={styles.timingButton} onPress = {() => changeTime(20)}/>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  timingButton : {
    flex: 1,
    alignItems: 'center',
    margin: spacing.sm
  }
});
