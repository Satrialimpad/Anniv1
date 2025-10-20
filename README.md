# Website Anniversary 24 Jam untuk Anggun

Website romantis ini dibuat khusus untuk merayakan anniversary 24 jam dengan Anggun. Website ini dilengkapi dengan animasi yang menarik, countdown timer ke jam 16:30, backsound Perfect Ed Sheeran, efek animasi love explosion, video romantis, dan galeri foto premium.

## ✨ Fitur

- 🎨 **Desain Romantis Modern** - Dark theme magical dengan gradient pink-rose-purple
- ⏰ **Countdown Timer** - Timer yang menghitung mundur ke jam 16:30 dengan localStorage
- 🎵 **Backsound Romantis** - Perfect Ed Sheeran dengan kontrol musik
- 🎬 **Video Romantis** - Video section untuk kenangan spesial
- 💕 **Pesan Cinta Interaktif** - Modal pesan romantis yang compact
- 🎆 **Love Explosion** - 100 partikel animasi saat klik terima kasih
- 📖 **Timeline Kisah Cinta** - 4 tahap dengan gambar premium
- 🖼️ **Galeri Foto & Video** - 6 gambar HD + video section
- 🎭 **Animasi Magical** - Floating hearts, sparkling stars, glow effects
- 📱 **Fully Responsive** - Mobile-first design dengan breakpoint sempurna

## 🎥 Media Content

### 📹 Video Section
- Video romantis autoplay dengan loop
- Placeholder untuk video personal
- Aspect ratio 16:9 yang optimal
- Overlay dengan pesan romantis

### 🖼️ Premium Images
1. **Paris Romance** - Pasangan di Menara Eiffel
2. **Beach Sunset** - Golden hour di pantai
3. **Romantic Dinner** - Makan malam mewah
4. **Mountain Lake** - Danau gunung yang tenang
5. **Rose Bouquet** - Buket mawar premium
6. **Anniversary Fireworks** - Kembang api spektakuler

## 📱 Responsive Breakpoints

Website ini menggunakan mobile-first design dengan breakpoint berikut:

- **0-639px** → Mobile (320px base)
- **≥640px** → Small phones/landscape (sm)
- **≥768px** → Tablet (md)
- **≥1024px** → Small desktop (lg)
- **≥1280px** → Desktop lebar (xl)
- **≥1536px** → 2K/monitor besar (2xl)

## 🎵 Cara Setup Media

### Video Instructions
1. Siapkan video romantis (10-30 detik)
2. Format: MP4, WebM, atau OGG
3. Ukuran: Maksimal 10MB
4. Ganti file `public/romantic-video.mp4`

### Audio Instructions
1. Download lagu "Perfect - Ed Sheeran" atau lagu favorit
2. Format: MP3 atau M4A
3. Ukuran: Maksimal 5MB
4. Simpan sebagai `public/perfect-ed-sheeran.mp3`

### Image Customization
- Gambar sudah HD dan dioptimasi
- Bisa diganti dengan foto pribadi
- Format: JPG, PNG, atau WebP
- Ukuran ideal: 1024x1024

## 🚀 Cara Deploy ke Netlify

### Langkah 1: Persiapan Repository
1. Upload kode ini ke GitHub repository
2. Tambahkan file video dan audio personal
3. Pastikan semua media sudah terupload

