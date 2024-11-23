from django.db import models
import uuid

class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, auto_created=True)
    email = models.EmailField(unique=True)
    

    def __str__(self):
        return self.username

class Plan(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, auto_created=True)
    dietaryPreferences = models.JSONField(default=list, blank=True)  # e.g., ["vegan", "gluten_free"]
    user = models.ForeignKey(User, related_name='plans', on_delete=models.CASCADE)
    days = models.IntegerField()
    startDate = models.IntegerField()
    endDate = models.IntegerField()
    name = models.CharField(max_length=255)
    def __str__(self):
        return self.name

class Recipe(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    plan = models.ForeignKey(Plan, related_name='recipes', on_delete=models.CASCADE)
    date = models.IntegerField()
    frukost= models.JSONField(default=None)
    lunsj= models.JSONField(default=None)
    middag= models.JSONField(default=None)
    applicableDietary = models.JSONField(default=list, blank=True)  # e.g., ["vegan"]

    def __str__(self):
        return f"{self.id}"

class GroceryPlan(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    plan = models.OneToOneField(Plan, related_name='grocery_plan', on_delete=models.CASCADE)
    cost = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Grocery Plan for {self.plan.name}"

class GroceryItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    groceryPlan = models.ForeignKey(GroceryPlan, related_name='grocery_items', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    imageUrl = models.URLField(max_length=500, blank=True)
    weight = models.CharField(max_length=100)  # e.g., "500g", "1kg"
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.name} - {self.weight}"
