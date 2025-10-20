# Audio Instructions

## Cara Menambahkan Backsound Perfect Ed Sheeran

### Opsi 1: Download File Audio
1. Download file audio "Perfect - Ed Sheeran" dalam format MP3
2. Simpan file dengan nama `perfect-ed-sheeran.mp3` di folder `public/`
3. Pastikan ukuran file tidak terlalu besar (maksimal 5MB untuk loading cepat)

### Opsi 2: Gunakan Link Streaming
Jika tidak ingin mengupload file, ubah kode di `src/app/page.tsx`:

```javascript
// Ganti baris ini:
<source src="/perfect-ed-sheeran.mp3" type="audio/mpeg" />

// Menjadi:
<source src="https://your-streaming-link.com/perfect.mp3" type="audio/mpeg" />
```

### Link Streaming yang Bisa Digunakan:
- YouTube Audio Library
- SoundCloud (dengan embed)
- Spotify Web Player (dengan API)
- Atau hosting audio sendiri

### Catatan Penting:
- Pastikan memiliki hak cipta atau lisensi untuk menggunakan lagu ini
- Untuk produksi, lebih baik menggunakan file audio yang dihosting sendiri
- Test audio di berbagai browser untuk kompatibilitas