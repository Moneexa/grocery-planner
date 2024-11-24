from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Plan, Recipe, GroceryPlan
from datetime import datetime

@api_view(['GET'])
def get_plan_data_distribution(request):
    user_id = request.session.get("userId")
    if not user_id:
        return Response({"error": "User not authenticated or session expired."}, status=401)

    # Get the current date in milliseconds
    today = int(datetime.now().timestamp() * 1000)
    try:
        # Fetch the current plan
        current_plan = Plan.objects.filter(
            user_id=user_id,
            startDate__lte=today,
            endDate__gte=today
        ).last()

        # Fetch the associated grocery plan
        grocery_plan = current_plan.grocery_plan

        # Fetch all grocery items for the grocery plan
        grocery_items = grocery_plan.grocery_items.order_by('-price')[:5]

        # Prepare data for the bar chart
        bar_chart_data = [
            {"ingredient": item.name, "price": float(item.price)}
            for item in grocery_items
        ]
        past_plans = Plan.objects.filter(
            user=user_id,
        )

        print("*****past plans data********", past_plans)

        # Prepare data for the line chart (past plans cost)
        line_chart_data = []
        for plan in past_plans:
            grocery_plan = getattr(plan, 'grocery_plan', None)
            if grocery_plan:
                line_chart_data.append({
                    "planName": plan.name,
                    "date": plan.endDate,  # Use endDate for the X-axis
                    "cost": float(grocery_plan.cost)
                })

        return Response({
            "currentPlan": current_plan.name,
            "barChartData": bar_chart_data,
            "lineChartData": line_chart_data
        }, status=200)

    except Plan.DoesNotExist:
        return Response({"error": "No active plan found for the user."}, status=404)
    except GroceryPlan.DoesNotExist:
        return Response({"error": "No grocery plan associated with the active plan."}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)