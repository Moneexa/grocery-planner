from datetime import datetime, timedelta
from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import Plan,Recipe
from plans.views import get_active_plan

@api_view(['GET'])
def get_plan_data_distribution(request):
    user_id = request.user_id
    print("this is the user id", user_id)
    try:
        if not Plan.objects.filter(user_id=user_id).exists():
            return Response({"error": "No plans found for the user."}, status=404)

        today = int(datetime.now().timestamp() * 1000)

        current_plan = get_active_plan(today=today, user_id=user_id)

        bar_chart_data = []
        line_chart_data = []
        recipes = []

        if current_plan:
            plan_checkout = getattr(current_plan, 'plan_checkout', None)

            if plan_checkout:
                grocery_items = plan_checkout.grocery_items.order_by('-price')[:5]
                bar_chart_data = [
                    {"ingredient": item.name, "price": float(item.price)}
                    for item in grocery_items
                ]

            # Calculate the start and end timestamps for today and tomorrow
            today_start = int(datetime.now().replace(hour=0, minute=0, second=0, microsecond=0).timestamp() * 1000)
            tomorrow_end = int((datetime.now() + timedelta(days=1)).replace(hour=23, minute=59, second=59, microsecond=999).timestamp() * 1000)

            # Fetch recipes for today and tomorrow
            recipes_queryset = Recipe.objects.filter(
                plan=current_plan,
                date__gte=today_start,
                date__lte=tomorrow_end
            )
            recipes = [
                {"name": recipe.id, "date": recipe.date, "frukost": recipe.frukost, "lunsj": recipe.lunsj, "middag": recipe.middag}
                for recipe in recipes_queryset
            ]
        
        print("***this is current plan", bar_chart_data)
        
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
            "barChartData": bar_chart_data,
            "lineChartData": line_chart_data,
            "recipes": recipes
        }, status=200)

    except Exception as e:
        return Response({"error": str(e)}, status=500)