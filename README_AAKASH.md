# 🚀 Aakash Sharma - Portfolio Website

## ✅ CUSTOMIZATION COMPLETE!

Your portfolio website has been fully customized with your details from your CV!

---

## 📋 What Was Updated:

### 1. **Landing Page** (src/components/Landing.tsx)
- ✅ Name: **AAKASH SHARMA**
- ✅ Title: **Data Engineer | Data Scientist | Tech BA**
- ✅ Animated text transitions between roles

### 2. **About Section** (src/components/About.tsx)
- ✅ Professional summary from your CV
- ✅ Highlights: AI-driven analytics, semantic modeling, 7+ years experience

### 3. **Career Timeline** (src/components/Career.tsx)
- ✅ Reliance Jio (2017-2019) - Big Data Engineer
- ✅ Wipro Limited (2021-2022) - Data Engineer
- ✅ Gratex International (2022-2023) - Technical BA
- ✅ News Corp Australia (NOW) - Senior Consultant

### 4. **What I Do** (src/components/WhatIDo.tsx)
- ✅ **DATA ENGINEERING**: BigQuery, Spark, Airflow, AWS, GCP, Python, SQL, LookML
- ✅ **AI & DATA SCIENCE**: TensorFlow, Claude AI, ChatGPT API, LangChain, RAG, Looker

### 5. **Contact** (src/components/Contact.tsx)
- ✅ Email: Asharma94.official@gmail.com
- ✅ Phone: +61 433 941 769
- ✅ Location: Sydney, NSW, Australia (PR)
- ✅ LinkedIn, GitHub links

### 6. **Navbar** (src/components/Navbar.tsx)
- ✅ Logo: AAKASH SHARMA
- ✅ Email link updated

### 7. **Page Title & Meta** (index.html)
- ✅ Title: "Aakash Sharma - Data Engineer | Data Scientist | Tech BA"
- ✅ Meta description with keywords for SEO

---

## 🛠️ How to Run Your Portfolio:

### **Step 1: Install Dependencies**
```bash
npm install
```
**Time:** ~2-3 minutes (downloads all required packages)

---

### **Step 2: Run Development Server**
```bash
npm run dev
```

**What happens:**
- Server starts at: `http://localhost:5173`
- Opens automatically in your browser
- Hot reload enabled (changes update instantly!)

---

### **Step 3: View Your Portfolio**
Open browser and navigate to:
```
http://localhost:5173
```

**You should see:**
- ✨ 3D animated character (optional - can be removed)
- 🎨 Smooth scroll animations (GSAP)
- 📱 Responsive design (works on mobile/tablet/desktop)
- 🚀 Your name, career, skills, and contact info!

---

## 📂 Project Structure:

```
Portfolio-Website/
├── src/
│   ├── components/
│   │   ├── Landing.tsx         ✅ Your name & title
│   │   ├── About.tsx           ✅ About section
│   │   ├── Career.tsx          ✅ Work timeline
│   │   ├── WhatIDo.tsx         ✅ Skills showcase
│   │   ├── Contact.tsx         ✅ Contact info
│   │   ├── Navbar.tsx          ✅ Navigation bar
│   │   ├── TechStack.tsx       (Optional tech logos)
│   │   ├── Work.tsx            (Projects - needs customization)
│   │   └── Character/          (3D animated avatar)
│   ├── App.tsx                 (Main app component)
│   └── main.tsx                (Entry point)
├── public/                     (Static assets)
├── index.html                  ✅ Page title & meta
├── package.json                (Dependencies)
└── README_AAKASH.md           📄 This file!
```

---

## 🎨 Features Included:

- ✅ **3D Animated Character** (Three.js + WebGL)
- ✅ **Smooth Scroll Animations** (GSAP ScrollTrigger)
- ✅ **Responsive Design** (Desktop, Tablet, Mobile)
- ✅ **Interactive Hover Effects** (Custom cursor)
- ✅ **Section Navigation** (Navbar with smooth scroll)
- ✅ **Career Timeline** (Animated timeline with your jobs)
- ✅ **Tech Stack Tags** (Visual skill showcase)
- ✅ **Contact Form Ready** (Email & social links)

---

## 🔧 Further Customization (Optional):

### **1. Remove 3D Character (If you want simpler version):**

Edit `src/components/MainContainer.tsx`:
```tsx
// Comment out or remove this line:
{isDesktopView && children}

// And this:
<Landing>{!isDesktopView && children}</Landing>

// Change to:
<Landing />
```

