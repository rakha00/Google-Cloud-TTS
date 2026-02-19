let allVoices = [];

// Country to flag SVG mapping (using Flag CDN)
const flagUrls = {
  'ar': 'https://flagcdn.com/w40/sa.png',
  'cmn': 'https://flagcdn.com/w40/cn.png',
  'cs': 'https://flagcdn.com/w40/cz.png',
  'da': 'https://flagcdn.com/w40/dk.png',
  'nl': 'https://flagcdn.com/w40/nl.png',
  'en': 'https://flagcdn.com/w40/gb.png',
  'fil': 'https://flagcdn.com/w40/ph.png',
  'fi': 'https://flagcdn.com/w40/fi.png',
  'fr': 'https://flagcdn.com/w40/fr.png',
  'de': 'https://flagcdn.com/w40/de.png',
  'el': 'https://flagcdn.com/w40/gr.png',
  'hi': 'https://flagcdn.com/w40/in.png',
  'hu': 'https://flagcdn.com/w40/hu.png',
  'id': 'https://flagcdn.com/w40/id.png',
  'it': 'https://flagcdn.com/w40/it.png',
  'ja': 'https://flagcdn.com/w40/jp.png',
  'ko': 'https://flagcdn.com/w40/kr.png',
  'nb': 'https://flagcdn.com/w40/no.png',
  'pl': 'https://flagcdn.com/w40/pl.png',
  'pt': 'https://flagcdn.com/w40/pt.png',
  'ru': 'https://flagcdn.com/w40/ru.png',
  'sk': 'https://flagcdn.com/w40/sk.png',
  'es': 'https://flagcdn.com/w40/es.png',
  'sv': 'https://flagcdn.com/w40/se.png',
  'tr': 'https://flagcdn.com/w40/tr.png',
  'uk': 'https://flagcdn.com/w40/ua.png',
  'vi': 'https://flagcdn.com/w40/vn.png'
};

// Sample text for each language
const sampleTexts = {
  'ar-XA': 'مرحبا، هذا هو صوتي',
  'cmn-CN': '你好，这是我的声音',
  'cmn-TW': '你好，這是我的聲音',
  'cs-CZ': 'Dobrý den, toto je můj hlas',
  'da-DK': 'Hej, dette er min stemme',
  'nl-NL': 'Hallo, dit is mijn stem',
  'en-AU': 'G\'day, this is my voice',
  'en-GB': 'Hello, this is my voice',
  'en-IN': 'Hello, this is my voice',
  'en-US': 'Hello, this is my voice',
  'fil-PH': 'Kamusta, ito ang aking boses',
  'fi-FI': 'Hei, tämä on minun ääneni',
  'fr-CA': 'Bonjour, c\'est ma voix',
  'fr-FR': 'Bonjour, c\'est ma voix',
  'de-DE': 'Hallo, das ist meine Stimme',
  'el-GR': 'Γεια σας, αυτή είναι η φωνή μου',
  'hi-IN': 'नमस्ते, यह मेरी आवाज़ है',
  'hu-HU': 'Helló, ez az én hangom',
  'id-ID': 'Halo, ini adalah suara saya',
  'it-IT': 'Ciao, questa è la mia voce',
  'ja-JP': 'こんにちは、これは私の声です',
  'ko-KR': '안녕하세요, 이것은 제 목소리입니다',
  'nb-NO': 'Hei, dette er stemmen min',
  'pl-PL': 'Cześć, to jest mój głos',
  'pt-BR': 'Olá, esta é a minha voz',
  'pt-PT': 'Olá, esta é a minha voz',
  'ru-RU': 'Привет, это мой голос',
  'sk-SK': 'Ahoj, toto je môj hlas',
  'es-ES': 'Hola, esta es mi voz',
  'sv-SE': 'Hej, det här är min röst',
  'tr-TR': 'Merhaba, bu benim sesim',
  'uk-UA': 'Привіт, це мій голос',
  'vi-VN': 'Xin chào, đây là giọng nói của tôi'
};

