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

 const  Profilescreen=()=>{
    const useremail=auth().currentUser.email;
   const  useruid=auth().currentUser.uid; 
   const [username,setusername]=useState('');
   useEffect(()=>{
    const fetch=async ()=>{
        const snapshot=await firestore().collection('users').where('uid',"==",useruid).get();
        setusername(snapshot.docs[0].data().username);
    };
    fetch();
   },[]);
   function handleLogout()
   {
        auth().signOut();
   }
   return (
        <>
        <View style={ {flex:1 ,backgroundColor: '#0000FF', paddingHorizontal: 24, paddingTop: 20}}>
                    <View style={styles.heading}>
                                    <Text style={styles.greeting}>Profile </Text>
                                    <TouchableOpacity style={styles.button} onPress={handleLogout}>
                                        <Text style={styles.buttonText}>LOG OUT</Text>
                                    </TouchableOpacity>
                                </View>
        
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.workoutDetail}>USERNAME :{username}</Text>
                <Text style={styles.workoutDetail}>EMAIL :{useremail}</Text>
            </View>
        </View>
        </View>
        </>

    );
};
const styles=StyleSheet.create({
    container:{
        paddingBottom: 40,
        paddingHorizontal: 24,
        backgroundColor:'#0000FF',
    },
    form:{
        backgroundColor:'#FFFAFA',
        borderRadius:16,
        padding:30,
    },
     heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    workoutDetail: {
    fontSize: 13,
    color: '#000',
    marginTop:1,
    }
});
export default Profilescreen;