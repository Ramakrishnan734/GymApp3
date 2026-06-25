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
    return(
        <>
        <View style={ {flex:1 ,backgroundColor: '#0000ff', paddingHorizontal: 24, paddingTop: 20}}>
            <View style={styles.heading}>
                <Text style={styles.greeting}>Workout's History </Text>            
            </View>

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