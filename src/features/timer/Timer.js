import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextStyle,
  Vibration,
  Platform,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { RoundededButton } from '../../components/RoundedButton';
import { Countdown } from '../../components/Countdown';
import { Timing } from './Timing';

import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_TIME_MIN = 0.1;
// onSubmitEditing is call when return/enter is pressed
export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [minutes, setMinutes] = useState(DEFAULT_TIME_MIN);

  const onEnd = () => {
    setMinutes(DEFAULT_TIME_MIN);
    setProgress(0);
    setIsStarted(false);
    vibrate();
    onTimerEnd();
  };

  const vibrate = () => {
    if (Platform.OS == 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    }
  };

  const changeTime = (minutes) => {
    setMinutes(minutes);
    setProgress(0);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          setCurrentProgress={setProgress}
          onEnd={onEnd}
        />
      </View>

      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing On :</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>

      <View style={{ padding: spacing.md }}>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Timing changeTime={changeTime} />
      </View>

      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundededButton title="Start" onPress={() => setIsStarted(true)} />
        ) : (
          <RoundededButton title="Pause" onPress={() => setIsStarted(false)} />
        )}
      </View>

      <View style={styles.clearSubject}>
        <RoundededButton
          size={50}
          title="Cancel"
          onPress={() => clearSubject()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countDown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject : {
    paddingBottom: 25,
    paddingLeft: spacing.md
  }
});
