# WeatherSense 🌤️

> "A weather app Apple could ship — but with unique intelligence."

WeatherSense is a reimagining of the digital weather experience. Moving away from cluttered dashboards and generic cards, it embraces **Calm Interaction Design**. The result is an application that feels atmospheric, responsive, and deeply human.

![WeatherSense Preview](https://via.placeholder.com/1200x600?text=WeatherSense+Premium+Design)

---

## 🎨 Design Philosophy

### 1. Immersive Atmosphere
Digital tools often feel separated from the physical world. WeatherSense bridges this gap by using a **dynamic, full-screen background system**. Instead of telling you it's raining, the entire interface *feels* like a rainy day.
- **Clear Morning**: Golden hour gradients with soft blue hues.
- **Storm**: Deep navy and purple tones with high contrast.
- **Snow**: Bright, crisp serenity.

### 2. Calm UI Principles
We rejected the "Information Overload" pattern found in most weather apps.
- **Floating Content**: No boxes, borders, or glass cards unless necessary.
- **Visual Hierarchy**: The temperature is the hero. Secondary data recedes.
- **Fluid Motion**: All transitions use physics-based easing (Framer Motion) to feel natural, not mechanical.

---

## 🏗️ Architecture & Features

### 🌈 Intelligent Background System (`/src/design/backgroundSystem.ts`)
The core of the visual experience. A dedicated logic layer maps raw weather data (ID, Temperature, Time) to specific CSS gradients.
- **Mathematical Maps**: 7 Conditions x 4 Times of Day = 28 unique atmospheric states.
- **Performance**: Zero distinct images loaded. Pure CSS generation means instant rendering and 60fps animations on any device.

### 🧘 unique "Weather Mood"
Data alone doesn't convey feeling. We implemented a semantic layer that translates `12°C, Rain, Wind 15km/h` into **"Wild & Stormy"**. This humanizes the forecast.

### 🕰️ Day Rhythm Timeline
Instead of a generic list, we present the day as a story: **Morning → Afternoon → Evening → Night**. This helps users plan their day intuitively.
- **Smart Aggregation**: The app scans the next 24 hours of forecast data to pick representative weather points for each phase of the day.

### 🤖 Minimal AI
We use Large Language Models (LLMs) ethically and sparingly.
- **No Chatbots**: Weather isn't a conversation.
- **Smart Summary**: A single, high-value sentence (e.g., *"Perfect for a run, but bring a light jacket as winds pick up."*).
- **Cached**: AI requests are aggressively cached to respect user data and API costs.

---

## ⚡ Performance Engineering

Speed is a feature.
1.  **Zero Layout Shift (CLS)**: All images have explicit dimensions. Skeletons occupy exact pixel space during loading.
2.  **Request Deduplication**: Rapid typing in the search bar cancels stale requests via `AbortController`, saving battery and bandwidth.
3.  **Local-First**: Geolocation and preferences are resolved instantly.
4.  **Optimized Bundle**: Tree-shaken icons (Lucide React) and minimal dependencies.

---

## 🏃‍♂️ Getting Started

1.  **Clone the repo**
    ```bash
    git clone https://github.com/yourusername/weathersense.git
    cd weathersense
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file:
    ```env
    VITE_API_KEY=your_openweathermap_key
    VITE_AI_API_KEY=your_openai_key (optional)
    ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```

---

## 📸 Gallery

| Mobile | Tablet | Desktop |
|--------|--------|---------|
| ![Mobile](https://via.placeholder.com/300x600?text=Mobile) | ![Tablet](https://via.placeholder.com/400x500?text=Tablet) | ![Desktop](https://via.placeholder.com/600x400?text=Desktop) |

---

*Designed with ❤️ by a Product Engineer who loves rain.*
