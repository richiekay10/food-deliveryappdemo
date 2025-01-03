export function toggleFavorite(
  restaurantId: string,
  favorites: string[]
): string[] {
  if (favorites.includes(restaurantId)) {
    return favorites.filter(id => id !== restaurantId);
  }
  return [...favorites, restaurantId];
}

export function isFavorite(restaurantId: string, favorites: string[]): boolean {
  return favorites.includes(restaurantId);
}