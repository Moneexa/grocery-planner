import requests
from django.core.cache import cache

def fetch_product_data(item):
    cache_key = f'product_data_{item}'
    cached_data = cache.get(cache_key)
    if cached_data:
        return cached_data
    API_URL = "https://oda.com/api/v1/search/mixed/?q="+item 
    response = requests.get(API_URL)
    response.raise_for_status()
    json=response.json().get("items", [])
    cache.set(cache_key, json, timeout=60 * 15)
    return json
