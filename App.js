import '@react-native-firebase/app';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-native-paper';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from './src/screens/homescreen';
import LoginScreen from './src/screens/LoginScreen';
import Signup from './src/screens/signupscreen';
import History from './src/screens/historyscreen';
import Profile from './src/screens/profilescreen';

const Stack = createNativeStackNavigator();
const Tab=createBottomTabNavigator();
function Maintab() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: true,
      headerStyle: { backgroundColor: '#FF0000' },
      headerTintColor: '#000000',
      tabBarStyle: { backgroundColor: '#FF0000' },
      tabBarActiveTintColor: '#00FF7F',
      tabBarInactiveTintColor: '#ffffff',
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') iconName = 'home';
        else if (route.name === 'History') iconName = 'time';
        else if (route.name === 'Profile') iconName = 'person';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
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
    <Provider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0f0f0f' } }}>
        {user ?(
          <>
          <Stack.Screen name="Main" component={Maintab} />
          
          </>
        ):(
          <>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={Signup}/>
        </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
