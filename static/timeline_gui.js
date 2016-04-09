function int(x) {return x|0;}

function px(x) {return int(x) + "px";}

function hours_diff(bhour, ehour) {
	return (ehour - bhour)/60.0;
}

function contrast_color(col) {
	return "black";
}

window.colorSeq = ["LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow",
"LightGray"];
function unique_color(i) {
	return colorSeq[i%colorSeq.length];
}

window.hourWidth = 128;
window.eventHeight = 64;
function event_div(ev) {
	var div = document.createElement("div");
	div.innerHTML = ev['name'];
	return div;
}

window.timelineHeight = 96;
window.timelineHSep = 8;
window.timelineBgcol = "yellow";
function timeline_div(tl) {
	var div = document.createElement("div");
	var timelineWidth = timelineHSep;
	var i;
	for (i=0; i<tl.events.length; ++i) {
		var ev = tl.events[i];
		var eventDiv = event_div(ev);
		var eventWidth = hours_diff(ev.bhour, ev.ehour)*hourWidth;
		eventDiv.style.position = "absolute";
		eventDiv.style.width = px(eventWidth);
		eventDiv.style.height = px(eventHeight);
		eventDiv.style.left = px(timelineWidth);
		//eventDiv.style.background = unique_color(i);
		//eventDiv.style.color = contrast_color(eventDiv.style.background);
		div.appendChild(eventDiv);
		timelineWidth += eventWidth + timelineHSep;
	}
	div.style.width = px(timelineWidth);
	div.style.height = px(timelineHeight);
	div.style.background = timelineBgcol;
	div.style.color = contrast_color(timelineBgcol);
	div.innerHTML = "timeline";
	return div;
}

testTimelineJSON = JSON.parse('{"timeline": {"events": [{"ehour": 1380, "name": "Carrete Lucas", "bhour": 1230, "location": "Santa Julia"}, {"ehour": 1650, "name": "Carrete en Bella", "bhour": 1410, "location": "harvard"}]}}').timeline;

function red_rectangle_div() {
	var div = document.createElement("div");
	div.style.width = px(128);
	div.style.height = px(96);
	div.style.background = "red";
	div.style.color = "yellow";
	div.innerHTML = "test";
	return div;
}

function rectangle_container_div() {
	var div = document.createElement("div");
	var eventDiv = event_div(testTimelineJSON.events[1]);
	eventDiv.style.width = px(200);
	eventDiv.style.left = px(100);
	eventDiv.style.color = "pink";
	eventDiv.style.position = "absolute";
	div.appendChild(eventDiv);
	div.style.width = px(256);
	div.style.height = px(160);
	div.style.background = "blue";
	div.appendChild(event_div(testTimelineJSON.events[0]));
	return div;
}
