from django.http import JsonResponse
from django.views.decorators.http import require_GET
from .formatter import transform_grocery_items
from .grocery_data import fetch_product_data
from django.core.cache import cache

@require_GET  # Ensures the view only allows GET requests
def get_data(request):
    """
    Fetch and transform grocery product data based on the provided name.
    """
    # Extract 'name' query parameter from the request
    name = request.GET.get("name", "").lower()
    if not name:
        return JsonResponse({"error": "The 'name' query parameter is required."}, status=400)
    #Caching
    cache_key = f'resp_groceries_{name}'
    cached_data = cache.get(cache_key)
    if cached_data:
        return JsonResponse(cached_data, safe=False)
    try:
        # Fetch raw product data using the provided name
        raw_data = fetch_product_data(name)
        
        # Transform the raw product data into the desired format
        transformed_data = transform_grocery_items(raw_data)
        
        # Limit the transformed data to 8 items
        filtered_data = transformed_data[:8]
        
        cache.set(cache_key, filtered_data, timeout=60 * 15)
        # Return the filtered data as a JSON response
        return JsonResponse(filtered_data, safe=False)
    except Exception as e:
        # Handle unexpected errors and return a server error response
        return JsonResponse({"error": f"An error occurred: {str(e)}"}, status=500)
