import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API route for AI Property Assistant
app.post("/api/ai-chat", async (req, res) => {
  try {
    const { message, history, userProfile } = req.body;
    
    // Check if Gemini API key is available
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      // Intelligent Rule-based Fallback Consultant for Bandung Raya
      return res.json({
        reply: generateFallbackResponse(message, userProfile),
        isFallback: true
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const systemPrompt = `Anda adalah "Asisten Properti AI Dena", asisten cerdas resmi dari Dena Permana (Property Consultant & Digital Marketing Property Bandung Raya).
    
Informasi Dena Permana:
- Kontak WhatsApp Resmi: 081324421411
- Keahlian: Jual beli rumah, investasi properti, digital marketing developer, survei lokasi, legalitas (SHM, AJB, KPR).
- Wilayah Utama: Bandung Raya (Podomoro Park Bojongsoang, Kota Baru Parahyangan Padalarang, Summarecon Bandung Gedebage, Dago Resort, Ciumbuleuit, Arcamanik, Setra Duta).

Tugas Anda:
1. Menjawab pertanyaan seputar properti, estimasi KPR, legalitas, dan saran investasi di Bandung Raya dengan ramah, profesional, dan meyakinkan.
2. Merekomendasikan properti yang sesuai dengan budget dan preferensi lokasi calon pembeli.
3. Selalu mengarahkan pengguna untuk berkonsultasi lebih lanjut atau melakukan survei lokasi langsung bersama Pak Dena Permana melalui WhatsApp: 081324421411.
4. Gunakan bahasa Indonesia yang santun, informatif, dan persuasif. Format jawaban dengan poin-poin agar mudah dibaca.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: `${systemPrompt}\n\nRiwayat obrolan singkat:\n${JSON.stringify(history || [])}\n\nPertanyaan user saat ini: "${message}"\n${userProfile ? `Budget: ${userProfile.budget}, Lokasi dicari: ${userProfile.location}` : ''}` }] }
      ],
    });

    const replyText = response.text || generateFallbackResponse(message, userProfile);
    res.json({ reply: replyText, isFallback: false });
  } catch (error: any) {
    console.error("Gemini API Error:", error.message || error);
    res.json({
      reply: generateFallbackResponse(req.body.message || "", req.body.userProfile),
      isFallback: true
    });
  }
});

function generateFallbackResponse(message: string, profile?: any): string {
  const lower = message.toLowerCase();
  
  if (lower.includes("kpr") || lower.includes("cicilan") || lower.includes("bunga") || lower.includes("dp")) {
    return `**Panduan KPR & Simulasi Cicilan bersama Dena Permana:**\n\nUntuk pengajuan KPR di wilayah Bandung Raya, rata-rata DP mulai dari **0% hingga 10%** dengan suku bunga promo KPR mulai dari **3.75% - 5.5% fixed** di tahun pertama bekerja sama dengan bank terkemuka (BCA, Mandiri, BNI, BSI, BTN).\n\n💡 *Tips Pak Dena:* Pastikan SLIK OJK (BI Checking) Anda lancar sebelum pengajuan agar proses verifikasi bank berjalan cepat dalam 7-14 hari kerja.\n\n📲 **Ingin dihitungkan estimasi cicilan yang pas dengan penghasilan Anda?** Klik tombol WhatsApp di bawah atau hubungi Pak Dena di **081324421411** untuk konsultasi KPR gratis!`;
  }
  
  if (lower.includes("budget") || lower.includes("murah") || lower.includes("juta") || lower.includes("miliar") || lower.includes("harga")) {
    return `**Rekomendasi Properti Sesuai Budget Anda di Bandung:**\n\n1. **Range < Rp 600 Juta:** Cluster sharia dan minimalis modern di area Bandung Timur (Arcamanik, Cinunuk, Ciwastra).\n2. **Range Rp 800 Juta - 1.5 Miliar:** Rumah 2 lantai bergaya Scandinavian di Summarecon Bandung atau area Bojongsoang dekat Tol Buah Batu.\n3. **Range > Rp 2 Miliar:** Resort Luxury di Podomoro Park Bandung, Dago Upper, dan Kota Baru Parahyangan dengan fasilitas danau & clubhouse bintang 5.\n\n🏡 *Tertarik survei lokasi langsung minggu ini?* Hubungi Pak Dena Permana via WhatsApp di **081324421411** untuk mendapatkan brosur lengkap & promo diskon developer terbaru!`;
  }

  if (lower.includes("lokasi") || lower.includes("bandung") || lower.includes("dago") || lower.includes("padalarang") || lower.includes("gedebage")) {
    return `**Keunggulan Lokasi Strategis di Bandung Raya:**\n\n- **Gedebage & Buah Batu:** Pusat pertumbuhan ekonomi baru, dekat Stasiun Kereta Cepat Whoosh dan Tol Gedebage.\n- **Padalarang (Kota Baru Parahyangan):** Akses langsung Tol Padalarang, lingkungan hijau eksklusif standar internasional.\n- **Dago & Ciumbuleuit:** Udara sejuk pegunungan, pemandangan kota Bandung (city view), cocok untuk villa atau investasi pasif berkeuntungan tinggi.\n\n📍 Mari diskusikan lokasi mana yang paling cocok dengan kebutuhan mobilitas dan rencana masa depan keluarga Anda. Hubungi WA Pak Dena: **081324421411**.`;
  }

  return `Halo! Saya **Asisten Properti AI Dena Permana**. Terima kasih telah menghubungi kami.\n\nPak Dena Permana adalah Konsultan Properti & Digital Marketing berpengalaman di Bandung Raya yang siap membantu Anda menemukan rumah impian, investasi ruko/villa, maupun konsultasi jual beli properti dengan legalitas dijamin aman (SHM/AJB).\n\n✨ **Bagaimana saya bisa membantu Anda hari ini?**\n- Mau cari rumah baru atau second di Bandung?\n- Butuh bantuan hitung simulasi KPR?\n- Ingin titip jual properti Anda agar cepat laku?\n\n📲 Langsung hubungi Pak Dena secara pribadi melalui WhatsApp di **081324421411** untuk respon super cepat!`;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Dena Permana Property Consultant API" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
