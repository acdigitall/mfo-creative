# MFO Creative

MFO Creative, modern web teknolojileri kullanılarak geliştirilmiş, yüksek performanslı ve premium tasarıma sahip bir portföy ve yönetim paneli uygulamasıdır. Proje, kusursuz kullanıcı deneyimi (UX) ve şık kullanıcı arayüzü (UI) sağlamak için en güncel araçlarla inşa edilmiştir.

## 🚀 Proje Hakkında

Bu proje, yaratıcı ajanslar veya bireysel portföyler için tasarlanmış dinamik bir web sitesidir. Ziyaretçilere görsel bir şölen sunarken, site yöneticilerine (admin) içerikleri (projeler, görseller vb.) kolayca ekleme, düzenleme ve silme imkanı tanıyan tam kapsamlı bir yönetim paneli içerir.

## 💻 Kullanılan Teknolojiler

Projede günümüzün en modern ve performanslı framework'leri tercih edilmiştir:

*   **[Next.js (App Router)](https://nextjs.org/):** Projenin bel kemiğini oluşturan, React tabanlı, hem sunucu tarafı oluşturma (SSR) hem de statik site oluşturma (SSG) yeteneklerine sahip güçlü bir framework.
*   **[React 18](https://react.dev/):** Kullanıcı arayüzünü (UI) bileşenler (components) halinde inşa etmek için kullanılmıştır.
*   **[Tailwind CSS v4](https://tailwindcss.com/):** Hızlı, modern ve responsive tasarımlar yapmayı sağlayan, "utility-first" CSS framework'ü.
*   **[Three.js](https://threejs.org/):** Web sayfalarına çarpıcı ve akıcı 3D grafikler / animasyonlar eklemek için entegre edilmiştir.
*   **[Lenis](https://lenis.studiofreight.com/):** Sayfada pürüzsüz ve akıcı (smooth) bir kaydırma (scrolling) deneyimi sağlamak için kullanılmıştır.
*   **[Lucide React](https://lucide.dev/):** Uygulama genelinde modern, temiz ve tutarlı vektörel ikonlar sağlamak için kullanılmıştır.

## ✨ Öne Çıkan Özellikler

*   **Premium Tasarım:** Koyu tema (Dark Mode) odaklı, "Glassmorphism" (cam efekti) detaylarına sahip lüks görünüm.
*   **Admin Dashboard:** Güvenli giriş sistemi ile korunan; projeleri listeleme, silme ve yenilerini ekleme işlemlerini destekleyen yönetim paneli (`/admin`).
*   **Tam Responsive:** Mobil, tablet ve masaüstü cihazlarla %100 uyumlu (kusursuz çalışan) duyarlı tasarım.
*   **Smooth Scroll:** Lenis entegrasyonu sayesinde projeler arasında gezinirken yağ gibi akan kaydırma hissiyatı.

## 🛠️ Kurulum ve Çalıştırma

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1.  **Bağımlılıkları Yükleyin:**
    Terminalinizi açın ve proje dizinindeyken gerekli paketleri kurun.
    ```bash
    npm install
    ```

2.  **Ortam Değişkenlerini (Env) Ayarlayın:**
    Proje ana dizininde bir `.env` dosyası oluşturun ve backend API bağlantısını belirtin (Örn: `NEXT_PUBLIC_API_URL=http://localhost:5000`).

3.  **Projeyi Başlatın (Geliştirici Modu):**
    ```bash
    npm run dev
    ```

4.  **Projeyi Görüntüleyin:**
    Tarayıcınızdan [http://localhost:3000](http://localhost:3000) adresine giderek siteyi görebilirsiniz. Yönetim paneli için `http://localhost:3000/admin` adresini ziyaret edin.

## 📦 Build Alma (Production)

Projeyi yayına (production) hazır hale getirmek için:
```bash
npm run build
npm start
```
