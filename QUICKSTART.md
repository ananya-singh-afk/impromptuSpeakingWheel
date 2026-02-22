# 🎡 Impromptu Speaking Wheel - Quick Start

Welcome! Your complete impromptu speaking wheel application is ready to use.

## 📁 Project Structure Created

```
impromptuSpeakingWheel/
├── backend/                   # Python Flask backend
│   ├── app.py                # Flask server with web scraping
│   ├── requirements.txt       # Python dependencies
│   └── .gitignore
├── frontend/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/       # SpinningWheel component
│   │   ├── styles/           # Global CSS
│   │   ├── App.jsx           # Main app component
│   │   └── main.jsx          # React entry point
│   ├── index.html            # HTML template
│   ├── vite.config.js        # Vite dev server config
│   ├── package.json          # NPM dependencies
│   └── .gitignore
├── README.md                  # Project overview
├── SETUP_GUIDE.md            # Complete setup instructions
├── DEVELOPMENT.md            # Development guide
└── .gitignore                # Global gitignore

```

## 🚀 Get Started in 5 Minutes

### Step 1: Start the Backend Server (Terminal 1)
```bash
cd backend
python -m venv venv

# On Windows:
venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python app.py
```

Wait for the message: `Running on http://127.0.0.1:5000`

### Step 2: Start the Frontend Server (Terminal 2)
```bash
cd frontend
npm install
npm run dev
```

Wait for the message: `Local: http://localhost:3000`

### Step 3: Open in Browser
Go to `http://localhost:3000` and start spinning the wheel! 🎯

## 🎨 Color Palette Used

The app uses this beautiful palette:
- **#FFF2C6** - Cream (primary accent)
- **#FFF8DE** - Light cream (background)
- **#AAC4F5** - Light blue (secondary)
- **#8CA9FF** - Mid blue (primary color)

## ✨ Key Features

✅ **Interactive Spinning Wheel** - Smooth animations with canvas rendering
✅ **30+ Topics** - Scraped from mocktrialstrategies.com + fallback topics
✅ **Responsive Design** - Works on desktop, tablet, and mobile
✅ **Beautiful UI** - Gradients, smooth transitions, professional styling
✅ **Real-time Data** - Backend caches topics for performance
✅ **Easy Customization** - Change colors, topics, and spin duration easily

## 📚 How It Works

1. **Frontend (React + Vite)**
   - Beautiful responsive UI with gradient backgrounds
   - Interactive wheel drawn using HTML5 Canvas
   - Smooth spin animation with easing
   - Displays selected topic with attractive styling

2. **Backend (Python Flask)**
   - Web scrapes impromptu topics from the URL
   - Provides API endpoints for the frontend
   - Caches topics to avoid repeated scraping
   - CORS enabled for frontend communication

3. **The Wheel**
   - 30+ colorful segments (rotates through your color palette)
   - Click anywhere on the wheel to spin
   - Red pointer at the top indicates selected topic
   - 4-second spin with smooth deceleration

## 🔧 Customization Tips

### Change Spin Speed
In `frontend/src/components/SpinningWheel.jsx`, line ~120:
```javascript
const duration = 4000;  // Change to desired milliseconds
```

### Add More Topics
In `backend/app.py`, modify the fallback topics list (around line 49).

### Change Colors
Update the `wheelColorsRef.current` array in `SpinningWheel.jsx`.

## 📖 Available Documents

- **SETUP_GUIDE.md** - Detailed setup and API documentation
- **DEVELOPMENT.md** - Contributing and debugging guide
- **README.md** - Project overview (original)

## 🐛 Troubleshooting

**Backend won't start?**
- Make sure Python 3.7+ is installed
- Try: `python --version`

**Frontend won't install?**
- Make sure Node.js 16+ is installed
- Try: `node --version`

**Can't connect frontend to backend?**
- Both servers must be running
- Backend on port 5000, Frontend on port 3000
- Check browser console (F12) for errors

**Topics not loading?**
- Check backend console for scraping errors
- Fallback topics will load automatically if needed

## 🎯 Next Steps

1. Customize the topics to your needs
2. Adjust colors if you want a different palette
3. Tweak the spin duration for faster/slower spins
4. Deploy to a web server (see DEVELOPMENT.md for production setup)

## 💡 Pro Tips

- Use the browser DevTools (F12) to debug
- Check `http://localhost:5000/api/topics` to see all topics
- The wheel animates smoothly even on older devices
- Mobile-friendly - works great on phones and tablets!

---

**Happy speaking! Give impromptu speeches a try! 🎤**

For detailed information, see SETUP_GUIDE.md or DEVELOPMENT.md
