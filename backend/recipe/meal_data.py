import requests
# API for Frukost
def fetch_frukost_data():
    API_URL = "https://oda.com/api/v1/search/recipes/?q=frukost" 
    response = requests.get(API_URL)
    response.raise_for_status()
    return response.json().get("results", [])

# API for Lunsj
def fetch_lunsj_data():
    API_URL = "https://oda.com/api/v1/search/recipes/?q=lunsj"  # Replace with actual Lunsj API
    response = requests.get(API_URL)
    response.raise_for_status()
    return response.json().get("results", [])

# API for Middag
def fetch_middag_data():
    API_URL = "https://oda.com/api/v1/search/recipes/?q=middag"  # Replace with actual Middag API
    response = requests.get(API_URL)
    response.raise_for_status()
    return response.json().get("results", [])
