import { useState } from 'react';
import {
  ActivityIndicator, Button, ScrollView, Text, TextInput, View,
} from 'react-native';
import TicketImagePicker from './components/TicketImagePicker';
import { uploadImage } from './services/cloudinary';
import { sendTicketEmail } from './services/emailjs';

const input = {
  borderWidth: 1, borderColor: '#999', borderRadius: 6, padding: 10,
};

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [localUri, setLocalUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const imageUrl = localUri ? await uploadImage(localUri) : null;
      await sendTicketEmail({ name, email, title, message, imageUrl });
      setStatus({ ok: true, text: 'Ticket sent!' });
    } catch (e) {
      setStatus({ ok: false, text: e.text || e.message || 'Something went wrong' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 60, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Support Ticket</Text>
      <TextInput style={input} placeholder="Your name" value={name} onChangeText={setName} />
      <TextInput style={input} placeholder="Your email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={input} placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput style={[input, { height: 100 }]} placeholder="Describe the problem" value={message} onChangeText={setMessage} multiline />
      <TicketImagePicker onPicked={setLocalUri} />
      <Button title="Submit ticket" onPress={handleSubmit} disabled={loading} />
      {loading && <ActivityIndicator />}
      {status && (
        <Text style={{ color: status.ok ? 'green' : 'red' }}>{status.text}</Text>
      )}
    </ScrollView>
  );
}