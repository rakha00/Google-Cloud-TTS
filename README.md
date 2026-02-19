# Text to Speech

Aplikasi Text-to-Speech dengan Google Cloud API.

## Cara Menjalankan

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
- Pastikan file service account JSON dari Google Cloud ada di folder project
- File `.env` sudah berisi path ke service account

### 3. Jalankan Server
```bash
npm start
```

Atau mode development:
```bash
npm run dev
```

### 4. Buka Browser
Buka `http://localhost:3000`

## Endpoint API

- `POST /api/speak` - Convert text to speech
- `GET /api/voices` - List available voices
- `GET /api/health` - Health check
