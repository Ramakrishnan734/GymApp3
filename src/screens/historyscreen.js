import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useFocusEffect } from '@react-navigation/native';
const Historyscreen=()=>{
    const [workout,setworkout]=useState([]);
    useFocusEffect(
    React.useCallback(()=>{
        const user= auth().currentUser;
        firestore().collection('users')
        .doc(user.uid)
        .collection('workout')
        .get()
        .then(item=>{
            const data=item.docs.map(doc=>doc.data());
            setworkout(data);
        });
    },[])
);
    function handleLogout()
    {
        auth().signOut();
    }
    return(
        <>
        <View style={ {flex:1 ,backgroundColor: '#0000FF', paddingHorizontal: 24, paddingTop: 20}}>
            <View style={styles.heading}>
                <Text style={styles.greeting}>Workout's History </Text>            
            </View>
    
        <FlatList style={styles.container}
            data={workout}
            keyExtractor ={(item,index)=>index.toString()}
            renderItem={({item})=>(
            <View style={styles.form}>
                <Text style={styles.workoutDetail}>{item.exercise} | {item.date}</Text>
                {item.setdetail && item.setdetail.map((s,i)=>(
                    <Text key={i} style={styles.workoutDetail}>
                        Set {i+1}: {s.rep} reps — {s.weight ? `${s.weight} kg` : 'Bodyweight'}
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
        backgroundColor:'#0000FF',
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