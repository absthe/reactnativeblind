const handleRecognitionResult = (event, setTranscript, performAction, synth) => {
  const transcript = Array.from(event.results)
    .map(result => result[0].transcript)
    .join('')
    .trim();

  setTranscript(transcript);
  speakText(synth, `You said: ${transcript}`);
  performAction(transcript.toLowerCase());
};

const speakText = (synth, text) => {
  const utter = new SpeechSynthesisUtterance(text);
  synth.speak(utter);
};

export default handleRecognitionResult;
