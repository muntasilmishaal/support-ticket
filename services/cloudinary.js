import { Platform } from 'react-native';

const CLOUD_NAME = process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export async function uploadImage(uri) {
  const formData = new FormData();

  if (Platform.OS === 'web') {
    // Browsers need a real file, so fetch the picked image as a blob first
    const blob = await (await fetch(uri)).blob();
    formData.append('file', blob, 'ticket.jpg');
  } else {
    formData.append('file', {
      uri,
      type: 'image/jpeg',
      name: 'ticket.jpg',
    });
  }
  formData.append('upload_preset', UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: 'POST', body: formData }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || 'Upload failed');
  }
  return data.secure_url;
}