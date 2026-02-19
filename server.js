require('dotenv').config();
const express = require('express');
const cors = require('cors');
const textToSpeech = require('@google-cloud/text-to-speech');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize Google Cloud TTS client
const client = new textToSpeech.TextToSpeechClient();

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// TTS Endpoint - Stream audio directly
app.post('/api/speak', async (req, res) => {
  try {
    const { 
      text, 
      languageCode = 'id-ID',
      voiceName = 'id-ID-Standard-A',
      ssmlGender = 'FEMALE'
    } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Text is required' });
    }

    const request = {
      input: { text: text },
      voice: {
        languageCode: languageCode,
        name: voiceName,
        ssmlGender: ssmlGender
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: 1.0,
        pitch: 0.0
      }
    };

    const [response] = await client.synthesizeSpeech(request);
    
    // Set headers for audio streaming
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': response.audioContent.length
    });
    
    // Send audio buffer directly
    res.send(response.audioContent);

  } catch (error) {
    console.error('TTS Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate speech',
      message: error.message 
    });
  }
});

// List available voices (all languages - standard only)
app.get('/api/voices', async (req, res) => {
  try {
    const [result] = await client.listVoices();
    
    // Filter only standard voices (exclude WaveNet, Neural2, etc.)
    const standardVoices = result.voices.filter(voice => {
      const name = voice.name.toLowerCase();
      return name.includes('standard') && !name.includes('wavenet') && !name.includes('neural') && !name.includes('polyglot');
    });
    
    res.json({
      voices: standardVoices.map(voice => ({
        name: voice.name,
        gender: voice.ssmlGender,
        languageCodes: voice.languageCodes,
        naturalSampleRateHertz: voice.naturalSampleRateHertz
      }))
    });
  } catch (error) {
    console.error('Error fetching voices:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 TTS Server running on http://localhost:${PORT}`);
  console.log(`📖 Open browser to http://localhost:${PORT} to test`);
});

module.exports = app;
