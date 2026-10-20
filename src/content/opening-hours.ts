import type { OpeningHours, ServicePeriod } from "@/types/content";

const ALMOCO: ServicePeriod = { label: "Almoço", opens: "12:00", closes: "15:00" };
const ALMOCO_DOMINGO: ServicePeriod = { label: "Almoço", opens: "12:00", closes: "17:00" };
const JANTAR: ServicePeriod = { label: "Jantar", opens: "18:00", closes: "22:00" };

export const openingHours: readonly OpeningHours[] = [
  { day: "segunda", periods: [ALMOCO, JANTAR] },
  { day: "terca", periods: [ALMOCO, JANTAR] },
  { day: "quarta", periods: [ALMOCO, JANTAR] },
  { day: "quinta", periods: [ALMOCO, JANTAR] },
  { day: "sexta", periods: [ALMOCO, JANTAR] },
  { day: "sabado", periods: [ALMOCO, JANTAR] },
  { day: "domingo", periods: [ALMOCO_DOMINGO] },
];
