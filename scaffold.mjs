import fs from 'fs';
import path from 'path';

const routes = [
  { path: 'hakkimizda', component: '../../src/pages/Hakkimizda' },
  { path: 'portfoy', component: '../../src/pages/Portfoy' },
  { path: 'hizmetler', component: '../../src/pages/Hizmetler' },
  { path: 'blog', component: '../../src/pages/Blog' },
  { path: 'iletisim', component: '../../src/pages/Iletisim' },
  { path: 'baski-hizmetleri', component: '../../src/components/services/BaskiHizmetleri' },
  { path: 'sosyal-medya-calismalari', component: '../../src/components/services/SosyalMedyaCalismalari' },
  { path: 'tasarim-hizmetleri', component: '../../src/components/services/TasarimHizmetleri' },
  { path: 'tanitim-filmi-cekimleri', component: '../../src/components/services/TanitimFilmiCekimleri' },
  { path: 'kurumsal-kimlik-tasarimi', component: '../../src/components/services/KurumsalKimlikTasarimi' },
  { path: 'reklam-hizmetleri', component: '../../src/components/services/ReklamHizmetleri' },
  { path: 'web-tasarim-uygulama', component: '../../src/components/services/WebTasarimUygulama' },
  { path: 'deneme', component: '../../src/pages/deneme' },
  { path: 'blog/[slug]', component: '../../../src/pages/BlogDetail' },
  { path: 'product-list', component: '../../src/pages/ProductList' },
  { path: 'add-product', component: '../../src/pages/AddProduct' },
  { path: 'admin/login', component: '../../../src/pages/admin/AdminLogin' },
  { path: 'admin/home', component: '../../../src/pages/admin/AdminHome' },
  { path: 'admin/add-work', component: '../../../src/components/admin/AddWork' },
  { path: 'admin/edit-work', component: '../../../src/components/admin/EditWork' }
];

routes.forEach(route => {
  const dir = path.join('app', route.path);
  fs.mkdirSync(dir, { recursive: true });
  
  const content = `import PageComponent from '${route.component}';\n\nexport default function Page(props) {\n  return <PageComponent {...props} />;\n}\n`;
  fs.writeFileSync(path.join(dir, 'page.jsx'), content);
  console.log(`Created ${dir}/page.jsx`);
});
