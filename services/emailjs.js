import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.EXPO_PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = process.env.EXPO_PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = process.env.EXPO_PUBLIC_EMAILJS_PUBLIC_KEY;

export async function sendTicketEmail({ name, email, category, message, imageUrl }) {
  const params = {
    name,
    reply_to: email,
    issue_category: category,
    message,
    image_url: imageUrl,
  };
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, params, { publicKey: PUBLIC_KEY });
}