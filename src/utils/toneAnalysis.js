// This is a simple implementation. For a more accurate analysis,
// you might want to use a natural language processing library or an API.

export function analyzeTone(message) {
  const lowercaseMessage = message.toLowerCase();
  
  if (lowercaseMessage.includes('love') || lowercaseMessage.includes('happy') || lowercaseMessage.includes('excited')) {
    return 'Positive';
  } else if (lowercaseMessage.includes('hate') || lowercaseMessage.includes('angry') || lowercaseMessage.includes('sad')) {
    return 'Negative';
  } else if (lowercaseMessage.includes('maybe') || lowercaseMessage.includes('perhaps') || lowercaseMessage.includes('possibly')) {
    return 'Uncertain';
  } else {
    return 'Neutral';
  }
}
