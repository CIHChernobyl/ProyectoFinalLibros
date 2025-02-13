import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { fetchBooks } from '../config/api';

export default function LibraryScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const data = await fetchBooks();
    setBooks(data.books || []);
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: '#f4f4f4' }}>
      <Button 
        title="Ir a Perfil" 
        onPress={() => navigation.navigate('Home')} 
        containerStyle={{ marginBottom: 10 }}
        buttonStyle={{ backgroundColor: '#6a1b9a' }}
        titleStyle={{ color: '#ffffff' }}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#6a1b9a" />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListItem bottomDivider onPress={() => navigation.navigate('BookDetail', { book: item })} containerStyle={{ backgroundColor: '#ffffff', borderBottomColor: '#e0e0e0', borderBottomWidth: 1 }}>
              <ListItem.Content>
                <ListItem.Title style={{ color: '#333333' }}>{item.title}</ListItem.Title>
                <ListItem.Subtitle style={{ color: '#888888' }}>{item.authors?.join(', ')}</ListItem.Subtitle>
              </ListItem.Content>
              <Button title="Ver Detalles" onPress={() => navigation.navigate('BookDetail', { book: item })} buttonStyle={{ backgroundColor: '#6a1b9a' }} titleStyle={{ color: '#ffffff' }} />
            </ListItem>
          )}
        />
      )}
    </View>
  );
}
