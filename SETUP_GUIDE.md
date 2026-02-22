# Impromptu Speaking Wheel - Complete Guide

An interactive web application that provides random impromptu speaking topics to help users practice one-minute speeches. The wheel spinner generates engaging topics across various categories.

## Color Scheme

The application uses a beautiful pastel color palette:
- **Cream (#FFF2C6)** - Primary accent
- **Light Cream (#FFF8DE)** - Background accent  
- **Light Blue (#AAC4F5)** - Secondary accent
- **Mid Blue (#8CA9FF)** - Primary color

## Features

- **Interactive Spinning Wheel** - Click or tap to spin and get a random topic
- **30+ Curated Topics** - Topics scraped from mocktrialstrategies.com
- **Beautiful UI** - Responsive design with smooth animations
- **Fast & Lightweight** - Built with React and Vite for optimal performance
- **Real-time Data** - Backend fetches topics from external source with caching

## Project Structure

```
impromptuSpeakingWheel/
├── backend/
│   ├── app.py              # Flask application
│   └── requirements.txt     # Python dependencies
└── frontend/
    ├── src/
    │   ├── components/     # React components
    │   ├── styles/         # CSS stylesheets
    │   ├── App.jsx         # Main app component
    │   └── main.jsx        # Entry point
    ├── index.html          # HTML template
    ├── package.json        # Node dependencies
    └── vite.config.js      # Vite configuration
```

## Quick Start

### Prerequisites
- Python 3.7+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Start the Flask server:
```bash
python app.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## How to Use

1. Open the application in your browser (usually http://localhost:3000)
2. Click on the spinning wheel or the "SPIN THE WHEEL" button
3. Watch as the wheel spins and selects a random topic
4. Read the selected topic displayed below the wheel
5. You now have 1 minute to deliver an impromptu speech on that topic!

## API Endpoints

### GET `/api/topics`
Returns all available impromptu speech topics.

**Response:**
```json
{
  "topics": ["Love is blind", "What I did last summer", ...],
  "count": 30
}
```

### GET `/api/random-topic`
Returns a single random topic.

**Response:**
```json
{
  "topic": "My favorite hobby and why"
}
```

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

## Technologies Used

### Backend
- **Flask** - Lightweight Python web framework
- **BeautifulSoup4** - Web scraping library
- **Requests** - HTTP library
- **Flask-CORS** - Cross-Origin Resource Sharing

### Frontend
- **React** - JavaScript library for building user interfaces
- **Vite** - Next generation frontend build tool
- **Canvas API** - For drawing the interactive wheel

## Customization

### Adding More Topics

Edit the fallback topics in `backend/app.py` in the `scrape_topics()` function's exception handler.

### Changing Colors

Update the color arrays in:
- `frontend/src/components/SpinningWheel.jsx` - `wheelColorsRef` array
- `frontend/src/App.css` - Gradient colors
- `frontend/src/components/SpinningWheel.css` - Button and UI colors

### Adjusting Spin Duration

In `frontend/src/components/SpinningWheel.jsx`, change the `duration` variable in the `spinWheel()` function (currently set to 4000ms).

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Responsive Design** - Works seamlessly on all screen sizes
- **Optimized Canvas Rendering** - Smooth animations even on lower-end devices
- **Caching** - Backend caches topics to reduce external API calls
- **Fast Build** - Vite provides instant HMR (Hot Module Replacement)

## Troubleshooting

### Backend Connection Error
If the frontend can't connect to the backend:
- Ensure the backend is running on port 5000
- Check that CORS is properly configured
- Verify network connectivity between frontend and backend

### Topics Not Loading
- Check backend logs for scraping errors
- Verify the external URL (mocktrialstrategies.com) is accessible
- The fallback topics will be used if scraping fails

### Canvas Not Rendering
- Ensure JavaScript is enabled in your browser
- Check browser console for errors (F12)
- Try clearing browser cache

---

**Enjoy practicing your impromptu speaking skills!**
