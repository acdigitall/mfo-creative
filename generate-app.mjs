import fs from 'fs';
import path from 'path';

const routes = [
  { 
    path: 'hakkimizda', 
    component: '@/components/views/Hakkimizda', 
    title: 'Hakkımızda | MFO Creative',
    desc: 'MFO Creative dijital ajansımızın misyonu, vizyonu ve yaratıcı ekibi hakkında bilgi alın.'
  },
  { 
    path: 'portfoy', 
    component: '@/components/views/Portfoy', 
    title: 'Portföy | MFO Creative',
    desc: 'Başarıyla tamamladığımız web tasarım, kurumsal kimlik ve dijital pazarlama projelerimizi inceleyin.'
  },
  { 
    path: 'hizmetler', 
    component: '@/components/views/Hizmetler', 
    title: 'Hizmetlerimiz | MFO Creative',
    desc: 'Web tasarım, grafik tasarım, SEO, sosyal medya yönetimi ve tanıtım filmi çekimleri gibi dijital ajans hizmetlerimiz.'
  },
  { 
    path: 'blog', 
    component: '@/components/views/Blog', 
    title: 'Blog | MFO Creative',
    desc: 'Dijital pazarlama, web tasarım trendleri ve marka yönetimi hakkında güncel blog yazılarımız.'
  },
  { 
    path: 'iletisim', 
    component: '@/components/views/Iletisim', 
    title: 'İletişim | MFO Creative',
    desc: 'Projeleriniz için bizimle iletişime geçin. Sakarya dijital ajans iletişim bilgileri.'
  },
  { 
    path: 'baski-hizmetleri', 
    component: '@/components/services/BaskiHizmetleri', 
    title: 'Baskı Hizmetleri | MFO Creative',
    desc: 'Kartvizit, broşür, katalog ve promosyon ürünleri için profesyonel matbaa ve baskı hizmetleri.'
  },
  { 
    path: 'sosyal-medya-calismalari', 
    component: '@/components/services/SosyalMedyaCalismalari', 
    title: 'Sosyal Medya Yönetimi | MFO Creative',
    desc: 'Markanızın sosyal medya hesaplarını profesyonelce yönetiyor, etkileşiminizi artırıyoruz.'
  },
  { 
    path: 'tasarim-hizmetleri', 
    component: '@/components/services/TasarimHizmetleri', 
    title: 'Tasarım Hizmetleri | MFO Creative',
    desc: 'Yaratıcı grafik tasarım çözümleri ile markanızı görsel olarak güçlendiriyoruz.'
  },
  { 
    path: 'tanitim-filmi-cekimleri', 
    component: '@/components/services/TanitimFilmiCekimleri', 
    title: 'Tanıtım Filmi Çekimleri | MFO Creative',
    desc: 'Kurumsal tanıtım filmleri, drone çekimleri ve profesyonel video prodüksiyon hizmetleri.'
  },
  { 
    path: 'kurumsal-kimlik-tasarimi', 
    component: '@/components/services/KurumsalKimlikTasarimi', 
    title: 'Kurumsal Kimlik Tasarımı | MFO Creative',
    desc: 'Logo tasarımı ve tüm kurumsal kimlik öğelerinizle markanızı akılda kalıcı hale getiriyoruz.'
  },
  { 
    path: 'reklam-hizmetleri', 
    component: '@/components/services/ReklamHizmetleri', 
    title: 'Reklam Hizmetleri | MFO Creative',
    desc: 'Google Ads, Meta Ads ve dijital reklam stratejileri ile satışlarınızı artırın.'
  },
  { 
    path: 'web-tasarim-uygulama', 
    component: '@/components/services/WebTasarimUygulama', 
    title: 'Web Tasarım ve Uygulama | MFO Creative',
    desc: 'Modern, SEO uyumlu ve mobil öncelikli profesyonel web sitesi tasarımı hizmetleri.'
  }
];

routes.forEach(route => {
  const dir = path.join('app', route.path);
  fs.mkdirSync(dir, { recursive: true });
  
  const content = `import PageComponent from '${route.component}';

export const metadata = {
  title: "${route.title}",
  description: "${route.desc}",
  openGraph: {
    title: "${route.title}",
    description: "${route.desc}",
    type: "website",
    url: "https://mfocreative.com.tr/${route.path}",
  },
  twitter: {
    card: "summary_large_image",
    title: "${route.title}",
    description: "${route.desc}",
  },
};

export default function Page(props) {
  return <PageComponent {...props} />;
}
`;
  fs.writeFileSync(path.join(dir, 'page.jsx'), content);
  console.log(`Created ${dir}/page.jsx`);
});

// Update root page
const rootContent = `import HomeClient from '@/components/views/Home';

export const metadata = {
  title: "MFO Creative - Yaratıcı Dijital Ajans | Web Tasarım & Grafik Tasarım",
  description: "MFO Creative - Kurumsal kimlik tasarımı, web tasarım, sosyal medya yönetimi, grafik tasarım ve baskı hizmetleri ile markanızı güçlendiriyoruz. Profesyonel dijital ajans hizmetleri.",
  keywords: "dijital ajans, web tasarım, grafik tasarım, kurumsal kimlik, sosyal medya yönetimi, tanıtım filmi, baskı hizmetleri, logo tasarımı, sakarya dijital ajans",
  openGraph: {
    title: "MFO Creative - Yaratıcı Dijital Ajans",
    description: "Yaratıcı fikirler, güçlü markalar. Web tasarım, grafik tasarım ve dijital pazarlama hizmetleri.",
    type: "website",
    url: "https://mfocreative.com.tr",
    images: ["https://mfocreative.com.tr/MFO Creative.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MFO Creative - Yaratıcı Dijital Ajans",
    description: "Yaratıcı fikirler, güçlü markalar. Web tasarım, grafik tasarım ve dijital pazarlama hizmetleri.",
  },
  alternates: {
    canonical: "https://mfocreative.com.tr",
  }
};

export default function Page() {
  return <HomeClient />;
}
`;
fs.writeFileSync(path.join('app', 'page.jsx'), rootContent);
console.log('Updated app/page.jsx');
