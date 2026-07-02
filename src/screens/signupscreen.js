import{Alert, Button, StyleSheet, View,TextInput,TouchableOpacity,Text,Image} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {useState} from 'react';
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function Signup({navigation}){
    const [username, setusername] = useState("");
    const [email,setemail]= useState("");
    const [password,setpassword]=useState("");
    const [confirm,setconfirm]=useState(""); {/*  confirm password */}
  async function handlesignup()
    {
       if(password!==confirm)
       {
            Alert.alert("password incorrect ");
            return;
       }
       try{
        const userCredential=await createUserWithEmailAndPassword(getAuth(),email,password);
        const uid = userCredential.user.uid;
        await firestore().collection('users').doc(uid).set({
            username,
            email,
            uid
        });  
        await firestore().collection('usersnames').doc(username).set({email});
        console.log('email at signup:', email);
console.log('username at signup:', username);
        Alert.alert("Success","Account created");
       }
       catch(error)
       {
        Alert.alert("Error",error.message);
       }
    }
    return(
        <SafeAreaView style={styles.container}>
            {/*header*/}
            <View style={styles.heading}>
                <Image 
                        source={require('../../assets/icon.png')} 
                         style={{ width: 300, height: 200}}
                        />
                <Text style={styles.appname}>REP TRACK</Text>
                <Text style={styles.slogan}> Every Rep Every Win</Text>
            </View>
            {/*form*/}
            <View style={styles.form}>
            <Text style={styles.label}>USERNAME</Text>
            <TextInput  
            style={styles.input}
            placeholder='Username'
            placeholderTextColor="#888"
            value={username}
            onChangeText={setusername}
            autoCapitalize='none'
            />
            <Text style={styles.label}>EMAIL</Text>
            <TextInput  
            style={styles.input}
            placeholder='email'
            placeholderTextColor="#888"
            value={email}
            onChangeText={setemail}
            keyboardType='email-address'
            autoCapitalize='none'
            />
            <Text style={styles.label}>PASSWORD</Text>
            <TextInput
            style={styles.input}
            placeholder='Password'
            placeholderTextColor="#888"
            value={password}
            onChangeText={setpassword}
            secureTextEntry={true}
            />
            <Text style={styles.label}>CONFIRM PASSWORD</Text>
            <TextInput
            style={styles.input}
            placeholder='Password'
            placeholderTextColor="#888"
            value={confirm}
            onChangeText={setconfirm}
            secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={handlesignup}>
                <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Text style={styles.linkText}>Already have an account? Log In</Text>
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal: 24,
        backgroundColor:'#0000FF',
    },
     heading:{
        alignItems:'center',
    },
    appname:{
        fontSize:40,
        fontWeight:'bold',
        color:'#008B8B',
    },
    slogan:{
        fontSize:20,
        color:'#FFD700',
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
    linkText:{ color: '#FFD700',
  textAlign: 'center',
  marginTop: 16,
  fontSize: 14,
    }
});