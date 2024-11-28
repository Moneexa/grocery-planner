from .ingredients.ingredients import get_random_ingredients
from .ingredients.dietary_req import get_random_dietary_restrictions
def convert_to_food_format(api_results):
    foods = []
    for result in api_results:
        food = {
            "id": str(result.get("id", "")),
            "name": result.get("title", ""),
            "imageUrl": result.get("feature_image_url", ""),
            "timeTaken": result.get("cooking_duration_string", ""),
            "reciepe": result.get("", ""),
            "ingredients": get_random_ingredients(),
            #"applicableDietary": get_random_dietary_restrictions(),  # Random dietary restrictions
        }
        foods.append(food)
    return foods
