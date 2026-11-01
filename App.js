import { useState } from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import TicketImagePicker from './components/TicketImagePicker';
import { uploadImage } from './services/cloudinary';

export default function App() {
  const [localUri, setLocalUri] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpload = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = await uploadImage(localUri);
      setImageUrl(url);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24, gap: 16 }}>
      <TicketImagePicker onPicked={setLocalUri} />
      {localUri && <Button title="Upload to Cloudinary" onPress={handleUpload} />}
      {loading && <ActivityIndicator />}
      {imageUrl && <Text selectable>Uploaded: {imageUrl}</Text>}
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
}