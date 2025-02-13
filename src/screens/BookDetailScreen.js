import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export default function BookDetailScreen({ route, navigation }) {
  const { book } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {book.imageLinks?.thumbnail && (
        <Image source={{ uri: book.imageLinks.thumbnail }} style={styles.image} />
      )}
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>Autor(es): {book.authors?.join(', ')}</Text>
      <Text style={styles.description}>{book.description || 'Sin descripción disponible'}</Text>
      <Button title="Volver a la Librería" onPress={() => navigation.goBack()} buttonStyle={styles.button} containerStyle={styles.buttonContainer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#1e1e2f'
  },
  image: {
    width: 150,
    height: 200,
    marginBottom: 15,
    borderRadius: 10
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#ffcc00'
  },
  author: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 10
  },
  description: {
    fontSize: 14,
    textAlign: 'justify',
    marginBottom: 20,
    color: '#ffffff'
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20
  },
  button: {
    backgroundColor: '#ff6600',
    borderRadius: 8
  }
});
