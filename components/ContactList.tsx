import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import * as ExpoContacts from 'expo-contacts';
import { SortedContactType } from '../screens/Contacts';
import { useNavigation } from '@react-navigation/native';

export const ContactList = ({
  phoneContacts,
}: {
  phoneContacts: SortedContactType;
}) => {
  const navigation = useNavigation();

  const renderSectionHeader = ({ section }: { section: { title: string } }) => (
    <View style={styles.sectionHeader}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{section.title}</Text>
    </View>
  );

  const renderItem = ({ item }: { item: ExpoContacts.Contact }) => {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.contactItem,
          { backgroundColor: pressed ? '#E0E0E0' : 'white' },
        ]}
        onPress={() => navigation.navigate('ContactDetails', { item })}
      >
        <Text>{item.name}</Text>
      </Pressable>
    );
  };
  return (
    <SectionList
      sections={phoneContacts}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  contactItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
});
