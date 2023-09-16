import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContact } from '../context/ContactContext';

export default function FavouriteContact() {
  const navigation = useNavigation<BaseScreenProps>();
  const { favourite } = useContact();
  if (!favourite) return null;
  return (
    <View>
      <View style={styles.sectionHeader}>
        <AntDesign name='star' size={16} color='black' />
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.contactItem,
          { backgroundColor: pressed ? '#E0E0E0' : 'white' },
        ]}
        onPress={() =>
          navigation.navigate('ContactDetails', { item: favourite })
        }
      >
        <Text>{favourite?.name}</Text>
      </Pressable>
    </View>
  );
}

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
