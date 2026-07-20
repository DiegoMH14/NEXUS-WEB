// ============================================================
// NEXUS Landing — Configuración de EmailJS
// Completa estos 3 valores en tu archivo .env (ver .env.example)
// Los obtienes en https://dashboard.emailjs.com/admin
//   VITE_EMAILJS_SERVICE_ID  → Email Services
//   VITE_EMAILJS_TEMPLATE_ID → Email Templates
//   VITE_EMAILJS_PUBLIC_KEY  → Account > General > Public Key
// ============================================================

export const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? 'TU_SERVICE_ID',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? 'TU_TEMPLATE_ID',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? 'TU_PUBLIC_KEY',
}

export const emailjsIsConfigured =
  !EMAILJS_CONFIG.serviceId.startsWith('TU_') &&
  !EMAILJS_CONFIG.templateId.startsWith('TU_') &&
  !EMAILJS_CONFIG.publicKey.startsWith('TU_')
