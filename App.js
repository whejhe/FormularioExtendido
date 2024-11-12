import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import Register from './app/screens/Register';
import List from './app/screens/List';
import Details from './app/screens/Details';
import Perfil from './app/screens/Perfil';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout(){
  return(
    <InsideStack.Navigator>
      <InsideStack.Screen name='My App' component={List} />
      <InsideStack.Screen name='Details' component={Details} />
      <InsideStack.Screen name='Perfil' component={Perfil} />
    </InsideStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState(user);

  useEffect(() => {
    
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Register'>
        {user ? (
          <Stack.Screen name='Inside' component={InsideLayout} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}