from django.core.cache import cache
import requests

# API data from ODA
def fetch_recipe_data(meal_type):
    cache_key = f'{meal_type}_recipes'
    cached_data = cache.get(cache_key)
    if cached_data:
        return cached_data
    API_URL = f"https://oda.com/api/v1/search/recipes/?q={meal_type}" 
    response = requests.get(API_URL)
    response.raise_for_status()
    json = response.json().get("results", [])
    cache.set(cache_key, json, timeout=60 * 15)
    return json