### Langkah 2: Setup Netlify
1. Login ke [Netlify](https://netlify.com)
2. Klik "New site from Git"
3. Pilih GitHub dan connect repository
4. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Node version**: `18`

### Langkah 3: Deploy
1. Klik "Deploy site"
2. Website akan live di URL Netlify

## 🛠️ Teknologi

- **Next.js 15** - React framework dengan App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling modern dengan responsive design
- **shadcn/ui** - Komponen UI yang elegan
- **Lucide Icons** - Icon yang cantik
- **Custom Animations** - CSS animations dan React hooks
- **LocalStorage** - Persistent countdown timer

## 🎨 Fitur Animasi

### Floating Hearts
- 5 ukuran berbeda (w-3 h-3 hingga w-8 h-8)
- Muncul setiap 1.2 detik
- Animasi melayang naik dengan rotasi 360°
- Posisi random dengan delay yang bervariasi

### Love Explosion
- 100 partikel saat klik "Terima Kasih"
- 6 tipe partikel: heart, star, sparkle, gift, infinity, key
- 5 detik durasi animasi
- Warna-warna berbeda untuk setiap tipe

### Magical Background
- 3 glowing orbs dengan blur effect
- 50 twinkling stars
- Mix-blend-screen untuk efek cinematic
- Dark theme dengan gradient romantic

## 📁 Struktur File

```
src/
├── app/
│   └── page.tsx                  # Halaman utama anniversary
├── components/
│   └── ui/                       # Komponen shadcn/ui
├── hooks/
│   └── use-toast.ts              # Toast hook
public/
├── paris-romance.jpg             # Gambar Paris romantis
├── beach-sunset.jpg              # Gambar pantai sunset
├── romantic-dinner.jpg           # Gambar makan malam
├── mountain-lake.jpg             # Gambar danau gunung
├── rose-bouquet.jpg              # Gambar buket mawar
├── anniversary-fireworks.jpg     # Gambar kembang api
├── romantic-video.mp4            # Video romantis (tambahkan)
├── perfect-ed-sheeran.mp3        # Backsound (tambahkan)
├── README_AUDIO.md               # Instruksi audio
└── README_MEDIA.md               # Instruksi media
```

## 🎨 Premium Visual Design

### Color Scheme
- Primary: Rose-900 → Pink-900 → Purple-900 (background)
- Secondary: Pink-500 → Purple-500 (gradients)
- Accent: Yellow-300 (stars dan highlights)
- Text: White dengan opacity variations

### Typography
- Font black untuk headings (maximum impact)
- Font light untuk descriptions (elegance)
- Text gradient effects untuk emphasis
- Drop shadows untuk depth

### Visual Effects
- Glass morphism dengan backdrop blur
- Glow effects dengan animasi pulse
- Smooth transitions dan hover effects
- Professional shadows dan borders

## 💝 Pesan Romantis

Website ini berisi 7 pesan cinta untuk Anggun:
- "Anggun, kamu adalah cahaya dalam gelapnya hidupku"
- "Senyummu bisa menyembuhkan semua luka di hatiku"
- "Setiap detik bersamamu adalah anugerah yang tak ternilai"
- "Kamu adalah alasan aku bangun setiap pagi dengan senyum"
- "Cintaku padamu tumbuh lebih kuat setiap detik"
- "Kamu adalah impian yang menjadi nyata dalam hidupku"
- "Terima kasih telah menjadi bagian terindah dalam perjalananku"

## 🎭 Timeline Kisah Cinta

1. **Pertemuan Pertama** - "Hari itu aku melihat malaikat" 🗼
2. **Kenangan Indah** - "Setiap detik bersamamu adalah surga" 🏖️
3. **Janji Setia** - "Aku akan menjagamu selamanya" 🍷
4. **Masa Depan Bersama** - "Bersamamu sampai akhir waktu" 🏔️

## 🌟 Tips Tambahan

- Website sudah dioptimalkan untuk mobile
- Animasi menggunakan CSS dan React hooks
- Gambar sudah dioptimalkan untuk web
- SEO friendly dengan meta tags yang tepat
- Audio control dengan mute/unmute functionality
- Video autoplay dengan loop untuk pengalaman immersive

## 🎯 Customization

Kamu bisa mengubah:
- Nama "Anggun" di hero section
- Target jam countdown (saat ini 16:30)
- Pesan-pesan cinta di modal
- Timeline dan deskripsi
- Gambar di folder public
- Video personal
- Backsound lagu favorit

## 📞 Support

Untuk bantuan tambahan:
1. Lihat `README_MEDIA.md` untuk instruksi media
2. Lihat `README_AUDIO.md` untuk instruksi audio
3. Test website di berbagai device
4. Pastikan semua media terupload dengan benar

---

Dibuat dengan ❤️ untuk Anggun tercinta - Website anniversary paling romantis dan memorable!