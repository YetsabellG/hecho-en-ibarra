import { Business } from "../types/business";

export function searchBusinesses(
  businesses: Business[],
  search: string
) {
  if (!search.trim()) return businesses;

  const text = search.toLowerCase();

  return businesses.filter((business) => {
    return (
      business.name.toLowerCase().includes(text) ||
      business.category.toLowerCase().includes(text) ||
      business.description.toLowerCase().includes(text) ||
      business.city.toLowerCase().includes(text)
    );
  });
}