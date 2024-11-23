import random
INGREDIENTS = [
    # Grains & Breads
    "bread", "pasta", "rice", "quinoa", "oats", "tortilla", "bagel", "bun",

    # Proteins
    "chicken", "beef", "fish", "egg", "tofu", "lentils", "chickpeas", "pork",
    "turkey", "shrimp", "bacon", "sausages",

    # Vegetables
    "onion", "garlic", "tomato", "bell pepper", "carrot", "spinach", "broccoli",
    "zucchini", "mushroom", "potato", "sweet potato", "peas", "corn",

    # Fruits
    "apple", "banana", "orange", "grapes", "blueberries", "strawberries",
    "pineapple", "mango", "avocado", "lemon",

    # Dairy
    "milk", "cheese", "butter", "cream", "yogurt", "parmesan", "mozzarella",

    # Spices & Herbs
    "salt", "pepper", "cumin", "turmeric", "paprika", "oregano", "basil",
    "parsley", "coriander", "chili flakes", "cinnamon", "nutmeg",

    # Sauces & Condiments
    "ketchup", "mayonnaise", "mustard", "soy sauce", "vinegar", "honey",
    "peanut butter", "barbecue sauce", "hot sauce", "pesto",

    # Other Ingredients
    "olive oil", "sugar", "flour", "yeast", "baking powder", "syrup",
    "nuts", "seeds", "chocolate chips", "coconut milk"
]


# Function to get random ingredients
def get_random_ingredients():
    return random.sample(INGREDIENTS, random.randint(4,6))
