import random
INGREDIENTS = [
    # Korn og brød
    "brød", "pasta", "ris", "quinoa", "havre", "tortilla", "bagel", "bolle",

    # Proteiner
    "kylling", "storfe", "fisk", "egg", "tofu", "linser", "kikerter", "svin",
    "kalkun", "reker", "bacon", "pølser",

    # Grønnsaker
    "løk", "hvitløk", "tomat", "paprika", "gulrot", "spinat", "brokkoli",
    "squash", "sopp", "potet", "søtpotet", "erter", "mais",

    # Frukt
    "eple", "banan", "appelsin", "druer", "blåbær", "jordbær",
    "ananas", "mango", "avokado", "sitron",

    # Meieriprodukter
    "melk", "ost", "smør", "fløte", "yoghurt", "parmesan", "mozzarella",

    # Krydder og urter
    "salt", "pepper", "spisskummen", "gurkemeie", "paprika", "oregano", "basilikum",
    "persille", "koriander", "chiliflak", "kanel", "muskat",

    # Sauser og dressinger
    "ketchup", "majones", "sennep", "soyasaus", "eddik", "honning",
    "peanøttsmør", "barbecuesaus", "hotsaus", "pesto",

    # Andre ingredienser
    "olivenolje", "sukker", "mel", "gjær", "bakepulver", "sirup",
    "nøtter", "frø", "sjokoladedråper", "kokosmelk"
]


# Function to get random ingredients
def get_random_ingredients():
    return random.sample(INGREDIENTS, random.randint(4,6))
