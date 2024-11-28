from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import PlanCheckoutSerializer
from grocery_item.serializer import GroceryItemSerializer
from base.models import PlanCheckout, GroceryItem, Plan
from plans.serializers import PlanSerializer
from plans.views import get_active_plan
from user.views import validate_user

@api_view(['POST'])
def addGroceries(request):
    validate_user(request=request)
    planId = request.data.get("planId")
    if not planId:
        return Response({"error": "Plan ID is required"}, status=400)
    try:

        plan=Plan.objects.get(id=planId)
        planCheckout, created = PlanCheckout.objects.get_or_create(plan=plan,cost=request.data.get('cost'))
        if not created:
            return Response({"error": "A grocery plan already exists for this plan."}, status=400)
        groceryItems = request.data.get("groceries", [])
        if not isinstance(groceryItems, list):
            return Response({"error": "Invalid data for grocery items. Expected a list."}, status=400)

        for groceryItem in groceryItems:
            groceryItem["planCheckout"] = planCheckout.id

        groceryItemSerializer = GroceryItemSerializer(data=groceryItems, many=True)
        if groceryItemSerializer.is_valid():
            groceryItemSerializer.save()
            return Response({
                "planCheckout": PlanCheckoutSerializer(planCheckout).data,
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
    validate_user(request)
    try:
        planCheckout = PlanCheckout.objects.get(plan=planId)
        groceryItems = GroceryItem.objects.filter(planCheckout=planCheckout)
        serializer = GroceryItemSerializer(groceryItems, many=True)
        return Response(serializer.data, status=200)
    except PlanCheckout.DoesNotExist:
        return Response({"error": "Grocery plan not found"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


from datetime import datetime

@api_view(['GET'])
def get_active_plan_with_groceries(request):
    # Get user ID from session
    
    user_id=validate_user(request=request)

    # Get the current timestamp in milliseconds
    today = int(datetime.now().timestamp() * 1000)
    try:
        plan = get_active_plan(today=today,user_id=user_id)
        plan_data = PlanSerializer(plan).data
        
        try:
            plan_checkout = plan.plan_checkout

            # Fetch all grocery items for the grocery plan
            grocery_items = plan.plan_checkout.grocery_items.all()
        except:
            return Response({
                "plan": plan_data,
                "cost": 0,
                "groceryItems": []
            }, status=200)

        # Serialize the plan, grocery plan, and grocery items
        plan_checkout_data = PlanCheckoutSerializer(plan_checkout).data
        grocery_items_data = GroceryItemSerializer(grocery_items, many=True).data
        # Combine the data into a single response
        return Response({
            "plan": plan_data,
            "cost": plan_checkout_data.get('cost'),
            "groceryItems": grocery_items_data
        }, status=200)

    except Plan.DoesNotExist:
        return Response({"error": "No active plan found for the user."}, status=404)
    except PlanCheckout.DoesNotExist:
        return Response({"error": "No grocery plan associated with the active plan."}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
