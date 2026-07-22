import { GoogleGenAI } from '@google/genai';

// Initialize Google Gemini Client (falls back gracefully if key is not set)
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || 'MOCK_KEY';
const ai = new GoogleGenAI({ apiKey });

export interface RichLandingPageOutput {
  title: string;
  descriptionHtml: string;
  keyFeatures: string[];
}

export async function generateRichLandingPageHTML(
  productTitle: string,
  category: string,
  readymadeImageUrls: string[]
): Promise<RichLandingPageOutput> {
  try {
    if (apiKey !== 'MOCK_KEY') {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Act as a world-class Direct-To-Consumer (D2C) e-commerce copywriter.
        Create an incredible, high-converting HTML product landing page description for a product titled "${productTitle}" in category "${category}".
        
        Use these readymade product image URLs to embed them inside the HTML description as hero banners and feature callouts:
        ${readymadeImageUrls.map((url, idx) => `Image ${idx + 1}: ${url}`).join('\n')}

        Return JSON format with:
        1. "title": Catchy optimized title
        2. "descriptionHtml": HTML string with Tailwind CSS styles, section headings, feature highlights, embedded <img src="..."> tags using the provided URLs, and an FAQ accordion section.
        3. "keyFeatures": Array of 4 short feature bullet points.`
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.replace(/```json|```/g, '').trim());
        return parsed;
      }
    }
  } catch (error) {
    console.warn('Gemini API call warning, falling back to intelligent template engine:', error);
  }

  // High-converting default fallback template if API key is not configured yet
  const img1 = readymadeImageUrls[0] || 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=80';
  const img2 = readymadeImageUrls[1] || 'https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=1000&q=80';

  const descriptionHtml = `
    <div class="landing-description space-y-8 font-sans text-slate-800">
      <!-- Hero Intro Banner -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-8 shadow-2xl">
        <span class="inline-block px-3 py-1 bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-full mb-3">🔥 Trending Product</span>
        <h2 class="text-3xl font-extrabold tracking-tight">${productTitle}</h2>
        <p class="mt-3 text-indigo-200 text-lg leading-relaxed">Experience premium quality, innovative design, and ultimate everyday utility. Designed for effortless lifestyle upgrade.</p>
        <div class="mt-6 overflow-hidden rounded-2xl border-2 border-white/20 shadow-2xl">
          <img src="${img1}" alt="${productTitle} Feature" class="w-full h-72 object-cover" />
        </div>
      </div>

      <!-- Feature Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-500 transition-all shadow-sm">
          <div class="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-xl mb-4">⚡</div>
          <h3 class="text-xl font-bold text-slate-900">Ultra-High Efficiency & Build</h3>
          <p class="mt-2 text-slate-600 text-sm">Engineered with high-grade durable materials ensuring long-lasting performance and hassle-free operation.</p>
        </div>
        <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-pink-500 transition-all shadow-sm">
          <div class="w-12 h-12 bg-pink-600 text-white rounded-xl flex items-center justify-center font-bold text-xl mb-4">✨</div>
          <h3 class="text-xl font-bold text-slate-900">Sleek Aesthetic Design</h3>
          <p class="mt-2 text-slate-600 text-sm">Complements your home, office, or personal style effortlessly. Lightweight, portable, and easy to use.</p>
        </div>
      </div>

      <!-- Embedded Secondary Image Showcase -->
      ${img2 ? `
        <div class="my-8 rounded-3xl overflow-hidden shadow-xl border border-slate-100">
          <img src="${img2}" alt="${productTitle} Demonstration" class="w-full h-80 object-cover" />
          <div class="p-4 bg-slate-900 text-white text-center text-sm font-medium">
            Verified Premium Quality • Tested for High Performance
          </div>
        </div>
      ` : ''}

      <!-- FAQ Section -->
      <div class="rounded-2xl border border-slate-200 p-6 bg-white shadow-sm space-y-4">
        <h3 class="text-xl font-extrabold text-slate-900">Frequently Asked Questions</h3>
        <div class="border-b border-slate-100 pb-3">
          <p class="font-bold text-slate-800 text-sm">Q: Is Cash on Delivery (COD) available?</p>
          <p class="text-xs text-slate-600 mt-1">Yes, 100% Cash on Delivery is available across all serviceable pincodes in India.</p>
        </div>
        <div class="border-b border-slate-100 pb-3">
          <p class="font-bold text-slate-800 text-sm">Q: How long does delivery take?</p>
          <p class="text-xs text-slate-600 mt-1">Orders are dispatched within 24 hours. Delivery usually takes 3 to 5 business days.</p>
        </div>
      </div>
    </div>
  `;

  return {
    title: productTitle,
    descriptionHtml,
    keyFeatures: [
      'Premium durable build quality',
      'Ultra-efficient performance',
      'Ergonomic & stylish design',
      '100% Satisfaction & Replacement guarantee'
    ]
  };
}
