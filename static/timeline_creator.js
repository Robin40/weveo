window.userTimeline = testTimelineJSON;//emptyTimelineJSON;
function timelinePreview_update() {
	var div = document.getElementById('timelinePreview');
	if (!div.hasChildNodes()) {
		div.appendChild(timeline_div(userTimeline));
		return;
	}
	
	div.removeChild(div.firstChild);
	div.appendChild(timeline_div(userTimeline));
}

function add_event(ev) {
	userTimeline.events.push(ev);
	timelinePreview_update();
}
