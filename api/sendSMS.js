import * as Sentry from '@sentry/node';
import Twilio from 'twilio';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID,
    },
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: 'Missing "to" or "message" in request body' });
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const client = Twilio(accountSid, authToken);

  try {
    const msg = await client.messages.create({
      body: message,
      from: fromNumber,
      to: to,
    });
    res.status(200).json({ message: 'SMS sent', sid: msg.sid });
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error sending SMS:', error);
    res.status(500).json({ error: 'Error sending SMS' });
  }
}