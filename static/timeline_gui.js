function int(x) {return x|0;}

function px(x) {return int(x) + "px";}

function hours_diff(bhour, ehour) {
	return (ehour - bhour)/60;
}

function twoDigs2str(x) {
	return int(x/10) + "" + x%10;
}

function hour2str(hour) {
	return twoDigs2str(int(hour/60)%24) + ":" + twoDigs2str(hour%60);
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

window.eventDetailsBgcol = "light gray";
function eventDetails_div(ev) {
	var div = new_div();
	div.style.border = "solid black";
	div.style.background = eventDetailsBgcol;
	div.style.display = "none";
	div.innerHTML = "Location: " + ev.location;
	return div;
}

window.hourWidth = 96;
window.eventHeight = 48;
window.eventFont = "Agency FB";
window.eventBRadius = 8;
function event_div(ev) {
	var div = new_div();
	div.appendChild(eventDetails_div(ev));
	div.onclick = function() {console.log("foo");};
	div.style.fontFamily = eventFont;
	div.style.textAlign = "center";
	div.style.borderRadius = px(eventBRadius);
	div.innerHTML = ev['name']+"<br>"+hour2str(ev.bhour)+" - "+hour2str(ev.ehour);
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

testTimelineJSON = JSON.parse('{"timeline": {"events": [{"ehour": 1380, "name": "Carrete Lucas", "bhour": 1230, "location": "Santa Julia"}, {"ehour": 1650, "name": "Carrete en Bella", "bhour": 1410, "location": "harvard"}]}}').timeline;

emptyTimelineJSON = {"events": []};

function push_timeline(tl) {
	document.getElementById('timelines').appendChild(timeline_div(tl));
}
