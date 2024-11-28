from django.http import JsonResponse

class ValidateUserMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Exclude specific conditions
        if request.method == 'POST' and request.path == '/user/':
            # Allow the request to pass through
            return self.get_response(request)

        # Check if userId exists in session
        user_id = request.session.get("userId")
        if not user_id:
            # Return a 401 response if user is not authenticated
            return JsonResponse({"error": "User not authenticated or session expired."}, status=401)

        # Attach user_id to the request for use in views
        request.user_id = user_id

        # Allow the request to pass through
        return self.get_response(request)
