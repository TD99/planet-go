export function getOrientation() {
    let orientation;
    if (screen.orientation && screen.orientation.type) {
      orientation = screen.orientation.type;
    } else {
      orientation = screen.orientation;
    }
    return orientation;
}

export function onHeadingChange(event: any) {
  var heading = event.alpha;

  if (typeof event.webkitCompassHeading !== "undefined") {
    heading = event.webkitCompassHeading; //iOS non-standard
  }

  if (typeof heading !== "undefined" && heading !== null) {
    var phase = heading < 0 ? 360 + heading : heading;
    console.log((360 - phase | 0) + "°");
  } else {
    // device can't show heading
    console.log("n/a");
  }
}
