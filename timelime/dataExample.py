### Django Sqlite DB.

from django.db import models
import datetime
from django.utils import timezone
from models import Weveos, Eventos, User, Group, IsInGroup, IsInWeveo, GoesToWeveo

Weveos.objects.all()
Eventos.objects.all()
User.objects.all()
Group.objects.all()
IsInGroup.objects.all()
IsInWeveo.objects.all()
GoesToWeveo.objects.all()


r = User(name = "Robinson")
l = User(name = "Lucas")
b = User(name = "Bernardo")
team1 = Group(size = 3)
e1 = Eventos(name = "Pre-gaming", location = "Casa Lucas", bhour = 20*60, ehour= 22*60,pub_date =timezone.now())
e2 = Eventos(name = "Bellavista Club", location = "Pio Nono", bhour = 23*60, ehour= 2*60,pub_date =timezone.now())
dum = IsInGroup(group = team1, user = r)
dum2 = IsInGroup(group = team1, user = l)
dum3 = IsInGroup(group = team1, user = b)
w = Weveos(name = "weveo salvaje",pub_date=timezone.now(),bhour = 20*60,ehour = 0)
dumm1 = IsInWeveo(weveo = w,ev = e1)
dumm2 = IsInWeveo(weveo = w,ev = e2)
dumx = GoesToWeveo(weveo = w, group = team1)


