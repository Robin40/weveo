function int(x) {return x|0;}

function px(x) {return int(x) + "px";}

function hours_diff(bhour, ehour) {
	return (ehour - bhour)/60;
}

function twoDigs2str(x) {
	return int(x/10) + "" + int(x%10);
}

function hour2str(hour) {
	return twoDigs2str(int(hour/60)%24) + ":" + twoDigs2str(int(hour%60));
}

function hour2durStr(hour) {
	return int(hour/60) + "h" + twoDigs2str(int(hour%60)) + "m";
}

function contrast_color(col) {
	return "black";
}

window.colorSeq = ["LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow",
"LightGray"];
function unique_color(i) {
	return colorSeq[i%colorSeq.length];
}

function new_div() {return document.createElement("div");}

window.eventDetailsBgcol = "LightGray";
function eventDetails_div(ev) {
	var div = new_div();
	div.style.border = "solid black";
	div.style.background = eventDetailsBgcol;
	div.style.display = "none";
	div.innerHTML = "Duration: " + hour2durStr(ev.ehour - ev.bhour) + 
		"<br>Location: <a href='" + ev.directions + "'>" + ev.location + "</a>";
	return div;
}

function div_toggle(div, displayMode) {
	if (div.style.display == "none")
		div.style.display = displayMode;
	else
		div.style.display = "none";
}

window.hourWidth = 96;
window.eventHeight = 48;
window.eventFont = "Agency FB";
window.eventBRadius = 8;
function event_div(ev) {
	var div = new_div();
	div.onclick = function() {div_toggle(this.lastChild, "block");};
	div.style.fontFamily = eventFont;
	div.style.textAlign = "center";
	div.style.borderRadius = px(eventBRadius);
	div.innerHTML = ev['name']+"<br>"+hour2str(ev.bhour)+" - "+hour2str(ev.ehour);
	div.appendChild(eventDetails_div(ev));
	return div;
}

window.timelineHeight = 64;
window.timelineHSep = 8;
window.timelineBgcol = "gray";

function timeline_div(tl) {
	var div = new_div();
	div.style.position = "relative";
	div.style.background = timelineBgcol;
	div.style.height = px(timelineHeight);
	
	if (tl.events.length == 0) {
		div.innerHTML = "You can add events here";
		div.style.width = px(128);
		div.style.textAlign = "center";
		return div;
	}
	
	var timelineBHour = 1000000;
	for (var i=0; i<tl.events.length; ++i)
		timelineBHour = Math.min(timelineBHour, tl.events[i].bhour);	
	
	var timelineWidth = timelineHSep;
	for (var i=0; i<tl.events.length; ++i) {
		var ev = tl.events[i];
		var eventDiv = event_div(ev);
		var eventX = hours_diff(timelineBHour, ev.bhour)*hourWidth + timelineHSep;
		var eventWidth = hours_diff(ev.bhour, ev.ehour)*hourWidth;
		timelineWidth = Math.max(timelineWidth, eventX + eventWidth + timelineHSep);
		eventDiv.style.position = "absolute";
		eventDiv.style.top = px((timelineHeight - eventHeight)/2);
		eventDiv.style.left = px(eventX);
		eventDiv.style.width = px(eventWidth);
		eventDiv.style.height = px(eventHeight);
		eventDiv.style.background = unique_color(i);
		div.appendChild(eventDiv);
	}
	
	div.style.width = px(timelineWidth);
	
	return div;
}

//testTimelineJSON = JSON.parse('{"timeline": {"events": [{"ehour": 1380, "name": "Carrete Lucas", "bhour": 1230, "location": "Santa Julia"}, {"ehour": 1650, "name": "Carrete en Bella", "bhour": 1410, "location": "harvard"}]}}').timeline;

testTimelineJSON = JSON.parse('{"timeline": {"events": [{"directions": "https://www.google.es/maps/dir/Genova+2016,+Region+Metropolitana/Santa+Julia+640,+Region+Metropolitana/@-33.4444689,-70.6913193,13z/", "name": "Carrete Lucas", "bhour": 1230, "ehour": 1380, "location": "Santa Julia"}, {"directions": "https://www.google.es/maps/dir/Santa+Julia+640,+Region+Metropolitana/Pio+Nono+148,+Region+Metropolitana/@-33.4444689,-70.6913193,13z/", "name": "Carrete en Bella", "bhour": 1410, "ehour": 1650, "location": "harvard"}, {"directions": "https://www.google.es/maps/dir/Pio+Nono+148,+Region+Metropolitana/Bombero+nuez+159,+Region+Metropolitana/@-33.4444689,-70.6913193,13z/", "name": "After", "bhour": 1770, "ehour": 1970, "location": "After en"}]}}').timeline;

emptyTimelineJSON = {"events": []};

function push_timeline(tl) {
	document.getElementById('timelines').appendChild(timeline_div(tl));
}
