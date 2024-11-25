from datetime import datetime
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Plan

@api_view(['GET'])
def get_plan_data_distribution(request):
    user_id = request.session.get("userId")
    if not user_id:
        return Response({"error": "User not authenticated or session expired."}, status=401)

    try:
        # Check if any plans exist for the user
        if not Plan.objects.filter(user_id=user_id).exists():
            return Response({"error": "No plans found for the user."}, status=404)

        # Get the current date in milliseconds
        today = int(datetime.now().timestamp() * 1000)

        # Fetch the current active plan
        current_plan = Plan.objects.filter(
            user_id=user_id,
            startDate__lte=today,
            endDate__gte=today
        ).last()

        # Initialize response data
        current_plan_name = ""
        bar_chart_data = []
        line_chart_data = []

        if current_plan:
            current_plan_name = current_plan.name
            plan_checkout = getattr(current_plan, 'plan_checkout', None)

            if plan_checkout:
                # Fetch top 5 grocery items by price for the bar chart
                grocery_items = plan_checkout.grocery_items.order_by('-price')[:5]
                bar_chart_data = [
                    {"ingredient": item.name, "price": float(item.price)}
                    for item in grocery_items
                ]

        # Fetch all past plans for the line chart
        past_plans = Plan.objects.filter(user_id=user_id)
        for plan in past_plans:
            plan_checkout = getattr(plan, 'plan_checkout', None)
            if plan_checkout:
                line_chart_data.append({
                    "planName": plan.name,
                    "date": plan.endDate,  # Use endDate for the X-axis
                    "cost": float(plan_checkout.cost)
                })

        return Response({
            "currentPlan": current_plan_name,
            "barChartData": bar_chart_data,
            "lineChartData": line_chart_data
        }, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)
