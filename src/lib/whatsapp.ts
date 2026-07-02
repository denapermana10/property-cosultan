import { StorageAPI } from './storage';

export function getWhatsAppNumber(): string {
  const links = StorageAPI.getSocialLinks();
  // Ensure formatted for wa.me (replace leading 0 with 62)
  let num = (links.whatsapp || "081324421411").replace(/[^0-9]/g, "");
  if (num.startsWith("0")) {
    num = "62" + num.substring(1);
  }
  return num;
}

export function openWhatsAppGeneral(name: string = "", location: string = "", budget: string = "", customNote: string = "") {
  const number = getWhatsAppNumber();
  let message = `Halo Pak Dena Permana,\n\nSaya mendapatkan informasi dari website Anda dan ingin berkonsultasi mengenai properti.\n\nNama : ${name || "-"}\nLokasi yang dicari : ${location || "-"}\nBudget : ${budget || "-"}`;
  
  if (customNote) {
    message += `\n\nCatatan Tambahan:\n${customNote}`;
  }
  
  message += `\n\nTerima kasih.`;
  
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function openWhatsAppProperty(propertyTitle: string, propertyPrice: string, propertyLocation: string, userName?: string) {
  const number = getWhatsAppNumber();
  const message = `Halo Pak Dena Permana,\n\nSaya tertarik dengan listing properti berikut di website Anda:\n\n🏡 *${propertyTitle}*\n📍 Lokasi: ${propertyLocation}\n💰 Harga: ${propertyPrice}\n\n${userName ? `Nama Saya : ${userName}\n` : ''}Mohon informasi ketersediaan unit, jadwal survei lokasi, dan promo diskon terbarunya.\n\nTerima kasih.`;
  
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function openWhatsAppKPR(propertyPrice: string, dpPercentage: number, years: number, interestRate: number, monthlyInstallment: string, userName?: string) {
  const number = getWhatsAppNumber();
  const message = `Halo Pak Dena Permana,\n\nSaya telah mencoba *Kalkulator Simulasi KPR* di website Anda dengan hasil perhitungan:\n\n💰 Harga Properti : ${propertyPrice}\n💵 Uang Muka (DP) : ${dpPercentage}%\n⏱️ Tenor Cicilan : ${years} Tahun\n📈 Suku Bunga : ${interestRate}% / tahun\n💳 *Estimasi Angsuran : Rp ${monthlyInstallment} / bulan*\n\n${userName ? `Nama Saya : ${userName}\n` : ''}Mohon rekomendasi unit rumah di Bandung Raya yang cocok dengan profil cicilan di atas serta bantuan pengajuan KPR-nya.\n\nTerima kasih.`;
  
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function openWhatsAppService(serviceTitle: string, userName?: string) {
  const number = getWhatsAppNumber();
  const message = `Halo Pak Dena Permana,\n\nSaya tertarik untuk berkonsultasi mengenai layanan *${serviceTitle}* yang ada di website Anda.\n\n${userName ? `Nama Saya : ${userName}\n` : ''}Mohon penjelasan lebih lanjut mengenai prosedur dan jadwal diskusinya.\n\nTerima kasih.`;
  
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
