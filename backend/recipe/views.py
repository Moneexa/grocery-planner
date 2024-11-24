from django.http import JsonResponse
from .formatter import convert_to_food_format
from .meal_data import fetch_frukost_data,fetch_lunsj_data,fetch_middag_data

def get_data(request):
    # Parse dietary preferences from the URL
    meal_type = request.GET.get("meal_type", "").lower()  # Default to empty string if not provided
    name = request.GET.get("name", "").lower()
    dietary_preferences = request.GET.getlist("dietary")  # Get multiple values for 'dietary'
    # Fetch data based on meal type
    meal_type = meal_type.lower()
    if meal_type == "frukost":
        data = convert_to_food_format(fetch_frukost_data())
    elif meal_type == "lunsj":
        data = convert_to_food_format(fetch_lunsj_data())
    elif meal_type == "middag":
        data = convert_to_food_format(fetch_middag_data())
    else:
        return JsonResponse({"error": "Invalid meal type provided"}, status=400)

    # Filter based on dish name and dietary preferences
    name = name.lower()  # Normalize to lowercase
    dietary_preferences = [d.lower() for d in dietary_preferences]  # Normalize dietary preferences
    filtered_data = [
        item for item in data
        if (
            (not dietary_preferences or any(diet in [diet.lower() for diet in item["applicableDietary"]] for diet in dietary_preferences))
            and (not name or name in item["name"].lower())
        )
    ][:8]  # Limit to 8 items

    return JsonResponse(filtered_data, safe=False)