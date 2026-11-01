import { useState } from 'react';
import {
  ActivityIndicator, Button, ScrollView, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import TicketImagePicker from './components/TicketImagePicker';
import { uploadImage } from './services/cloudinary';
import { sendTicketEmail } from './services/emailjs';

const CATEGORIES = ['Account Problem', 'Technical Issue', 'Payment Concern', 'Other'];
const input = { borderWidth: 1, borderColor: '#999', borderRadius: 6, padding: 10 };

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [localUri, setLocalUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const validate = () => {
    if (!name.trim()) return 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(email)) return 'Please enter a valid email address.';
    if (!category) return 'Please choose an issue category.';
    if (!message.trim()) return 'Please enter a message.';
    if (!localUri) return 'Please attach a screenshot.';
    return null;
  };

  const handleSubmit = async () => {
    if (loading) return;
    const problem = validate();
    if (problem) {
      setStatus({ ok: false, text: problem });
      return;
    }
    setLoading(true);
    setStatus(null);
    try {
      const imageUrl = await uploadImage(localUri); // email is not sent if this fails
      await sendTicketEmail({ name, email, category, message, imageUrl });
      setStatus({ ok: true, text: 'Ticket sent successfully!' });
      setName(''); setEmail(''); setCategory(''); setMessage(''); setLocalUri(null);
    } catch (e) {
      setStatus({ ok: false, text: e.text || e.message || 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 60, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Customer Support</Text>
      <TextInput style={input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={input} placeholder="Email address" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <Text>Issue category</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {CATEGORIES.map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => setCategory(c)}
            style={{
              padding: 8, borderRadius: 16, borderWidth: 1, borderColor: '#999',
              backgroundColor: category === c ? '#2563eb' : 'transparent',
            }}
          >
            <Text style={{ color: category === c ? '#fff' : '#000' }}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput style={[input, { height: 100 }]} placeholder="Message" value={message} onChangeText={setMessage} multiline />
      <TicketImagePicker onPicked={setLocalUri} />
      <Button title="Submit" onPress={handleSubmit} disabled={loading} />
      {loading && <ActivityIndicator />}
      {status && <Text style={{ color: status.ok ? 'green' : 'red' }}>{status.text}</Text>}
    </ScrollView>
  );
}