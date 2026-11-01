import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';

export default function TicketImagePicker({ onPicked }) {
  const [uri, setUri] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });
    if (!result.canceled) {
      const picked = result.assets[0].uri;
      setUri(picked);
      if (onPicked) onPicked(picked);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Attach screenshot" onPress={pickImage} />
      {uri && <Image source={{ uri }} style={styles.preview} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 12 },
  preview: { width: 200, height: 200, borderRadius: 8 },
});
