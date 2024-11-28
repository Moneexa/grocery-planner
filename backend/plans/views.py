from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import PlanSerializer
from recipe.serializer import RecipeSerializer
from base.models import Plan,Recipe
from datetime import datetime

from django.shortcuts import get_list_or_404

from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Plan
from .serializers import PlanSerializer
from user.views import validate_user

@api_view(['GET'])
def getData(request):
    user_id=validate_user(request=request)
    plans = Plan.objects.filter(user=user_id)
    serializer = PlanSerializer(plans, many=True)
    return Response(serializer.data, status=200)


@api_view(['POST'])
def postData(request):
    if validate_user(request=request):
        plan_serializer=PlanSerializer(data=request.data)
        if plan_serializer.is_valid():
            plan=plan_serializer.save()
            recipes_data = request.data.get('recipes', [])
            if isinstance(recipes_data, list):  # Ensure recipes is a list
                for recipe_data in recipes_data:
                    recipe_data['plan'] = plan.id 

                recipe_serializer = RecipeSerializer(data=recipes_data, many=True)
                if recipe_serializer.is_valid():
                  recipe_serializer.save()
                  return Response({"plan":plan_serializer.data,"recipes":recipe_serializer.data},status=200)
                else:
                  return Response({"error":recipe_serializer.errors}, status=400)
            else:
                return Response({"error": "Invalid data for recipes. Expected a list."}, status=400)
        else:
            return Response({"error":plan_serializer.errors}, status=400)
    else:
        return Response({"error":"You request is not valid"},status=401)
        


@api_view(['GET'])
def get_plan_recipes(request, plan_id):
    if validate_user(request=request):
        recipes = Recipe.objects.filter(plan_id=plan_id)
        serializer = RecipeSerializer(recipes,many=True)
        return Response(serializer.data)
    else:
        return Response({"error":"Your request is not valid"},401)


def get_active_plan(today,user_id):
    # Get the current timestamp in milliseconds
    today = int(datetime.now().timestamp() * 1000)

    try:
        # Fetch the plan that falls within today's date range
        plan = Plan.objects.filter(
            user_id=user_id,
            startDate__lte=today,
            endDate__gte=today
        ).last()
        if plan is None:
            raise Plan.DoesNotExist
        return plan
    except Plan.DoesNotExist:
        return Response({"error": "No plan found for today."}, status=404)


@api_view(['GET'])
def get_today_plan(request):
    # Get user ID from session
    user_id= validate_user(request=request)
    # Get the current timestamp in milliseconds
    today = int(datetime.now().timestamp() * 1000)

    try:
        plan=get_active_plan(today=today, user_id=user_id)
        # Fetch related recipes using the related_name 'recipes'
        recipes = plan.recipes.all()

        # Serialize the plan and its related recipes
        plan_data = PlanSerializer(plan).data
        
        recipes_data = RecipeSerializer(recipes, many=True).data
        plan_data["recipes"]=recipes_data

        # Combine the plan and recipes into a single response
        return Response(
            plan_data,
         status=200)

    except Plan.DoesNotExist:
        return Response({"error": "No plan found for today."}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)