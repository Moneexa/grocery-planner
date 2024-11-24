import requests

def fetch_product_data(item):
    API_URL = "https://oda.com/api/v1/search/mixed/?q="+item 
    response = requests.get(API_URL)
    print()
    response.raise_for_status()
    return response.json().get("items", [])
