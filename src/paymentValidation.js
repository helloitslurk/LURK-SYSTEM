export function validatePayment({ total, isCredit, customerId, payments }) {
  if (!Number.isFinite(total) || total < 0) {
    return { error: "Ödenecek tutar geçersiz." };
  }
  if (isCredit && !customerId) {
    return { error: "Veresiye için kayıtlı müşteri seçmelisin." };
  }
  const normalized = (Array.isArray(payments) ? payments : [])
    .filter(p => p && Number(p.amount) > 0)
    .map(p => ({ method: p.method, amount: Math.round(Number(p.amount) * 100) / 100 }));
  if (!isCredit && normalized.some(p => !["cash", "card"].includes(p.method))) {
    return { error: "Ödeme türü geçersiz." };
  }
  const paymentTotal = Math.round(normalized.reduce((sum, p) => sum + p.amount, 0) * 100) / 100;
  if (!isCredit && (total > 0 && normalized.length === 0 || Math.abs(paymentTotal - total) > 0.009)) {
    return { error: "Ödeme tutarları toplamı eşleşmiyor." };
  }
  return { error: null, payments: normalized, paymentTotal };
}
