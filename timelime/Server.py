### Generador de visualizaciones ###

class Event:
	#Constructor
	def __init__(self,name = "",bhour = "", ehour = "", location = ""):
		self.bhour = validate(bhour)
		self.ehour = validate(ehour)
		self.name = name
		self.location = location
		self.array = [name,location,bhour,ehour]
	#Cambia la ubicacion de un evento
	def changeLoc(self,newlocation):
		self.location = newlocation
	#Cambia la hora de un evento
	def changeHour(self,nbhour,nehour):
		self.bhour = nbhour
		self.ehour = nehour
	#Cambia el nombre de un evento
	def changeName(self,nname):
		self.name = nname
	#Obtiene un parametro
	def get(self,par):
		return eval("self." + par)
	#Muestra el evento
	def __str__(self):
		strbuild = ""
		strbuild += "Name: " + str(self.name)
		strbuild += "At: " + str(self.location)
		strbuild += "Begin at: " + str(self.bhour)
		strbuild += "End at: "  + str(self.ehour) 
		return strbuild
	def toDict(self):
		dic  = {}
		dic["name"] = self.name
		dic["location"]  = self.location
		dic["bhour"] = self.bhour
		dic["ehour"]  = self.ehour
		return dic

class Jsontimeline:
	def __init__(self,timeline =[]):
		self.tl = timeline
	def __str__(self):
		import json
		return json.dumps(self.tl.toDict())

class Timeline:
	#constructor
	def __init__(self,arrayOfEvents = []):
		self.timeline  = arrayOfEvents
	#anadir evento
	def addEvent(self,event):
		self.timeline.append(event)
	#genera un diccionario para exportar a json
	def toDict(self):
		dicti  = {}
		events = [ ev.toDict() for ev in self.timeline]
		dicti['timeline'] = {"events": events}
		return dicti
	#generar mensaje	
	def generateMessage(self):
		return str(jsontimeline(self.timeline))
	#enviar mensaje
	def sendMessage(self):
		pass



def validate(hora):
	if type(hora) is int:
		assert hora >= 0 and hora <= 3599
		return hora
	elif type(hora) is str:
		assert len(hora) == 5 
		assert hora[2] == ':'
		h = int(hora[0:2])
		m = int(hora[3:5])
		assert h >= 0 and h < 24
		assert m >= 0 and m < 60
		return h*60+m
	else:
		assert False

### TEST
def test():
	carLucas = Event("Carrete Lucas","20:30","00:00","Santa Julia")
	bella  = Event("Carrete en Bella","00:30","03:30","Pio Nono")
	bella.changeLoc("harvard")
	t1 = Timeline([carLucas,bella])
	print(Jsontimeline(t1))


test()