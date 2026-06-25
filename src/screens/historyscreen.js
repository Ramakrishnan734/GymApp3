import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { SectionList } from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
const Historyscreen=()=>{
    const [workout,setworkout]=useState([]);
    useFocusEffect(
  React.useCallback(() => {
    const user = auth().currentUser;
    firestore().collection('users')
      .doc(user.uid)
      .collection('workout')
      .get()
      .then(item => {
        const data = item.docs.map(doc => doc.data());

        const grouped = {};
        data.forEach(w => {
          const date = w.date || 'No Date';
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push(w);
        });

        const sections = Object.keys(grouped)
          .sort((a, b) => new Date(b) - new Date(a))
          .map(date => ({ title: date, data: grouped[date] }));

        setworkout(sections);
      });
  }, [])
);
    function handleLogout()
    {
        auth().signOut();
    }
    const chartdata = () => {
  const grouped = {};
  workout.forEach(w => {
    if (w.date) {
      grouped[w.date] = (grouped[w.date] || 0) + w.set;
    }
  });
  const labels = Object.keys(grouped).slice(-5);
  const data = labels.map(d => grouped[d]);
  return { labels, data };
};
const allworkouts = workout.flatMap(section => section.data);
const volumeByMuscle = () => {
    const grouped = {};
    allworkouts.forEach(w => {
        if (w.musclegrp) {
            grouped[w.musclegrp] = (grouped[w.musclegrp] || 0) + (w.set || 0);
        }
    });
    return grouped;
};
    return(
        <>
        <View style={ {flex:1 ,backgroundColor: '#0000ff', paddingHorizontal: 24, paddingTop: 20}}>
            <View style={styles.heading}>
                <Text style={styles.greeting}>Workout's History </Text>            
            </View>
            {allworkouts.length > 0 && (
  <BarChart
    data={{
      labels: Object.keys(volumeByMuscle()),
      datasets: [{ data: Object.values(volumeByMuscle()) }]
    }}
    width={Dimensions.get('window').width - 48}
    height={220}
    chartConfig={{
      backgroundColor: '#0000ff',
      backgroundGradientFrom: '#000000',
      backgroundGradientTo: '#0000ff',
      color: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    }}
    style={{ borderRadius: 16, marginBottom: 16 }}
  />
)}
        <SectionList
  style={styles.container}
  sections={workout}
  keyExtractor={(item, index) => index.toString()}
  renderSectionHeader={({ section: { title } }) => (
    <Text style={{ color: '#FFD700', fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>
      {title}
    </Text>
  )}
  renderItem={({ item }) => (
    <View style={styles.form}>
      <Text style={styles.workoutDetail}>{item.exercise}</Text>
      {item.setdetail && item.setdetail.map((s, i) => (
        <Text key={i} style={styles.workoutDetail}>
          Set {i + 1}: {s.rep} reps — {s.weight ? `${s.weight} kg` : 'Bodyweight'}
        </Text>
      ))}
    </View>
  )}
/>
       </View>
       </>

    );

}
const styles=StyleSheet.create({
    container:{
        paddingBottom: 40,
        paddingHorizontal: 24,
        backgroundColor:'#0000ff',
    },
     heading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    },
    greeting:{
        fontSize:20,
        color:'#FFD700',
    },
    button:{
        backgroundColor:'#FF6347',
        alignItems:'center',
        borderRadius:10,
        padding: 15,
        marginTop:20
    },
    buttonText:{
        color:'#000000',
    } ,
    form:{
        backgroundColor:'#fff',
        borderRadius:16,
        padding:30,
        marginBottom:20,marginTop:10

    },
    workoutDetail: {
    fontSize: 13,
    color: '#000',
    marginTop:1,
  },

})
export default Historyscreen;