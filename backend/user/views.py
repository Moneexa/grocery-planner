from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserSerializer
from base.models import User



@api_view(['POST'])
def add_user(request):
    try:
        user = User.objects.get(email=request.data.get('email'))
        request.session["userId"]=str(user.id)
        return Response({})    

    except User.DoesNotExist:
        user={"email":request.data.get('email')}
        serializer=UserSerializer(data=user)
        if serializer.is_valid():
            serializer.save()
        request.session["userId"]=str(serializer.data.get('id'))
    
        return Response(serializer.data)    
    
def validate_user(request):
    user_id=request.session.get("userId")
    if not user_id:
        return Response({"error":"User not authenticated or session expired."}, status=401)
    else:
        return user_id
 


