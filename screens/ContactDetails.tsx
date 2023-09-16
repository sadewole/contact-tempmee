import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import * as ExpoContacts from 'expo-contacts';

const Divider = () => (
  <View
    style={{ borderBottomWidth: 1, borderColor: '#fff', marginVertical: 10 }}
  />
);

export default function ContactDetails({ navigation, route }: BaseScreenProps) {
  const { item } = route.params as { item: ExpoContacts.Contact };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', gap: 4 }}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name='chevron-left' size={16} color='#5B85EB' />
          <Text style={{ color: '#5B85EB' }}>Go back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={{ alignItems: 'center', paddingVertical: 6 }}>
          <View style={styles.avatar}>
            <Text style={[styles.avatarName, { color: '#fff' }]}>
              {item?.name[0].toUpperCase()}
            </Text>
          </View>
          <Text style={styles.avatarName}>{item?.name}</Text>
          <View style={{ flexDirection: 'row', gap: 24, marginTop: 10 }}>
            <TouchableOpacity style={styles.card}>
              <FontAwesome name='phone' size={24} color='#515151' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.card}>
              <AntDesign name='message1' size={24} color='#515151' />
            </TouchableOpacity>
          </View>
        </View>
        {/* PHONE NUMBER */}
        {item?.phoneNumbers?.length && (
          <View style={styles.card}>
            {item?.phoneNumbers.map((phoneNumber, index) => (
              <View key={index}>
                <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>
                  {phoneNumber.label}
                </Text>
                <Text style={{ color: '#5B85EB' }}>{phoneNumber.number}</Text>
                {index !== item?.phoneNumbers!.length - 1 && <Divider />}
              </View>
            ))}
          </View>
        )}
        {/* EMAIL */}
        {item?.emails?.length && (
          <View style={styles.card}>
            {item?.emails.map((email, index) => (
              <View key={index}>
                <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>
                  {email.label}
                </Text>
                <Text style={{ color: '#5B85EB' }}>{email.email}</Text>
                {index !== item?.emails!.length - 1 && <Divider />}
              </View>
            ))}
          </View>
        )}
        {/* ADDRESS */}
        {item?.addresses?.length && (
          <View>
            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 3 }}>
              Address(es)
            </Text>
            <View style={styles.card}>
              {item?.addresses.map((addr, index) => (
                <View key={index}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>
                    {addr.label}
                  </Text>
                  <Text style={{ color: '#5B85EB' }}>
                    {addr.street} {addr.city} {addr.region} {addr.postalCode}
                  </Text>
                  {index !== item?.addresses!.length - 1 && <Divider />}
                </View>
              ))}
            </View>
          </View>
        )}
        {/* BIRTHDAY */}
        {item?.birthday && (
          <View style={styles.card}>
            <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>
              birthday
            </Text>
            <Text style={{ color: '#5B85EB' }}>
              <AntDesign name='calendar' size={16} color='#515151' />{' '}
              {item?.birthday.day}-{item?.birthday.month}-{item?.birthday.year}
            </Text>
          </View>
        )}
        {/* COMPANY */}
        {item?.company && (
          <View style={styles.card}>
            <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>company</Text>
            <Text style={{ color: '#5B85EB' }}>{item?.company}</Text>
            {item?.jobTitle && (
              <Text style={{ marginTop: 3 }}>
                Job title:{' '}
                <Text style={{ color: '#5B85EB' }}>{item?.jobTitle}</Text>
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 5,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    backgroundColor: '#515151',
  },
  avatarName: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  card: {
    shadowColor: 'rgba(102, 102, 102, 0.15)',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 4,
    shadowRadius: 8,
    elevation: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#DEDEDE',
    marginBottom: 16,
  },
});
