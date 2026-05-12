````markdown
# Berita Portal – React + Vite

Portal berita dinamis berbasis React, Vite, dan TailwindCSS.  
Menampilkan berita dari berbagai kategori secara real-time menggunakan [berita-indo-api-next](https://berita-indo-api-next.vercel.app/).

## Fitur

- Dynamic kategori & berita (headline, populer, rekomendasi, detail, dsb)
- Routing SPA dengan React Router
- UI responsif & modern (TailwindCSS)
- Komentar lokal (localStorage)
- Breadcrumb, slider, dan fitur UX lainnya

## Instalasi & Penggunaan

### 1. Clone Repository

```bash
git clone https://github.com/raiakmal/seal-berita-terkini.git
cd NAMA-REPO
```
````

### 2. Install Dependencies

```bash
npm install
# atau
yarn install
```

### 3. Jalankan Development Server

```bash
npm run dev
# atau
yarn dev
```

Akses di [http://localhost:5173](http://localhost:5173) (atau port yang muncul di terminal).

### 4. Build untuk Produksi

```bash
npm run build
# atau
yarn build
```

### 5. Preview Build (Opsional)

```bash
npm run preview
# atau
yarn preview
```

## Konfigurasi Lain

- **Linting:**  
  Jalankan `npm run lint` untuk cek kualitas kode.
- **Environment:**  
  Jika butuh konfigurasi khusus, buat file `.env` (lihat/duplikasi `.env.example` jika ada).

## Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [berita-indo-api-next](https://berita-indo-api-next.vercel.app/)
