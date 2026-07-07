import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
const ReacoveryScreen = () => {
  const [workouts, setWorkouts] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const user = auth().currentUser;
    firestore().collection('users')
      .doc(user.uid)
      .collection('workout')
      .get()
        .then(item => {
        const data = item.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          setWorkouts(data);
        });
    }, [])
  );
  const lastTrained= workouts .reduce((acc, workout) => {
        const [dd, mm, yyyy] = workout.date.split('/');
        const workoutDate = new Date(`${yyyy}-${mm}-${dd}`);
        if(!acc[workout.musclegrp]) {
            acc[workout.musclegrp] = workoutDate;
        } else if (workoutDate > acc[workout.musclegrp]) {
            acc[workout.musclegrp] = workoutDate;
        }
        return acc;
    }, {});
    const RecoveryHours = {
    'Upper Chest': 48,
    'Mid Chest': 48,
    'Lower Chest': 48,
    'Back': 48,
    'Legs': 72,
    'Front Delt': 36,
    'Side Delt': 36,
    'Rear Delt': 36,
    'Biceps': 36,
    'Triceps': 36,
    'Core': 24,
    };
    function calculateRecoveryTime(musclegrp,lastTrainedDate) {
        const recoveryHours = RecoveryHours[musclegrp];
        const now = new Date();
        const timeDiff = now - lastTrainedDate;
        const hoursSinceLastWorkout = timeDiff / (1000 * 60 * 60);
        const remainingRecoveryTime = recoveryHours - hoursSinceLastWorkout;
        const percent =Math.min(100,(hoursSinceLastWorkout / recoveryHours) * 100);
        return Math.round(percent);
    }
  return (

  );
}
  