import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.EXPO_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.EXPO_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.EXPO_PUBLIC_EMAILJS_PUBLIC_KEY;

export async function sendTicketEmail({ name, email, title, message, imageUrl }) {
  const params = {
    name,
    email,
    title,
    message: imageUrl ? `${message}\n\nScreenshot: ${imageUrl}` : message,
    time: new Date().toLocaleString(),
  };
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, params, { publicKey: PUBLIC_KEY });
}