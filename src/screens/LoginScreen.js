
import{Alert, Button, StyleSheet, View,TextInput,TouchableOpacity,Text,Image} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {useState} from 'react';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



export default function LoginScreen({ navigation }) {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
async function handleLogin() {
  try {
    console.log("Login button pressed");
    const value = await firestore()
  .collection("usersnames")
  .doc(username)
  .get();

if (!value.exists()) { 
    Alert.alert("Error", "Username not found");
    return;
}

const email = value.data().email;

await signInWithEmailAndPassword(
    getAuth(),
    email,
    password
);

Alert.alert("Success", "Logged in");

    

    Alert.alert("Success", "Logged in");

  } catch (error) {
    console.log(error);
    Alert.alert("Error", error.message);
  }
}
return (
    <SafeAreaView style= {styles.container}>
        {/*header */}
        <View style={styles.heading}>
            <Image 
                        source={require('../../assets/icon copy.png')} 
                         style={{ width: 210, height: 140}}
                        />
            <Text style={styles.appname}>REP TRACK</Text>
            <Text style={styles.slogan}>Every Rep Every Win</Text>
        </View>
        {/* form */}
        <View style={styles.form}>
            <Text style={styles.label}>USERNAME</Text>
            <TextInput 
                style={styles.input}
                placeholder="username"
                placeholderTextColor="#888"
                value={username}
                onChangeText={setusername}
                autoCapitalize="none"
                />
            <Text style={styles.label}>PASSWORD</Text>
            <TextInput
                style={styles.input}
                placeholder="PASSWORD"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />         
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}> Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate('Signup')}>
                <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView> 
);
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal: 24,
        backgroundColor:'#121212',
    },
    //  HEADER 
    heading:{
        alignItems:'center',
    },
    appname:{
        fontSize:40,
        fontWeight:'bold',
        color:'#FF4500',
    },
    slogan:{
        fontSize:20,
        color:'#B0B0B0',
        paddingBottom: 10,
    },
    // FORM 
    form:{
        backgroundColor:'#1E1E1E',
        borderRadius:16,
        padding:30,
        paddingTop: 20,
    },
    label:{
        color:'#FFFFFF',
        fontSize:15,

    },
    input:{
        marginBottom:10,
        backgroundColor:'#FFFFFF',
        borderRadius: 8,
        fontSize:15,

    },
    //BUTTON 
    button:{
        backgroundColor:'#FF4500',
        alignItems:'center',
        borderRadius:10,
        padding: 15,
        marginTop:20
    },
    buttonText:{
        color:'#FFFFFF',
    },
    linkText:{
         color: '#FF4500',
  textAlign: 'center',
  marginTop: 16,
  fontSize: 14,
    }
});