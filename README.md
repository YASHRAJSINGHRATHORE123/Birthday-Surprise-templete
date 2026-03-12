Live Link : https://happybirthdaykhargosh.netlify.app/
# 🎉 Birthday Surprise for Dr. Sahiba 💖

A beautiful, interactive, and mobile-responsive birthday celebration web application. This guide will help you easily customize the app with your own photos, music, and messages!

---

## 📸 1. How to Add Your Own Memory Images

**Ideal Image Size & Format:** 
- **Aspect Ratio:** Portrait mode (3:4 or 4:5 ratio) works best because the cards are vertical.
- **Resolution:** `1080 x 1350 pixels`, `900 x 1200 pixels`, or `600 x 800 pixels`.
- *Note: The app uses `object-cover`, which means it will automatically crop and fit any image you upload without stretching it, but portrait images will look the most perfect.*

**Steps to change images:**
1. Open the `public` folder in your project.
2. Add your new photos into this folder.
3. Rename your photos to match the code: `memory-1.jpg`, `memory-2.jpg`, `memory-3.jpg`, `memory-4.jpg`, `memory-5.jpg`.
4. *Alternative:* If your image is a `.png` or has a different name (like `sahiba-pic.jpg`), open `src/components/FlipCard.tsx`, scroll down to the `img` tag (around line 57), and change the `src` property to `` src={`/sahiba-pic.jpg`} ``.

---

## 🎵 2. How to Add Your Own Background Song

Currently, the app plays a default Happy Birthday song from a web link. Here is how you can add your own custom downloaded song:

**Steps to change the song:**
1. Get your favorite song in `.mp3` format.
2. Drag and drop the `.mp3` file into the `public` folder.
3. Rename it to something simple, for example: `my-song.mp3`.
4. Open the `src/App.tsx` file.
5. Scroll down to around **Line 30** where you see the `<audio>` tag:
   ```jsx
   {/* Background Music - Happy Birthday Song */}
   <audio 
     ref={audioRef} 
     src="https://archive.org/download/HappyBirthdayToYou_897/Happy_Birthday_To_You.mp3" 
     loop 
     preload="auto" 
   />
   ```
6. Change the `src` to your file's name like this:
   ```jsx
   {/* Background Music - Happy Birthday Song */}
   <audio 
     ref={audioRef} 
     src="/my-song.mp3" 
     loop 
     preload="auto" 
   />
   ```

---

## ✍️ 3. How to Change the Text & Messages

**To change the Typewriter text (Main Page):**
1. Open `src/pages/Home.tsx`.
2. Find the `<Typewriter messages={[ ... ]} />` component (around Line 125).
3. Edit the text inside the quotes.

**To change the Memory Card messages (Surprise Page):**
1. Open `src/components/FlipCard.tsx`.
2. Find the `messages` array at the top of the component (around Line 8).
3. Edit the messages inside the quotes for the back of each card.

**To change the Memory Card Titles & Descriptions (Surprise Page):**
1. Open `src/pages/SurpriseView.tsx`.
2. Find the array of memories inside the `map` function (around Line 115).
3. Edit the `title` and `text` properties for each memory.

---

## 🚀 Running the App

1. **Install Dependencies** (only needed the first time):
   ```bash
   npm install
   ```
2. **Start the App**:
   ```bash
   npm run dev
   ```
3. **Build for Production** (when you want to host it):
   ```bash
   npm run build
   ```
