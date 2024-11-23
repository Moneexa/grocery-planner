from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import PlanSerializer
from recipe.serializer import RecipeSerializer
from base.models import Plan,Recipe

from django.shortcuts import get_list_or_404

@api_view(['GET'])
def getData(request):
    plans=Plan.objects.all()
    serializer=PlanSerializer(plans,many=True)
    print(request.session.get("userId"))
    return Response(serializer.data)


@api_view(['POST'])
def postData(request):
    if request.session.get("userId"):
        request.data['user']=request.session.get("userId")
        plan_serializer=PlanSerializer(data=request.data)
        if plan_serializer.is_valid():
            plan=plan_serializer.save()
            print("this is the data to be sent",plan_serializer.data)
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
    if(request.session.get("userId")):
        recipes = Recipe.objects.filter(plan_id=plan_id)
        serializer = RecipeSerializer(recipes,many=True)
        print("this is serializer", recipes)
        return Response(serializer.data)
    else:
        return Response({"error":"Your request is not valid"},401)
