from flask import Flask, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import os

app = Flask(__name__)
CORS(app)

# Cache topics
TOPICS_CACHE = None

def scrape_topics():
    """Scrape impromptu speech topics from the URL"""
    global TOPICS_CACHE
    
    if TOPICS_CACHE:
        return TOPICS_CACHE
    
    try:
        url = "https://www.mocktrialstrategies.com/one-minute-impromptu-speeches/"
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find all text content and extract topics
        topics = []
        
        # Get all paragraphs and extract non-empty text
        for p in soup.find_all('p'):
            text = p.get_text().strip()
            if text and len(text) > 3 and text not in ['', ' ']:
                # Filter out navigation and metadata
                if not any(skip in text for skip in ['Copyright', 'Skip to content', 'Mobile Menu', 'tablet', 'Theme', 'OceanWP']):
                    topics.append(text)
        
        # Remove duplicates while preserving order
        seen = set()
        unique_topics = []
        for topic in topics:
            if topic not in seen and len(topic) < 200:  # Filter out very long text blocks
                seen.add(topic)
                unique_topics.append(topic)
        
        TOPICS_CACHE = unique_topics[:50]  # Limit to first 50 topics
        return TOPICS_CACHE
    
    except Exception as e:
        print(f"Error scraping topics: {e}")
        # Return fallback topics
        return [
            "Love is blind",
            "What I did last summer",
            "The movie everyone must see and why",
            "What I am going to do next summer",
            "My favorite hobby and why",
            "Is anger positive or negative?",
            "My favorite pet peeve",
            "Who is my hero and why?",
            "Life is a bowl of cherries",
            "My favorite class",
            "If I could be anyone, who would it be?",
            "Does money make a person happy?",
            "My favorite book and why?",
            "One place I would like to see and why",
            "The description of my ideal partner",
            "What will I be like at age 50?",
            "Who is my favorite artist and why?",
            "Do horror movies have any socially redeeming value?",
            "If I had to lose sight or hearing which would it be and why?",
            "What are the bare necessities of life?",
            "What is my favorite meal and why?",
            "Should justice be blind?",
            "What is your favorite animal and why?",
            "What would it take for you to give up your cell phone for a year?",
            "Are you an introvert or extrovert and why?",
            "What is your favorite sport and why?",
            "What is your ideal job?",
            "Would you rather be a hammer or a nail?",
            "Describe your favorite recipe and how to make it",
            "Can hatred ever be a good thing?"
        ]

@app.route('/api/topics', methods=['GET'])
def get_topics():
    """Return list of impromptu speech topics"""
    topics = scrape_topics()
    return jsonify({
        'topics': topics,
        'count': len(topics)
    })

@app.route('/api/random-topic', methods=['GET'])
def get_random_topic():
    """Return a random impromptu speech topic"""
    import random
    topics = scrape_topics()
    if topics:
        return jsonify({
            'topic': random.choice(topics)
        })
    return jsonify({'error': 'No topics available'}), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
