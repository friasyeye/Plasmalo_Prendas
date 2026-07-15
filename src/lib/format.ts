/** Formatea un importe en euros con la convención española (7,80 €). */
export function formatEUR(amount: number): string {
  return amount.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  });
}
