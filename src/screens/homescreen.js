import React, { useState } from 'react';
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

const HomeScreen= ()=>{
    const [workout,setworkout]=useState([]);
    const [exercise,setexercise]=useState("");
    const [set,setset]=useState("");
    const [rep,setrep]=useState("");
    const [weight,setweight]=useState("");
    function handleLogworkout()
    {
        if(!exercise || !set || !rep )
        {
            Alert.alert("field missing ","please enter every field exercise,set,rep");
            return;
        }
        const entry={
        id:Date.now().toString(),
        exercise,
        set:parseInt(set),
        rep:parseInt(rep),
       weight: weight ? `${weight} kg` : 'Bodyweight',
    }
    setworkout(prev=>[entry,...prev]);
    setexercise("");
    setset("");
    setrep("");
    setweight("");
    }
    
    function handleLogout()
    {
        auth().signOut();
    }
    const streak= 7;
    const totalset=workout.reduce((sum,w)=> sum+w.set,0);
    return(
        
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            {/*heading*/}
            <View style={styles.heading}>
                <Text style={styles.greeting}>Today's workout</Text>
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.buttonText}>LOG OUT</Text>
                </TouchableOpacity>
            </View>
            {/* stats */}
            <View style={styles.statrow}>
                <View style={styles.statcard}>
                    <Text style={styles.statvalue}>{streak}</Text>
                    <Text style={styles.statlabel}>Days Streak</Text>
                </View>
                <View style={styles.statcard}>
                    <Text style={styles.statvalue}>{workout.length}</Text>
                    <Text style={styles.statlabel}>Workouts</Text>
                </View>
                <View style={styles.statcard}>
                    <Text style={styles.statvalue}>{totalset}</Text>
                    <Text style={styles.statlabel}>Total Set</Text>
                </View>
            </View>
                {/* log workout */}
                <View style={styles.logcard}>
                    <Text style={styles.title}> LOG EXCERCISE</Text>
                    <TextInput 
                        style={styles.input}
                        label=" EXCERCISE NAME"
                        value={exercise}
                        onChangeText={setexercise}
                        autoCapitalize='words'
                    />
                    <View style={styles.form}>
                    <TextInput 
                        style={styles.input}
                        label=" SET "
                        value={set}
                        onChangeText={setset}
                        keyboardType='numeric'
                    />
                    <TextInput
                        style={styles.input}
                        label="REP"
                        value={rep}
                        onChangeText={setrep}
                        keyboardType='numeric'
                    />
                    <TextInput
                        style={styles.input}
                        label=" WEIGHT "
                        value={weight}
                        onChangeText={setweight}
                        keyboardType='numeric'
                    />
                    </View>
                    <Button  style={styles.Button} onPress={handleLogworkout}>
                ADD EXERCISE
            </Button>
                </View>

                {/* */}
             {workout.length > 0 && (
        <View style={styles.listSection}>
          <Text style={styles.title}>Logged Today</Text>
          {workout.map(item => (
            <View key={item.id} style={styles.workoutItem}>
              <Text style={styles.workoutName}>{item.exercise}</Text>
              <Text style={styles.workoutDetail}>
                {item.set} sets * {item.rep} reps — {item.weight}
              </Text>
            </View>
          ))}
        </View>
      )}    
        </ScrollView>

    );


}
const styles=StyleSheet.create({
   container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal: 24,
        backgroundColor:'#0000FF',
    },
     heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
},
     // FORM 
    form:{
        backgroundColor:'#778899',
        borderRadius:16,
        padding:30,
    },
    label:{
        color:'#000000',
        fontSize:15,

    },
    input:{
        marginBottom:10,
        backgroundColor:'#FFFFFF',
        borderRadius: 8,
        fontSize:15,

    },
    appname:{
        fontSize:40,
        fontWeight:'bold',
        color:'#008B8B',
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
    statrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statcard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 1,
  },
  statvalue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  statlabel: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
   logcard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  listSection: {
    marginBottom: 40,
  },
  workoutItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
  },
  workoutName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  workoutDetail: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },

}

);
export default HomeScreen;




















































































































