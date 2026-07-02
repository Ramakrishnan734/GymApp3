import{Alert, Button, StyleSheet, View,TextInput,TouchableOpacity,Text,Image} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {useState} from 'react';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



export default function LoginScreen({ navigation }) {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
 async  function handleLogin() {
    try{
        const value=await firestore().collection('usernames').doc(username).get();
        if (!value.exists)
        {
            Alert.alert("Error","Username not found");
            return;
        }
        console.log('doc data:', value.data());
        const email=value.data().email;
        await signInWithEmailAndPassword(getAuth(),email,password);
        Alert.alert("Success","Logged in");
    }
    catch(error)
    {
        Alert.alert("Error",error.message);
    }
}
return (
    <SafeAreaView style= {styles.container}>
        {/*header */}
        <View style={styles.heading}>
            <Image 
                        source={require('../../assets/icon.png')} 
                         style={{ width: 300, height: 200 }}
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
        backgroundColor:'#0000FF',
    },
    //  HEADER 
    heading:{
        alignItems:'center',
    },
    appname:{
        fontSize:40,
        fontWeight:'bold',
        color:'#00FF7F',
    },
    slogan:{
        fontSize:20,
        color:'#FF0000',
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
    //BUTTON 
    button:{
        backgroundColor:'#FF6347',
        alignItems:'center',
        borderRadius:10,
        padding: 15,
        marginTop:20
    },
    buttonText:{
        color:'#000000',
    },
    linkText:{
         color: '#FFD700',
  textAlign: 'center',
  marginTop: 16,
  fontSize: 14,
    }
});