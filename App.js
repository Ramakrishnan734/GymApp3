import '@react-native-firebase/app';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import HomeScreen from './src/screens/homescreen';
import LoginScreen from './src/screens/LoginScreen';
import Signup from './src/screens/signupscreen';
import History from './src/screens/historyscreen';
import Profile from './src/screens/profilescreen';

const Stack = createNativeStackNavigator();
export default function App() {
  const [initializing,setinitialzing]=useState(true);
  const [user,setuser]=useState();
  function handleauthchange(user){
    setuser(user);
    if(initializing) setinitialzing(false);
  }
  useEffect(()=>{
    const subscriber=onAuthStateChanged(getAuth(),handleauthchange);
    return subscriber;
  },[]);
  if(initializing) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0f0f0f' } }}>
        {user ?(
          <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="Profile" component={Profile} />
          </>
        ):(
          <>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={Signup}/>
        </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
