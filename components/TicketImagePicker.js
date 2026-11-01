import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

export default function TicketImagePicker({ onPicked }) {
  const [uri, setUri] = useState(null);
  const [message, setMessage] = useState(null);

  const pickImage = async () => {
    setMessage(null);
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setMessage('Permission denied. Please allow gallery access to attach a screenshot.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });
    if (result.canceled) {
      setMessage('No image selected.');
      return;
    }
    const picked = result.assets[0].uri;
    setUri(picked);
    if (onPicked) onPicked(picked);
  };

  const removeImage = () => {
    setUri(null);
    if (onPicked) onPicked(null);
  };

  return (
    <View style={styles.container}>
      <Button title={uri ? 'Change screenshot' : 'Attach screenshot'} onPress={pickImage} />
      {uri && <Image source={{ uri }} style={styles.preview} />}
      {uri && <Button title="Remove screenshot" color="#c00" onPress={removeImage} />}
      {message && <Text style={{ color: '#c00' }}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 12 },
  preview: { width: 200, height: 200, borderRadius: 8 },
});