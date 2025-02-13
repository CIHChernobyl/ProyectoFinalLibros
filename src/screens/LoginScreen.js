import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateLoginForm = () => {
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isPasswordValid = password.length > 0;
    return isEmailValid && isPasswordValid;
  };

  const handleLogin = async () => {
    setIsLoading(true); 
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Library');
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Proyecto Final</Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError(null); 
        }}
        autoCapitalize="none"
        errorMessage={!/\S+@\S+\.\S+/.test(email) && email ? 'Email no válido' : ''}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
      />
      <Input
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError(null);
        }}
        secureTextEntry
        errorMessage={password === '' ? 'La contraseña es requerida' : ''}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {isLoading ? (
        <ActivityIndicator size="large" color="#6a1b9a" />
      ) : (
        <Button
          title="Iniciar Sesión"
          onPress={handleLogin}
          disabled={!validateLoginForm() || isLoading}
          containerStyle={styles.button}
          buttonStyle={styles.primaryButton}
          titleStyle={styles.buttonText}
        />
      )}
      <Button
        title="Registrarse"
        type="outline"
        onPress={() => navigation.navigate('Register')}
        disabled={isLoading}
        containerStyle={styles.button}
        buttonStyle={styles.secondaryButton}
        titleStyle={styles.buttonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#333333',
  },
  inputContainer: {
    borderBottomColor: '#6a1b9a',
    borderBottomWidth: 2,
  },
  inputText: {
    color: '#333333',
  },
  button: {
    marginVertical: 10,
  },
  primaryButton: {
    backgroundColor: '#6a1b9a',
  },
  secondaryButton: {
    borderColor: '#6a1b9a',
  },
  buttonText: {
    color: '#ffffff',
  },
  error: {
    color: '#e53935',
    textAlign: 'center',
    marginBottom: 10,
  },
});
