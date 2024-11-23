import random

# List of dietary restrictions
DIETARY_RESTRICTIONS = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Keto',
    'Paleo',
    'Halal',
    'Kosher',
]

# Function to get random dietary restrictions
def get_random_dietary_restrictions():
    return random.sample(DIETARY_RESTRICTIONS, random.randint(1, 3))
