// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .
//= require recorder


function timecode(ms) {
	var hms = {
	  h: Math.floor(ms/(60*60*1000)),
	  m: Math.floor((ms/60000) % 60),
	  s: Math.floor((ms/1000) % 60)
	};
	var tc = []; // Timecode array to be joined with '.'

	if (hms.h > 0) {
	  tc.push(hms.h);
	}

	tc.push((hms.m < 10 && hms.h > 0 ? "0" + hms.m : hms.m));
	tc.push((hms.s < 10  ? "0" + hms.s : hms.s));

	return tc.join(':');
}

function record(){
	Recorder.record({
	  start: function(){
	    alert("recording starts now. press stop when youre done. and then play or upload if you want.");
	  },
	  progress: function(milliseconds){
	    document.getElementById("time").innerHTML = timecode(milliseconds);
	  }
	});
}

function play(){
  Recorder.stop();
  Recorder.play({
    progress: function(milliseconds){
      document.getElementById("time").innerHTML = timecode(milliseconds);
    }
  });
}

function stop(){
  Recorder.stop();
}

function upload(){
  Recorder.upload({
    url: "https://example.com/upload",
    audioParam: "your_file",
    success: function(){
      alert("your file was uploaded!");
    }
  });
}

$(function(){
  Recorder.initialize({
  	swfSrc: "/swf/recorder.swf",                               // URL to recorder.swf
  	// optional:
  	flashContainer: document.getElementById("#recorder")
  });
});