import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
 import RegisterScreen from '../screens/RegisterScreen';
 import HomeScreen from '../screens/HomeScreen';
 import LibraryScreen from '../screens/LibraryScreen'; 
 import BookDetailScreen from '../screens/BookDetailScreen';
 const Stack = createNativeStackNavigator();
 export default function AppNavigator() {
 return (
 <NavigationContainer>
 <Stack.Navigator initialRouteName="Login">
 <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
 <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
<Stack.Screen name="Library" component={LibraryScreen} options={{ headerShown: true, title: 'Librería' }} />
 <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true, title: 'Mi Perfil' }} />
 <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ headerShown: true, title: 'Detalles del Libro' }} />
 </Stack.Navigator>
 </NavigationContainer>
  );
 }