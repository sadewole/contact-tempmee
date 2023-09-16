import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Contacts from './screens/Contacts';
import ContactDetails from './screens/ContactDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Contacts' component={Contacts} />
          <Stack.Screen name='ContactDetails' component={ContactDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
