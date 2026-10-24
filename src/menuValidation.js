export function validateMenuItemInput(name, rawPrice) {
  if (typeof name !== "string" || !name.trim()) {
    return { error: "Ürün adı zorunlu." };
  }
  if (rawPrice === "" || rawPrice === null || rawPrice === undefined) {
    return { error: "Fiyat girilmelidir." };
  }
  const price = Number(rawPrice);
  if (!Number.isFinite(price) || price <= 0) {
    return { error: "Fiyat sıfırdan büyük geçerli bir tutar olmalı." };
  }
  return {
    error: null,
    name: name.trim().toLocaleUpperCase("tr-TR"),
    price
  };
}
