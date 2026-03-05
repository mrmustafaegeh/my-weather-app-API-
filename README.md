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

## 🏗️ Technical Architecture & Systems Scale

### 🧠 Domain-Driven Design (`/src/domain`)
We strictly separate **business logic** from **UI components**.
- **`normalization.ts`**: The "Gatekeeper". Every API response is intercepted, sanitized, and typed before entering the application state. It rejects malformed data, clamps values (e.g., humidity 0-100), and ensures strictly typed contracts.
- **`weatherLogic.ts`**: Pure calculation modules that derive intelligence (Comfort Index, Stability Trends) from raw data. 100% testable and side-effect free.

### 🛡️ Data Integrity Strategy
Accuracy is non-negotiable.
1.  **Metric First**: The system core runs on Metric units. Conversions are handled at the very last display layer to prevent floating-point drift.
2.  **Schema Versioning**: The `CacheController` versions the IndexedDB schema. If the data model evolves, old cache entries are automatically invalidated, preventing "white screen of death" crashes.
3.  **Normalization Pipeline**: API responses are not trusted blindly. Missing fields trigger specific fallbacks or errors, rather than undefined UI states.

### ⚡ Performance Engineering
- **Request Deduplication**: `WeatherService` tracks in-flight promises. requesting "Paris" 5 times rapidly results in exactly **1** network call.
- **Stale Request Abortion**: Typing "New Y..." and correcting to "New Ark" cancels the previous searches instantly via `AbortController`, saving bandwidth and battery.
- **Render Discipline**: Components like `HourlyForecast` are optimized to only re-render when their specific data slice changes.
- **CLS = 0**: All image assets have explicit width/height attributes reserved before loading.

### ♿ Accessibility & SEO
- **Semantic HTML**: Proper `<header>`, `<main>`, `<section>` usage.
- **Contrast**: The "sunglasses" overlay (`bg-black/15`) ensures WCAG AA compliance even on bright weather backgrounds.
- **Reduced Motion**: All animations respect the user's OS preference for reduced motion.
- **Meta**: OpenGraph and Twitter card tags are dynamically updated (future enhancement).

---

## 🎨 Design System: "Atmospheric Realism"
We moved beyond "Glassmorphism" to **Atmospheric Depth**.
- **Procedural Backgrounds**: Instead of heavy JPGs, we use 28+ CSS-generated gradients mapped to `(Condition x Time_of_Day)`.
- **Noise Texture**: A specific SVG noise filter removes color banding and adds a "premium" film-grain texture.
- **Context-Aware UI**: The interface adapts to the weather. If it's storming, the "Trend" card highlights pressure drops. If it's hot, the "Comfort" index warns of heat stress.

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
