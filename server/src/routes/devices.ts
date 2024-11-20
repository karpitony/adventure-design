import { Router, Request, Response } from 'express';
import admin from '../firebase/admin';

const router = Router();

const deviceTokens: string[] = [];

router.post('/', (req: any, res: any) => {
  const { deviceToken } = req.body;

  if (!deviceToken) {
    return res.status(400).json({ error: 'Device token is required!' });
  }

  if (!deviceTokens.includes(deviceToken)) {
    deviceTokens.push(deviceToken);
    console.log('Device token registered:', deviceToken);
  }

  res.status(201).json({ message: 'Device token registered successfully!' });
});

// POST /sendNotification - 다중 디바이스로 메시지 전송
router.post('/sendNotification', async (req: any, res: any) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: 'Title and body are required!' });
  }

  if (deviceTokens.length === 0) {
    return res.status(400).json({ error: 'No registered device tokens.' });
  }

  try {
    // Build the message object for Firebase Messaging
    const message = {
      notification: { title, body },
      tokens: deviceTokens,
    };

    // Send notifications using Firebase Admin SDK
    const messaging = admin.messaging() as any;
    const response = await messaging.sendMulticast(message);

    console.log(`${response.successCount} messages were sent successfully.`);
    console.log(`${response.failureCount} messages failed to send.`);

    // Log errors for failed tokens
    response.responses.forEach((resp:any, idx:any) => {
      if (!resp.success) {
        console.error(
          `Failed to send message to ${deviceTokens[idx]}:`,
          resp.error,
        );
      }
    });

    res.status(200).json({
      message: 'Notifications sent successfully!',
      successCount: response.successCount,
      failureCount: response.failureCount,
      responses: response.responses,
    });
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).json({ error: 'Failed to send notifications.', details: error });
  }
});

export default router;