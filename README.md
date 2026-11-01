# Support Ticket App

A React Native (Expo) app where a user fills in a support ticket, attaches a screenshot, and sends it to the support team by email.

## Features
- Ticket form with name, email, title, and description
- Screenshot picker using `expo-image-picker`
- Image upload to Cloudinary
- Email sending with EmailJS, including the screenshot link
- Loading indicator and success or error message

## Tech Stack
- React Native with Expo (JavaScript)
- Cloudinary (image hosting)
- EmailJS (email service)
- Git and GitHub for teamwork

## Team and Contributions
| Member | GitHub | Contribution |
|---|---|---|
| Misha-al Muntasil | muntasilmishaal | Project setup, image picker, EmailJS email, README |
| PARTNER B NAME | Dianarose21 | Cloudinary image upload |

## Project Structure
```
App.js                      Main screen and ticket form
components/TicketImagePicker.js   Image picker and preview
services/cloudinary.js      Uploads the image to Cloudinary
services/emailjs.js         Sends the ticket email
```

## Setup
1. Clone the repo:
   ```
   git clone https://github.com/muntasilmishaal/support-ticket.git
   cd support-ticket
   ```
2. Install the packages:
   ```
   npm install
   ```
3. Create a `.env` file in the project root (same folder as `App.js`) with your own values:
   ```
   EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME=
   EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
   EXPO_PUBLIC_EMAILJS_SERVICE_ID=
   EXPO_PUBLIC_EMAILJS_TEMPLATE_ID=
   EXPO_PUBLIC_EMAILJS_PUBLIC_KEY=
   ```
4. Start the app:
   ```
   npx expo start
   ```
   Press `w` to open it in the browser, or scan the QR code with Expo Go.

## Service Setup
- **Cloudinary:** create an **unsigned** upload preset and use its name and your cloud name.
- **EmailJS:** create an email service and a template that uses `{{name}}`, `{{email}}`, `{{title}}`, `{{message}}`, and `{{time}}`.

## Notes
- The `.env` file is not committed to GitHub. Never share your real keys.
- Both partners' commits are in the Git history.