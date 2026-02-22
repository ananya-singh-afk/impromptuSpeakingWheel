# Development Instructions

This guide helps you get the Impromptu Speaking Wheel project running locally.

## Starting Both Servers

You'll need to run both the backend and frontend servers. It's recommended to use two terminal windows.

### Terminal 1 - Backend Server

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

The backend will start on `http://localhost:5000`

### Terminal 2 - Frontend Development Server

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

## Building for Production

### Frontend Build

```bash
cd frontend
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Backend Deployment

For production deployment, you would typically use a production WSGI server like Gunicorn:

```bash
pip install gunicorn
gunicorn app:app
```

## Project Layout

- **backend/app.py** - Main Flask application with API routes
- **backend/requirements.txt** - Python dependencies
- **frontend/src/App.jsx** - Main React component
- **frontend/src/components/SpinningWheel.jsx** - Wheel component with canvas drawing
- **frontend/src/styles/** - CSS stylesheets
- **frontend/vite.config.js** - Vite configuration with dev server proxy

## Key Features Explained

### Spinning Wheel Mechanism
The wheel is drawn using HTML5 Canvas API. Each spin:
1. Generates a random end angle
2. Animates the rotation over 4 seconds with easing
3. Calculates which topic is at the top when rotation stops
4. Displays the selected topic

### Backend Data Flow
1. Frontend requests `/api/topics` on load
2. Backend scrapes mocktrialstrategies.com if needed
3. Falls back to hardcoded topics if scraping fails
4. Caches topics to avoid repeated scraping

### Frontend Styling
Uses a gradient background and smooth animations throughout:
- **Color palette**: Creams, light blues, and mid-blues
- **Responsive**: Works on mobile, tablet, and desktop
- **Animations**: Fade-in, slide-up, and spin transitions

## Debugging

### Check Backend Status
Visit `http://localhost:5000/api/health` to verify the backend is running.

### Check Topics Loading
Visit `http://localhost:5000/api/topics` to see all available topics.

### Browser DevTools
Press F12 in your browser to:
- Check the Console for any JavaScript errors
- View Network requests to the backend
- Inspect the canvas element being drawn

## Common Issues

**"Cannot connect to localhost:5000"**
- Make sure the backend is running in another terminal
- Check that port 5000 is not being used by another application

**"No topics displaying"**
- Backend may be having trouble scraping the website
- Check backend console for error messages
- The fallback topics should load regardless

**"Wheel not spinning smoothly"**
- This is normal on older devices - the animation uses requestAnimationFrame
- Check browser console for any errors
- Try a different browser to test

## Adding New Features

To add features to the wheel:
1. Modify `frontend/src/components/SpinningWheel.jsx`
2. Update styles in `frontend/src/components/SpinningWheel.css`
3. Add any new API endpoints to `backend/app.py`
4. The dev server has hot reload - changes reflect immediately

To customize topics:
1. Modify the fallback list in `backend/app.py` → `scrape_topics()` function
2. Or change the scraping logic to fetch from a different URL

To change colors:
1. Update color arrays in `SpinningWheel.jsx`
2. Update CSS gradients in `.css` files
3. Colors are: #FFF2C6, #FFF8DE, #AAC4F5, #8CA9FF
