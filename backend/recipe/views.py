from django.http import JsonResponse
from .formatter import convert_to_food_format
from .meal_data import fetch_recipe_data
from django.core.cache import cache

def get_data(request):
    # Parse dietary preferences from the URL
    meal_type = request.GET.get("meal_type", "").lower()  # Default to empty string if not provided
    name = request.GET.get("name", "").lower()
    dietary_preferences = request.GET.getlist("dietary")  # Get multiple values for 'dietary'
    # Getting cache data if it already exists
    cache_key = f'resp_recipes.{name}.{meal_type}'
    cached_resp = cache.get(cache_key)
    if cached_resp:
        return JsonResponse(cached_resp, safe=False)
    # Fetch data based on meal type
    meal_type = meal_type.lower()
    if meal_type not in ["frukost", "lunsj", "middag"]:
        return JsonResponse({"error": "Invalid meal type provided"}, status=400)
    if name is not "":
        data=convert_to_food_format(fetch_recipe_data(name))
    else:
        data=convert_to_food_format(fetch_recipe_data(meal_type))

       
    # Filter based on dish name and dietary preferences
    name = name.lower()  # Normalize to lowercase
    dietary_preferences = [d.lower() for d in dietary_preferences]  # Normalize dietary preferences
    filtered_data = [
        item for item in data
        if (
            #(not dietary_preferences or any(diet in [diet.lower() for diet in item["applicableDietary"]] for diet in dietary_preferences))
              (not name or name in item["name"].lower())
        )
    ][:8]  # Limit to 8 items
    cache.set(cache_key, filtered_data, timeout=60 * 15)
    return JsonResponse(filtered_data, safe=False)