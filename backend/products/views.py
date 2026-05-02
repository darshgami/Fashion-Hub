from rest_framework import viewsets, permissions
from .models import Product
from .serializers import ProductSerializer
from core.permissions import IsAdminRole

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_with_permissions = {
        'list': (permissions.AllowAny,),
        'retrieve': (permissions.AllowAny,),
        'create': (IsAdminRole,),
        'update': (IsAdminRole,),
        'partial_update': (IsAdminRole,),
        'destroy': (IsAdminRole,),
    }

    def get_permissions(self):
        return [permission() for permission in self.serializer_with_permissions.get(self.action, (permissions.IsAuthenticated,))]

    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category', None)
        search = self.request.query_params.get('search', None)
        sort = self.request.query_params.get('sort', None)

        if category:
            queryset = queryset.filter(category=category)
        if search:
            queryset = queryset.filter(name__icontains=search)
        if sort:
            if sort == 'price_low':
                queryset = queryset.order_by('price')
            elif sort == 'price_high':
                queryset = queryset.order_by('-price')
            elif sort == 'latest':
                queryset = queryset.order_by('-created_at')
        
        return queryset