// Language names
const langNames = {
  'ar-XA': 'Arabic',
  'cmn-CN': 'Chinese (Simplified)',
  'cmn-TW': 'Chinese (Traditional)',
  'cs-CZ': 'Czech',
  'da-DK': 'Danish',
  'nl-NL': 'Dutch',
  'en-AU': 'English (Australia)',
  'en-GB': 'English (UK)',
  'en-IN': 'English (India)',
  'en-US': 'English (US)',
  'fil-PH': 'Filipino',
  'fi-FI': 'Finnish',
  'fr-CA': 'French (Canada)',
  'fr-FR': 'French',
  'de-DE': 'German',
  'el-GR': 'Greek',
  'hi-IN': 'Hindi',
  'hu-HU': 'Hungarian',
  'id-ID': 'Indonesian',
  'it-IT': 'Italian',
  'ja-JP': 'Japanese',
  'ko-KR': 'Korean',
  'nb-NO': 'Norwegian',
  'pl-PL': 'Polish',
  'pt-BR': 'Portuguese (Brazil)',
  'pt-PT': 'Portuguese',
  'ru-RU': 'Russian',
  'sk-SK': 'Slovak',
  'es-ES': 'Spanish',
  'sv-SE': 'Swedish',
  'tr-TR': 'Turkish',
  'uk-UA': 'Ukrainian',
  'vi-VN': 'Vietnamese'
};

// Load voices on page load
async function loadVoices() {
  try {
    const response = await fetch('/api/voices');
    const data = await response.json();
    allVoices = data.voices;
    
    populateCountries();
    
  } catch (error) {
    console.error('Error loading voices:', error);
    showStatus('Failed to load voices', 'error');
  }
}

function getFlagUrl(langCode) {
  const lang = langCode.split('-')[0].toLowerCase();
  return flagUrls[lang] || 'https://flagcdn.com/w40/un.png';
}

let selectedLangCode = '';

function toggleCountryDropdown() {
  const options = document.getElementById('countryOptions');
  options.classList.toggle('active');
}

function selectCountry(langCode, langName) {
  selectedLangCode = langCode;
  const trigger = document.querySelector('#countrySelect .custom-select-trigger');
  const flagUrl = getFlagUrl(langCode);
  trigger.innerHTML = `<img src="${flagUrl}" alt=""> <span>${langName}</span>`;
  
  document.getElementById('countryOptions').classList.remove('active');
  populateVoices(langCode);
}

function hasFlag(langCode) {
  const lang = langCode.split('-')[0].toLowerCase();
  return flagUrls.hasOwnProperty(lang);
}

function populateCountries() {
  const voicesByLang = {};
  const optionsContainer = document.getElementById('countryOptions');
  
  // Group voices by language, only include languages with flags
  allVoices.forEach(voice => {
    const langCode = voice.languageCodes[0];
    if (hasFlag(langCode) && !voicesByLang[langCode]) {
      voicesByLang[langCode] = [];
    }
    if (hasFlag(langCode)) {
      voicesByLang[langCode].push(voice);
    }
  });
  
  // Sort languages
  const sortedLangs = Object.keys(voicesByLang).sort((a, b) => {
    const nameA = langNames[a] || a;
    const nameB = langNames[b] || b;
    return nameA.localeCompare(nameB);
  });
  
  // Populate custom dropdown
  sortedLangs.forEach(langCode => {
    const flagUrl = getFlagUrl(langCode);
    const name = langNames[langCode] || langCode;
    
    const option = document.createElement('div');
    option.className = 'custom-option';
    option.innerHTML = `<img src="${flagUrl}" alt="${name}"> <span>${name}</span> <small>(${langCode})</small>`;
    option.onclick = () => selectCountry(langCode, name);
    optionsContainer.appendChild(option);
  });
}

let currentTestAudio = null;
let currentLanguageVoices = [];

