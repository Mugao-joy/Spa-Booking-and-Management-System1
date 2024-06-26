from django.db import models

# Create your models here.
class Blogs(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    author = models.TextField()
    dated = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
