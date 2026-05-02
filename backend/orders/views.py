import io
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.http import FileResponse
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from .models import Order, OrderItem
from .serializers import OrderSerializer
from cart.models import CartItem

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'admin':
            return Order.objects.all().order_by('-created_at')
        return Order.objects.filter(user=self.request.user).order_by('-created_at')

    def create(self, request, *args, **kwargs):
        user = request.user
        cart_items = CartItem.objects.filter(user=user)
        if not cart_items.exists():
            return Response({"error": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)

        # Create Order
        total_amount = sum(item.product.price * item.quantity for item in cart_items)
        # Add shipping if needed (example: subtotal < 5000)
        if total_amount < 5000:
            total_amount += 150

        order = Order.objects.create(
            user=user,
            full_name=request.data.get('full_name'),
            email=request.data.get('email'),
            address=request.data.get('address'),
            city=request.data.get('city'),
            zip_code=request.data.get('zip_code'),
            payment_method=request.data.get('payment_method'),
            total_amount=total_amount,
            is_paid=True # Mocking payment success
        )

        # Create Order Items
        for item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=item.product,
                price=item.product.price,
                quantity=item.quantity
            )
            # Update stock
            item.product.stock -= item.quantity
            item.product.save()

        # Clear Cart
        cart_items.delete()

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'])
    def download_invoice(self, request, pk=None):
        order = self.get_object()
        
        # Create PDF in memory
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=A4)
        elements = []
        styles = getSampleStyleSheet()

        # Header
        elements.append(Paragraph(f"<b>FASHION HUB - INVOICE</b>", styles['Title']))
        elements.append(Spacer(1, 20))
        
        # Order Info
        elements.append(Paragraph(f"Order ID: #{order.id}", styles['Normal']))
        elements.append(Paragraph(f"Date: {order.created_at.strftime('%Y-%m-%d %H:%M')}", styles['Normal']))
        elements.append(Paragraph(f"Customer: {order.full_name}", styles['Normal']))
        elements.append(Paragraph(f"Address: {order.address}, {order.city} - {order.zip_code}", styles['Normal']))
        elements.append(Paragraph(f"Payment Method: {order.payment_method}", styles['Normal']))
        elements.append(Spacer(1, 20))

        # Items Table
        data = [['Product', 'Price', 'Qty', 'Subtotal']]
        for item in order.items.all():
            data.append([
                item.product.name if item.product else "N/A",
                f"Rs. {item.price}",
                str(item.quantity),
                f"Rs. {item.price * item.quantity}"
            ])
        
        data.append(['', '', 'Total Amount', f"Rs. {order.total_amount}"])

        t = Table(data, colWidths=[250, 80, 50, 100])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,0), colors.maroon),
            ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
            ('ALIGN', (0,0), (-1,-1), 'CENTER'),
            ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0,0), (-1,0), 12),
            ('BACKGROUND', (0,1), (-1,-1), colors.beige),
            ('GRID', (0,0), (-1,-1), 1, colors.black),
            ('FONTNAME', (-2,-1), (-1,-1), 'Helvetica-Bold'),
        ]))
        elements.append(t)
        
        elements.append(Spacer(1, 40))
        elements.append(Paragraph("Thank you for shopping with FASHION HUB!", styles['Italic']))
        elements.append(Paragraph("Visit us again: www.fashionhub.com", styles['Normal']))

        doc.build(elements)
        buffer.seek(0)
        return FileResponse(buffer, as_attachment=True, filename=f"Invoice_FH_{order.id}.pdf")
