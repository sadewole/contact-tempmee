import * as React from 'react';
import * as ExpoContacts from 'expo-contacts';

interface ContactContextType {
  favourite?: ExpoContacts.Contact;
  setFavourite: React.Dispatch<
    React.SetStateAction<ExpoContacts.Contact | undefined>
  >;
}

type ProviderProps = { children: React.ReactNode };

export const ContactContext = React.createContext({} as ContactContextType);

export const ContactProvider = ({ children }: ProviderProps) => {
  // Minimalise state for contact
  const [favourite, setFavourite] = React.useState<ExpoContacts.Contact>();

  return (
    <ContactContext.Provider value={{ favourite, setFavourite }}>
      {children}
    </ContactContext.Provider>
  );
};

export const useContact = () => {
  const context = React.useContext(ContactContext);

  if (context === undefined) {
    throw new Error('useContact must be used within a ContactProvider');
  }

  return context;
};
