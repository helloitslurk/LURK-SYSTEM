export function validatePayment({ total, isCredit, customerId, payments }) {
  if (!Number.isFinite(total) || total < 0) {
    return { error: "Ödenecek tutar geçersiz." };
  }
  if (isCredit && !customerId) {
    return { error: "Veresiye için kayıtlı müşteri seçmelisin." };
  }
  const supplied = Array.isArray(payments) ? payments : [];
  if (supplied.some(p => !p || p.amount === null || p.amount === "" || !Number.isFinite(Number(p.amount)) || Number(p.amount) < 0)) {
    return { error: "Ödeme tutarı geçersiz." };
  }
  if (!isCredit && supplied.some(p => !["cash", "card"].includes(p.method))) {
    return { error: "Ödeme türü geçersiz." };
  }
  const normalized = supplied
    .filter(p => Number(p.amount) > 0)
    .map(p => ({ method: p.method, amount: Math.round(Number(p.amount) * 100) / 100 }));
  const paymentTotal = Math.round(normalized.reduce((sum, p) => sum + p.amount, 0) * 100) / 100;
  if (!isCredit && ((total > 0 && normalized.length === 0) || Math.abs(paymentTotal - total) > 0.009)) {
    return { error: "Ödeme tutarları toplamı eşleşmiyor." };
  }
  return { error: null, payments: normalized, paymentTotal };
}
