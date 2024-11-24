from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import GroceriesSerializer
from grocery_item.serializer import GroceryItemSerializer
from base.models import GroceryPlan, GroceryItem, Plan
from plans.serializers import PlanSerializer

@api_view(['POST'])
def addGroceries(request):
    # Get the plan ID from the request
    planId = request.data.get("planId")
    if not planId:
        return Response({"error": "Plan ID is required"}, status=400)

    try:
        
        plan=Plan.objects.get(id=planId)
        groceryPlan, created = GroceryPlan.objects.get_or_create(plan=plan,cost=request.data.get('cost'))
        print("plan***********", groceryPlan)
        if not created:
            return Response({"error": "A grocery plan already exists for this plan."}, status=400)
        groceryItems = request.data.get("groceries", [])
        if not isinstance(groceryItems, list):
            return Response({"error": "Invalid data for grocery items. Expected a list."}, status=400)

        for groceryItem in groceryItems:
            groceryItem["groceryPlan"] = groceryPlan.id

        groceryItemSerializer = GroceryItemSerializer(data=groceryItems, many=True)
        if groceryItemSerializer.is_valid():
            groceryItemSerializer.save()
            return Response({
                "groceryPlan": GroceriesSerializer(groceryPlan).data,
                "groceryItems": groceryItemSerializer.data
            }, status=200)
        else:
            return Response({"error": groceryItemSerializer.errors}, status=400)
    except Plan.DoesNotExist:
        return Response({"error": "Plan not found."}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(['GET'])
def getGroceryItems(request, planId):
    try:
        # Retrieve the grocery plan
        groceryPlan = GroceryPlan.objects.get(plan=planId)

        # Retrieve all items for the plan
        groceryItems = GroceryItem.objects.filter(groceryPlan=groceryPlan)
        serializer = GroceryItemSerializer(groceryItems, many=True)
        
        return Response(serializer.data, status=200)
    except GroceryPlan.DoesNotExist:
        return Response({"error": "Grocery plan not found"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


from datetime import datetime

@api_view(['GET'])
def get_active_plan_with_groceries(request):
    # Get user ID from session
    user_id = request.session.get("userId")
    if not user_id:
        return Response({"error": "User not authenticated or session expired."}, status=401)

    # Get the current timestamp in milliseconds
    today = int(datetime.now().timestamp() * 1000)

    try:
        # Fetch the active plan for the user

        print("********reached here**************", user_id)

        plan = Plan.objects.get(
            user_id=user_id,
            startDate__lte=today,
            endDate__gte=today
        )

        # Fetch the associated grocery plan (OneToOneField ensures only one exists)
        grocery_plan = plan.grocery_plan

        # Fetch all grocery items for the grocery plan
        grocery_items = grocery_plan.grocery_items.all()

        # Serialize the plan, grocery plan, and grocery items
        plan_data = PlanSerializer(plan).data
        grocery_plan_data = GroceriesSerializer(grocery_plan).data
        grocery_items_data = GroceryItemSerializer(grocery_items, many=True).data
        # Combine the data into a single response
        return Response({
            "plan": plan_data,
            "groceryPlan": grocery_plan_data,
            "groceryItems": grocery_items_data
        }, status=200)

    except Plan.DoesNotExist:
        return Response({"error": "No active plan found for the user."}, status=404)
    except GroceryPlan.DoesNotExist:
        return Response({"error": "No grocery plan associated with the active plan."}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
