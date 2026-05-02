import os
import django
from decimal import Decimal

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from products.models import Product
from blogs.models import Blog
from users.models import User

def populate():
    print("Populating sample data...")

    # Create Products
    products = [
        {
            "name": "Royal Silk Sherwani",
            "description": "Exquisite cream silk sherwani with hand-embroidered details. Perfect for weddings and grand occasions.",
            "price": Decimal("24999.00"),
            "category": "Ethnic",
            "stock": 10
        },
        {
            "name": "Floral Printed Saree",
            "description": "Lightweight chiffon saree with vibrant floral prints. Comes with a matching blouse piece.",
            "price": Decimal("3500.00"),
            "category": "Women",
            "stock": 25
        },
        {
            "name": "Slim Fit Linen Shirt",
            "description": "Premium linen shirt for a breathable summer look. Versatile for both office and casual wear.",
            "price": Decimal("1899.00"),
            "category": "Men",
            "stock": 50
        },
        {
            "name": "Kids Festive Kurta Set",
            "description": "Bright and comfortable cotton kurta set for boys with subtle embroidery.",
            "price": Decimal("1200.00"),
            "category": "Kids",
            "stock": 30
        },
        {
            "name": "Western Midi Dress",
            "description": "A stylish emerald green midi dress with a belt. Ideal for evening parties.",
            "price": Decimal("2800.00"),
            "category": "Western",
            "stock": 15
        },
        {
            "name": "Banarasi Silk Saree",
            "description": "Traditional Banarasi silk saree with gold zari work. A masterpiece of Indian heritage.",
            "price": Decimal("12500.00"),
            "category": "Ethnic",
            "stock": 8
        },
        {
            "name": "Denim Jacket - Men",
            "description": "Classic wash denim jacket with a modern fit. A must-have for the casual wardrobe.",
            "price": Decimal("2499.00"),
            "category": "Western",
            "stock": 20
        },
        {
            "name": "Embroided Lehengas",
            "description": "Heavy embroidered lehenga choli for the bridal season. Premium craftmanship.",
            "price": Decimal("45000.00"),
            "category": "Women",
            "stock": 5
        }
    ]

    for p_data in products:
        Product.objects.get_or_create(**p_data)

    # Create Blogs
    blogs = [
        {
            "title": "5 Tips to Style Your Saree This Festive Season",
            "content": "Indian festivals are all about colors and grace. Styling a saree can be challenging but with these 5 tips, you can look stunning..."
        },
        {
            "title": "The Rise of Fusion Wear in Urban India",
            "content": "Fusion wear is becoming the heartbeat of Indian youth. Pairing a kurta with jeans is just the beginning of this revolution..."
        }
    ]

    for b_data in blogs:
        Blog.objects.get_or_create(**b_data)

    # Create a Superuser
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@fashionhub.com', 'admin123', first_name='Admin', last_name='User', role='admin')
        print("Superuser created: admin / admin123")

    print("Data population complete!")

if __name__ == "__main__":
    populate()