---

### **2. Add Your Projects to "Work" Section:**

Edit `src/components/Work.tsx` and add your project details:
- Project name
- Description
- Technologies used
- Link to GitHub/demo

---

### **3. Update Social Links:**

Edit `src/components/Contact.tsx`:
- Replace GitHub URL with your actual GitHub profile
- Replace LinkedIn URL with your actual LinkedIn
- Add Twitter/Instagram if you use them

---

### **4. Add Profile Photo/Logo:**

Place your photo in `public/` folder and update `index.html`:
```html
<link rel="icon" type="image/png" href="/your-photo.png" />
```

---

### **5. Customize Colors:**

Edit CSS files in `src/components/styles/`:
- `Landing.css` - Hero section colors
- `About.css` - About section styling
- `Career.css` - Timeline colors
- `Contact.css` - Footer styling

Main brand color is **#1F4788** (blue) - change this across all CSS files for different theme.

---

## 🚀 Deployment Options:

### **Option 1: Vercel (Recommended - FREE & Easy)**
```bash
npm install -g vercel
vercel login
vercel --prod
```
**Result:** Your site goes live at `your-name.vercel.app`

---

### **Option 2: Netlify (Also FREE)**
```bash
npm run build
# Upload the 'dist' folder to Netlify
```

---

### **Option 3: GitHub Pages**
```bash
npm run build
# Push 'dist' folder to gh-pages branch
```

---

## ⚠️ Known Issues & Fixes:

### **Issue 1: GSAP Trial Plugins**
**Problem:** The portfolio uses GSAP trial plugins (ScrollSmoother) which can't be used for commercial hosting.

**Fix Options:**
1. **Purchase GSAP Club license** ($99/year) - [gsap.com/pricing](https://gsap.com/pricing)
2. **Remove ScrollSmoother** (use basic scroll instead)
3. **Use for personal portfolio only** (not commercial client work)

**For now:** You can deploy to personal portfolio site without issues.

---

### **Issue 2: 3D Character Not Loading**
**Problem:** Character model file might be missing or large.

**Fix:**
- Check `src/components/Character/` folder
- Model files should be in `public/` or properly imported
- If missing, you can remove the character (see "Remove 3D Character" above)

---

### **Issue 3: Slow Loading**
**Problem:** 3D models and animations can make initial load slow.

**Fix:**
- Use lazy loading (already implemented)
- Optimize 3D model size (compress textures)
- Use loading screen (already implemented)

---

## 📊 Performance Tips:

1. **Optimize Images:** Compress any images you add
2. **Minimize Dependencies:** Remove unused npm packages
3. **Code Splitting:** React lazy loading is already set up
4. **Caching:** Vercel/Netlify handle this automatically

---

## 🎯 Next Steps:

1. ✅ Run `npm install` (one time)
2. ✅ Run `npm run dev` (every time you want to preview)
3. ✅ Open http://localhost:5173 in browser
4. ✅ Customize further if needed (projects, colors, photos)
5. ✅ Deploy to Vercel/Netlify for free hosting!

---

## 📞 Need Help?

If you run into issues:
1. Check console for errors (F12 in browser)
2. Make sure Node.js is installed (v18+ recommended)
3. Delete `node_modules` and run `npm install` again
4. Check original repo: https://github.com/MoncyDev/Portfolio-Website

---

## ✨ Your Portfolio is Ready!

All your CV details are now embedded in a beautiful, interactive website!

**What you have:**
- ✅ Professional landing page with your name
- ✅ About section with your background
- ✅ Full career timeline (4 companies)
- ✅ Skills showcase (Data Engineering + AI/ML)
- ✅ Contact information
- ✅ Responsive design
- ✅ 3D animations (optional)
- ✅ SEO-optimized

**Total customization time:** ~20 minutes (done by me!)
**Your time to launch:** 5 minutes (npm install + deploy)

---

Good luck with your job applications! 🚀

**Questions?** Just ask!

---

## 📝 File Checklist:

Before deploying, make sure:
- [ ] All social links updated (LinkedIn, GitHub)
- [ ] Email verified in Contact section
- [ ] Phone number correct
- [ ] Projects added to Work section (optional)
- [ ] Profile photo added (optional)
- [ ] Favicon updated (optional)
- [ ] GSAP license acquired (if deploying commercially)

---

**Built with:** React, TypeScript, GSAP, Three.js, Vite
**Customized for:** Aakash Sharma
**Date:** April 2026
