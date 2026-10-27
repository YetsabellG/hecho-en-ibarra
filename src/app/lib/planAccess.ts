const PAID_PROMOTION_PLANS = new Set(["emprendedor", "premium", "empresa"]);

export function hasPaidPromotionAccess(
  plan: string | null | undefined,
  premiumUntil?: string | null,
): boolean {
  if (!PAID_PROMOTION_PLANS.has((plan ?? "gratis").trim().toLowerCase())) {
    return false;
  }

  if (!premiumUntil) return true;
  const expiration = Date.parse(premiumUntil);
  return Number.isFinite(expiration) && expiration > Date.now();
}

export function promotionPlanNotice(): string {
  return "Las promociones están disponibles en nuestros planes de pago. Con tu plan Gratis puedes mostrar tu emprendimiento y tu catálogo. Cuando quieras, revisa los planes para desbloquear esta opción; estaremos felices de acompañarte.";
}
