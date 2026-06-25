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
import { TextInput, Button,Menu } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const HomeScreen= ({navigation})=>{
    const [workout,setworkout]=useState([]);
    const [exercise,setexercise]=useState("");
    const [set,setset]=useState("");
    const [rep,setrep]=useState("");
    const [weight,setweight]=useState("");
    const [detail,setdetail]=useState([]);
    const [musclegrp,setmusclegrp]=useState("");
    const [menuvisible,setmenuvisible]=useState(false);  
    useEffect(()=>{
        const user= auth().currentUser;
        firestore().collection('users').doc(user.uid).collection('workout').get().then(item=>{
            const today = new Date().toLocaleDateString();
            const data=item.docs.map(doc=>doc.data()).filter(w => w.date === today);
            setworkout(data);
        });
    },[]);
  async  function handleLogworkout()
    {
        if(!exercise || !set || setdetail.length ===0 )
        {
            Alert.alert("field missing ","please enter every field exercise,set,rep");
            return;
        }
        const entry={
        id:Date.now().toString(),
        exercise,
        setdetail:detail,
        set:parseInt(set),
        musclegrp,
       date: new Date().toLocaleDateString(),
    }
    const user =auth().currentUser;
        await firestore().collection('users')
        .doc(user.uid)
        .collection('workout')
        .add(entry);
    setworkout(prev=>[entry,...prev]);
    setexercise("");
    setset("");
    setrep("");
    setweight("");
    setdetail([]);
    setmusclegrp("");
    }
    function handleSetChange(value)
    {
        setset(value);
        const no=parseInt(value);
        if(!isNaN(no) && no>0)
        {
            setdetail(Array.from({length:no},()=>({rep:'',weight:''})));
        }
        else
        {
            setdetail([]);
        }
    }
    
    function handleLogout()
    {
        auth().signOut();
    }
    const totalset=workout.reduce((sum,w)=> sum+(w.set || 0),0);
    return(

         <View style={{ flex:1 ,backgroundColor: '#0000FF', paddingHorizontal: 24, paddingTop: 20 }}>
            <View style={styles.heading}>
                <Text style={styles.greeting}>Today's workout</Text>
            </View>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            {/* stats */}
            <View style={styles.statrow}>
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
                    <Menu 
                        visible={menuvisible}
                        onDismiss={()=>setmenuvisible(false)}
                        anchor={
                            <Button mode='contained' onPress ={()=>setmenuvisible(true)}>
                                {musclegrp || 'select muscle group'}
                            </Button>
                        }
                        >
                    <Menu.Item onPress={() => { setmusclegrp('Upper Chest'); setmenuvisible(false); }} title="Upper Chest" />
                    <Menu.Item onPress={() => { setmusclegrp('Mid Chest'); setmenuvisible(false); }} title="Mid Chest" />
                    <Menu.Item onPress={() => { setmusclegrp('Lower Chest'); setmenuvisible(false); }} title="Lower Chest" />
                    <Menu.Item onPress={() => { setmusclegrp('Back'); setmenuvisible(false); }} title="Back" />
                    <Menu.Item onPress={() => { setmusclegrp('Legs'); setmenuvisible(false); }} title="Legs" />
                    <Menu.Item onPress={() => { setmusclegrp('Front Delt'); setmenuvisible(false); }} title="Front Delt" />
                    <Menu.Item onPress={() => { setmusclegrp('Side Delt'); setmenuvisible(false); }} title="Side Delt" />
                    <Menu.Item onPress={() => { setmusclegrp('Rear Delt'); setmenuvisible(false); }} title="Rear Delt" />
                    <Menu.Item onPress={() => { setmusclegrp('Biceps'); setmenuvisible(false); }} title="Biceps" />
                    <Menu.Item onPress={() => { setmusclegrp('Triceps'); setmenuvisible(false); }} title="Triceps" />
                    <Menu.Item onPress={() => { setmusclegrp('Core'); setmenuvisible(false); }} title="Core" />
                    </Menu>
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
                        onChangeText={handleSetChange}
                        keyboardType='numeric'
                    />
                    {detail.map((item,index)=>(
                        <View key={index} style={styles.row}>
                          <Text style={styles.title}> SET {index + 1}</Text> 
                          <TextInput 
                            label="Rep"
                            value={item.rep}
                            onChangeText={(value)=>{
                                const updated =[...detail];
                                updated[index].rep=value;
                                setdetail(updated);
                            }}
                            keyboardType='numeric'
                            style={[styles.input]}
                            />
                            <Text style={styles.title}> SET {index + 1}</Text> 
                          <TextInput 
                            label="Wt"
                            value={item.weight}
                            onChangeText={(value)=>{
                                const updated =[...detail];
                                updated[index].weight=value;
                                setdetail(updated);
                            }}
                            keyboardType='numeric'
                            style={[styles.input]}
                            />
                        </View>
                    ))}
                    </View>
                    <Button  style={styles.Button} onPress={handleLogworkout}>
                ADD EXERCISE
            </Button>
                </View>
                {/* */}
             {workout.length > 0 && (      
        <View style={styles.listSection}>
            <>
          <Text style={styles.title}>Logged Today</Text>
          {workout.map(item => (
            <View key={item.id} style={styles.workoutItem}>
              <Text style={styles.workoutName}>{item.exercise}</Text>
              {item.setdetail && item.setdetail.map((s,i)=>(
              <Text key={i} style={styles.workoutDetail}>
                Set {i+1} * {s.rep} reps — {s.weight}
              </Text>
                ))}
            </View>
          ))}
          </>
        </View>
        
        
      )}    
        </ScrollView>
        </View>

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
    marginBottom:10,
  },
  workoutName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  workoutDetail: {
    fontSize: 13,
    color: '#666',
    marginTop:1,
  },

}

);
export default HomeScreen;




















































































































