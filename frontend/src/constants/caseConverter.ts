export function toSnakeCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCase); // Recursively process arrays
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => {
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase(); // Convert camelCase to snake_case
        acc[snakeKey] = toSnakeCase(value); // Recursively process nested objects
        return acc;
      },
      {} as Record<string, any>,
    );
  }
  return obj;
}
export function toCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(toCamelCase); // Recursively process arrays
  } else if (typeof obj === 'object' && obj !== null) {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
          letter.toUpperCase(),
        ); // Convert snake_case to camelCase
        acc[camelKey] = toCamelCase(value); // Recursively process nested objects
        return acc;
      },
      {} as Record<string, any>,
    );
  }
  return obj; // Return primitives as is
}
