from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import PlanSerializer
from base.models import Plan
from django.shortcuts import get_object_or_404

@api_view(['GET'])
def getData(request):
    plans=Plan.objects.all()
    serializer=PlanSerializer(plans,many=True)
    print(request.session.get("userId"))
    return Response(serializer.data)


@api_view(['POST'])
def postData(request):
    serializer=PlanSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)    


@api_view(['GET'])
def get_specific_plan(request, plan_id):
    plan = get_object_or_404(Plan, id=plan_id)
    serializer = PlanSerializer(plan)
    return Response(serializer.data)
