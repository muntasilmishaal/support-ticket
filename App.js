import { View } from 'react-native';
import TicketImagePicker from './components/TicketImagePicker';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <TicketImagePicker />
    </View>
  );
}