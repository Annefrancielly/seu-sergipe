export type NavigationItem = {
  label: string;
  href: string;
};

export const mainNavigation: readonly NavigationItem[] = [
  { label: "Menus", href: "/#menus" },
  { label: "Chef", href: "/chef" },
  { label: "Eventos", href: "/eventos" },
  { label: "Agenda", href: "/agenda" },
  { label: "Visite", href: "/#visite" },
  { label: "Cardápio", href: "/cardapio" },
];