async function testCurrentVoice() {
  const testBtn = document.getElementById('testVoiceBtn');
  const voiceSelect = document.getElementById('voice');
  
  // Stop if already playing
  if (currentTestAudio && !currentTestAudio.paused) {
    currentTestAudio.pause();
    currentTestAudio = null;
    testBtn.textContent = testBtn.dataset.originalText || '▶ Test';
    testBtn.classList.remove('playing');
    return;
  }
  
  if (!selectedLangCode || currentLanguageVoices.length === 0) {
    return;
  }
  
  const sampleText = sampleTexts[selectedLangCode] || 'Hello, this is a test';
  const voice = currentLanguageVoices[0]; // Use first available voice
  
  testBtn.dataset.originalText = testBtn.textContent;
  testBtn.innerHTML = '<span class="loading-spinner" style="width:12px;height:12px;margin:0;"></span>';
  testBtn.classList.add('playing');
  
  try {
    const response = await fetch('/api/speak', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: sampleText,
        languageCode: selectedLangCode,
        voiceName: voice.name,
        ssmlGender: voice.ssmlGender
      })
    });
    
    if (!response.ok) throw new Error('Failed');
    
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    
    currentTestAudio = new Audio(audioUrl);
    currentTestAudio.onended = () => {
      testBtn.textContent = testBtn.dataset.originalText || '▶ Test';
      testBtn.classList.remove('playing');
      currentTestAudio = null;
    };
    
    currentTestAudio.onerror = () => {
      testBtn.textContent = testBtn.dataset.originalText || '▶ Test';
      testBtn.classList.remove('playing');
      currentTestAudio = null;
    };
    
    currentTestAudio.play();
    testBtn.textContent = '■ Stop';
    
  } catch (error) {
    console.error('Test error:', error);
    testBtn.textContent = testBtn.dataset.originalText || '▶ Test';
    testBtn.classList.remove('playing');
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
  const select = document.getElementById('countrySelect');
  if (!select.contains(e.target)) {
    document.getElementById('countryOptions').classList.remove('active');
  }
});

function populateVoices(langCode) {
  const voiceSelect = document.getElementById('voice');
  const testBtn = document.getElementById('testVoiceBtn');
  
  voiceSelect.innerHTML = '<option value="" disabled selected>Select voice</option>';
  voiceSelect.disabled = false;
  
  // Get voices for selected language
  currentLanguageVoices = allVoices.filter(v => v.languageCodes[0] === langCode);
  
  currentLanguageVoices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.dataset.gender = voice.gender;
    option.dataset.lang = selectedLangCode;
    
    // Simplified label: "Female A" or "Male B"
    const gender = voice.gender === 'FEMALE' ? 'Female' : 'Male';
    const letter = voice.name.split('-').pop();
    option.textContent = `${gender} ${letter}`;
    
    voiceSelect.appendChild(option);
  });
  
  // Auto-select first voice
  if (voiceSelect.options.length > 1) {
    voiceSelect.selectedIndex = 1;
  }
  
  // Enable test button
  testBtn.disabled = false;
  testBtn.textContent = '▶ Test';
  testBtn.classList.remove('playing');
}

async function speak() {
  const text = document.getElementById('text').value.trim();
  const voiceSelect = document.getElementById('voice');
  
  if (!selectedLangCode) {
    showStatus('Please select a language', 'error');
    return;
  }
  
  if (!voiceSelect.value) {
    showStatus('Please select a voice', 'error');
    return;
  }
  
  const voiceName = voiceSelect.value;
  const gender = voiceSelect.options[voiceSelect.selectedIndex].dataset.gender;
  
  const playBtn = document.getElementById('playBtn');
  const status = document.getElementById('status');
  const audioPlayer = document.getElementById('audioPlayer');
  
  if (!text) {
    showStatus('Please enter some text', 'error');
    return;
  }
  
  // Disable button and show loading
  playBtn.disabled = true;
  playBtn.innerHTML = '<span class="loading-spinner"></span>Processing...';
  showStatus('Generating speech...', 'loading');
  
  try {
    const response = await fetch('/api/speak', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        languageCode: selectedLangCode,
        voiceName: voiceName,
        ssmlGender: gender
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate audio');
    }
    
    // Get audio blob
    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);
    
    // Set audio source and play
    audioPlayer.src = audioUrl;
    audioPlayer.style.display = 'block';
    audioPlayer.play();
    
    showStatus('Playing audio...', 'success');
    
    // Hide success message after audio ends
    audioPlayer.onended = () => {
      status.style.display = 'none';
    };
    
  } catch (error) {
    console.error('Error:', error);
    showStatus('Error: ' + error.message, 'error');
  } finally {
    playBtn.disabled = false;
    playBtn.textContent = 'Play';
  }
}

function showStatus(message, type) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.className = 'status ' + type;
}

// Load voices when page loads
loadVoices();

// Allow Ctrl+Enter to submit
document.getElementById('text').addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key === 'Enter') {
    speak();
  }
});
