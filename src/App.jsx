import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebflowPage from './components/WebflowPage.jsx'
import LanguageToggle from './components/LanguageToggle.jsx'
import { useI18n } from './i18n/index.jsx'
import HomePage from './pages/HomePage.jsx'
import WorkPage from './pages/WorkPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import PricingPage from './pages/PricingPage.jsx'
import ProjectDetailPage from './pages/ProjectDetailPage.jsx'
import BlogDetailPage from './pages/BlogDetailPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'

import checkoutHtml from './pages/raw/checkout.html?raw'
import orderConfirmationHtml from './pages/raw/order-confirmation.html?raw'
import paypalCheckoutHtml from './pages/raw/paypal-checkout.html?raw'
import detailCategoryHtml from './pages/raw/detail_category.html?raw'
import detailPostCategoriesHtml from './pages/raw/detail_post-categories.html?raw'
import detailSkuHtml from './pages/raw/detail_sku.html?raw'
import error401Html from './pages/raw/401.html?raw'
import error404Html from './pages/raw/404.html?raw'

export default function App() {
  const { locale } = useI18n()
  return (
    <BrowserRouter>
      <LanguageToggle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/blog-1" element={<BlogPage />} />
        <Route path="/blog/category/:slug" element={<BlogPage />} />
        <Route path="/project/:slug" element={<ProjectDetailPage />} />
        <Route path="/blog/:slug" element={<BlogDetailPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/checkout" element={<WebflowPage html={checkoutHtml} refreshKey={locale} />} />
        <Route path="/order-confirmation" element={<WebflowPage html={orderConfirmationHtml} refreshKey={locale} />} />
        <Route path="/paypal-checkout" element={<WebflowPage html={paypalCheckoutHtml} refreshKey={locale} />} />
        <Route path="/detail-category" element={<WebflowPage html={detailCategoryHtml} refreshKey={locale} />} />
        <Route path="/detail-post-categories" element={<WebflowPage html={detailPostCategoriesHtml} refreshKey={locale} />} />
        <Route path="/detail-sku" element={<WebflowPage html={detailSkuHtml} refreshKey={locale} />} />
        <Route path="/401" element={<WebflowPage html={error401Html} refreshKey={locale} />} />
        <Route path="/404" element={<WebflowPage html={error404Html} refreshKey={locale} />} />
        <Route path="*" element={<WebflowPage html={error404Html} refreshKey={locale} />} />
      </Routes>
    </BrowserRouter>
  )
}
