import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const validateProfile = ({ nombre, apellido, comidaFavorita }) => {
  let errors = {};

  if (!nombre || nombre.trim().length < 3) {
    errors.nombre = 'El nombre debe tener al menos 3 caracteres';
  }

  if (!apellido || apellido.trim().length < 3) {
    errors.apellido = 'El apellido debe tener al menos 3 caracteres';
  }

  if (!comidaFavorita || comidaFavorita.trim().length < 3) {
    errors.comidaFavorita = 'La comida favorita debe tener al menos 3 caracteres';
  }

  return errors;
};

export default function HomeScreen({ navigation }) {
  const [profile, setProfile] = useState({
    nombre: '',
    apellido: '',
    comidaFavorita: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, 'usuarios', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    } catch (error) {
      console.error('Error al cargar perfil:', error);
      setErrors({ general: 'Error al cargar perfil: ' + error.message });
    } finally {
      setIsLoading(false); 
    }
  };

  const handleUpdate = async () => {
    const formErrors = validateProfile(profile);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    try {
      await setDoc(doc(db, 'usuarios', auth.currentUser.uid), profile);
      alert('Perfil actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      setErrors({ general: 'Error al actualizar perfil: ' + error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      setErrors({ general: 'Error al cerrar sesión: ' + error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>Mi Perfil</Text>
      {errors.general && <Text style={styles.error}>{errors.general}</Text>}
      <Input
        placeholder="Nombre"
        value={profile.nombre}
        onChangeText={(text) => {
          setProfile({ ...profile, nombre: text });
          setErrors((prev) => ({ ...prev, nombre: null }));
        }}
        errorMessage={errors.nombre}
        editable={!isLoading}
      />
      <Input
        placeholder="Apellido"
        value={profile.apellido}
        onChangeText={(text) => {
          setProfile({ ...profile, apellido: text });
          setErrors((prev) => ({ ...prev, apellido: null }));
        }}
        errorMessage={errors.apellido}
        editable={!isLoading}
      />
      <Input
        placeholder="Comida Favorita"
        value={profile.comidaFavorita}
        onChangeText={(text) => {
          setProfile({ ...profile, comidaFavorita: text });
          setErrors((prev) => ({ ...prev, comidaFavorita: null }));
        }}
        errorMessage={errors.comidaFavorita}
        editable={!isLoading} 
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#ff79c6" />
      ) : (
        <>
          <Button
            title="Actualizar Perfil"
            onPress={handleUpdate}
            containerStyle={styles.button}
            disabled={isLoading} 
            buttonStyle={styles.buttonStyle}
          />
          <Button
            title="Cerrar Sesión"
            type="outline"
            onPress={handleSignOut}
            containerStyle={styles.button}
            disabled={isLoading}
            buttonStyle={styles.buttonOutlineStyle}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1e1e2f',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#f8f8f2',
  },
  button: {
    marginVertical: 10,
  },
  buttonStyle: {
    backgroundColor: '#ff79c6',
  },
  buttonOutlineStyle: {
    borderColor: '#ff79c6',
    color: '#ff79c6',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
