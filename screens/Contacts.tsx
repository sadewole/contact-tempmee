import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ExpoContacts from 'expo-contacts';
import { ContactList } from '../components/ContactList';

export type SortedContactType = Array<{
  title: string;
  data: ExpoContacts.Contact[];
}>;

export default function Contacts() {
  const [phoneContacts, setPhoneContacts] = React.useState<SortedContactType>(
    []
  );
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    (async () => {
      const { status } = await ExpoContacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await ExpoContacts.getContactsAsync({
          fields: [
            ExpoContacts.Fields.PhoneNumbers,
            ExpoContacts.Fields.Emails,
            ExpoContacts.Fields.Company,
            ExpoContacts.Fields.Addresses,
            ExpoContacts.Fields.Birthday,
          ],
        });

        if (data.length > 0) {
          const sortedContacts = organizeContacts(data);
          setPhoneContacts(sortedContacts);
        }
      }
    })();
  }, []);

  const organizeContacts = (contacts: ExpoContacts.Contact[]) => {
    const organized: Record<string, ExpoContacts.Contact[]> = {};
    contacts.forEach((contact) => {
      const firstLetter = contact.name.charAt(0).toUpperCase();
      if (!organized[firstLetter]) {
        organized[firstLetter] = [];
      }
      organized[firstLetter].push(contact);
    });

    // Convert to SectionList data format
    const sections = Object.keys(organized).map((key) => ({
      title: key,
      data: organized[key],
    }));

    // Sort sections alphabetically
    return sections.sort((a, b) => a.title.localeCompare(b.title));
  };

  const filteredContacts = phoneContacts.reduce((acc, current) => {
    const data = current.data.filter((contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (data.length > 0) {
      acc.push(current);
    }
    return acc;
  }, [] as SortedContactType);

  const totalContacts = filteredContacts.reduce(
    (acc, curr) => acc + curr.data.length,
    0
  );

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>All Contacts</Text>
        <Text style={styles.subtitle}>
          <FontAwesome name='user' size={16} /> Showing {totalContacts} contact
          {totalContacts > 1 ? 's' : ''}
        </Text>
      </View>
      <View style={styles.textInput}>
        <FontAwesome name='search' size={16} color='#DEDEDE' />
        <TextInput
          placeholder='Search contacts'
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      <ContactList phoneContacts={filteredContacts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 5 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
  },
  textInput: {
    marginHorizontal: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 0.7,
    borderRadius: 24,
    marginVertical: 10,
    borderColor: '#515151',
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    gap: 6,
  },
});
