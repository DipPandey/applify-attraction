import Message from '../models/Message';

export function getTimingAdvice(lastMessageTimestamp) {
  if (!lastMessageTimestamp) return '';

  const now = new Date();
  const lastMessageTime = new Date(lastMessageTimestamp);
  const timeDifference = now - lastMessageTime;
  const hoursDifference = timeDifference / (1000 * 60 * 60);

  if (hoursDifference < 1) {
    return "It's okay to respond quickly, but don't feel pressured to reply immediately.";
  } else if (hoursDifference < 3) {
    return "This is a good time to respond. You've given some time but haven't waited too long.";
  } else if (hoursDifference < 12) {
    return "You might want to respond soon. It's been a while since the last message.";
  } else if (hoursDifference < 24) {
    return "It's been quite some time. Consider responding with an apology for the delay.";
  } else {
    return "It's been more than a day. If you're still interested, apologize for the late response and try to re-engage the conversation.";
  }
}

export async function getTimingScore() {
  try {
    const messages = await Message.find({}).sort({ timestamp: -1 }).limit(2);
    if (messages.length < 2) return null;

    const timeDifference = messages[0].timestamp - messages[1].timestamp;
    const hoursDifference = timeDifference / (1000 * 60 * 60);

    if (hoursDifference < 0.5) return 5; // Quick response
    if (hoursDifference < 2) return 4; // Good timing
    if (hoursDifference < 6) return 3; // Okay timing
    if (hoursDifference < 12) return 2; // Slow response
    return 1; // Very slow response
  } catch (error) {
    console.error('Error calculating timing score:', error);
    return null;
  }
}
