import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minToMill = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes, isPaused, setCurrentProgress, onEnd }) => {
  console.log("This was rendered " + minutes)
  const interval = useRef(null);
  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        // do more here
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const timeLeft = time - 1000;
      // Report Progress
      setCurrentProgress(1-time/minToMill(minutes))
      return timeLeft;
    });
  };

  const [millis, setMillis] = useState(null);

  useEffect(() => {
    if (isPaused) {
      if(interval.current) {
        clearInterval(interval.current)
      }
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  useEffect(() => {
    setMillis(minToMill(minutes));
  },[minutes]);

  const min = Math.floor(millis / 1000 / 60) % 60;
  const sec = Math.floor(millis / 1000) % 60;
  return (
    <Text style={styles.text}>
      {formatTime(min)}:{formatTime(sec)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    color: colors.white,
    fontWeight: 'bold',
    padding: spacing.lg,
    backgroundColor: 'rgba(94,132,226,0.3)',
    alignContent: 'center',
  },
  titleContainer: {
    alignContent: 'center',
  },
});
