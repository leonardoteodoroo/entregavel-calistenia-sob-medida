const RECIPE_HASH_PREFIX = "#/";

export function buildRecipeHash(recipeId: string): string {
  return `${RECIPE_HASH_PREFIX}${encodeURIComponent(recipeId)}`;
}

export function readRecipeIdFromHash(hash: string): string | null {
  if (!hash.startsWith(RECIPE_HASH_PREFIX)) {
    return null;
  }

  const recipeId = decodeURIComponent(
    hash.slice(RECIPE_HASH_PREFIX.length)
  ).trim();
  return recipeId.length > 0 ? recipeId : null;
}
