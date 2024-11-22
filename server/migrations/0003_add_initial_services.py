from django.db import migrations

def add_initial_services(apps, schema_editor):
    Service = apps.get_model('bowanaApp', 'Service')
    services_data = [
        {"name": "HydraFacial", "category": "Facials", "price": 2000.00, "description": "Hydrating facial treatment"},
        {"name": "Microdermabrasion", "category": "Facials", "price": 7500.00, "description": "Skin resurfacing treatment"},
        {"name": "LED Light Therapy", "category": "Facials", "price": 5000.00, "description": "Light-based skin treatment"},
        {"name": "Hyluronic Chemical Peel", "category": "Facials", "price": 6500.00, "description": "Hyaluronic acid chemical peel"},
        {"name": "Full Body Wax", "category": "Waxing Hair Removal", "price": 10000.00, "description": "Complete body hair removal"},
        {"name": "Legs Waxing", "category": "Waxing Hair Removal", "price": 3000.00, "description": "Leg hair removal"},
        {"name": "Brazilian Wax", "category": "Waxing Hair Removal", "price": 3000.00, "description": "Bikini area waxing"},
        {"name": "Hollywood Wax", "category": "Waxing Hair Removal", "price": 4000.00, "description": "Full pubic area waxing"},
        {"name": "Aromatherapy Massage", "category": "Massages", "price": 5000.00, "description": "Massage with essential oils"},
        {"name": "Cupping Therapy", "category": "Massages", "price": 6500.00, "description": "Traditional cupping massage"},
        {"name": "Hotstone Massage", "category": "Massages", "price": 7500.00, "description": "Massage with heated stones"},
        {"name": "Prenatal Massage", "category": "Massages", "price": 6500.00, "description": "Massage for pregnant women"},
        {"name": "Full Body Laser", "category": "Laser Hair Removal", "price": 100000.00, "description": "Complete body laser hair removal"},
        {"name": "Arms Laser", "category": "Laser Hair Removal", "price": 5000.00, "description": "Laser hair removal for arms"},
        {"name": "Bikini/Hollywood Laser", "category": "Laser Hair Removal", "price": 15000.00, "description": "Laser hair removal for bikini area"},
        {"name": "Legs Laser", "category": "Laser Hair Removal", "price": 20000.00, "description": "Laser hair removal for legs"}
    ]
    
    for service in services_data:
        Service.objects.create(**service)

class Migration(migrations.Migration):
    dependencies = [
        ('bowanaApp', '0002_service_appointment'),  # Replace with actual previous migration
    ]
    
    operations = [
        migrations.RunPython(add_initial_services),
    ]
