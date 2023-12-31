import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Contacts from './screens/Contacts';
import ContactDetails from './screens/ContactDetails';
import { ContactProvider } from './context/ContactContext';
import { RootStackParamList } from './typeRoute';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ContactProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style='auto' />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Contacts' component={Contacts} />
            <Stack.Screen name='ContactDetails' component={ContactDetails} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ContactProvider>
  );
}
