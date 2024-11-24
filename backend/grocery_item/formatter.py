def transform_grocery_items(api_response):
    transformed_items = []

    # Extract and process the items from the API response
    for item in api_response:
        if item["type"] == "product":  # Only process product items
            attributes = item["attributes"]

            # Extract relevant fields
            grocery_item = {
                "id": attributes.get("id", ""),
                "name": attributes.get("full_name", ""),
                "imageUrl": attributes.get("images", [{}])[0].get("large", {}).get("url", ""),
                "weight": attributes.get("name_extra", ""),  # Use "name_extra" for weight
                "price": float(attributes.get("gross_price", "0")),  # Convert price to float
            }

            # Add to the list
            transformed_items.append(grocery_item)

    return transformed_items
