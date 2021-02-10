var server = "ws://192.168.18.242:8188";

var janus = null;
var streaming = null;
var opaqueId ="streamingtest-"+Janus.randomString(12);// "99";//"rstp-test";

var bitrateTimer = null;
var spinner = null;

var simulcastStarted = false, svcStarted = false;

//var selectedStream = 3;//null;

var notStream=true;
// 
function streamF () { 
	Janus.init({debug: "all", callback: function() {
		// Use a button to start the demo
		
			//console.log("start  WebRTC support... 67 ");
			$(this).attr('disabled', true).unbind('click');
			// Make sure the browser supports WebRTC
			if(!Janus.isWebrtcSupported()) {
				console.log("No WebRTC support... ");
				return;
			}
			// Create session
			janus = new Janus(
				{
					server: server,
					success: function() {
						// Attach to streaming plugin
						janus.attach(
							{
								plugin: "janus.plugin.streaming",
								 
								success: function(pluginHandle) {
									$('#details').remove();
									streaming = pluginHandle;
									Janus.log("Plugin attached! (" + streaming.getPlugin() + ", id=" + streaming.getId() + ")");
									// Setup streaming session
									$('#update-streams').click(updateStreamsList);
									updateStreamsList();
									$('#start').removeAttr('disabled').html("Спри")
										.click(function() {
											$(this).attr('disabled', true);
											clearInterval(bitrateTimer);
											janus.destroy();
											$('#streamslist').attr('disabled', true);
											$('#watch').attr('disabled', true).unbind('click');
											$('#start').attr('disabled', true).html("Bye").unbind('click');
										});
								},
								error: function(error) {
									//Janus.error("  -- Error attaching plugin... ", error);
									//bootbox.alert("Error attaching plugin... " + error);
									notStream=false;
								},
								onmessage: function(msg, jsep) {
									Janus.debug(" ::: Got a message :::");
									//Janus.debug(msg);
									var result = msg["result"];
									if(result !== null && result !== undefined) {
										if(result["status"] !== undefined && result["status"] !== null) {
											var status = result["status"];
											if(status === 'starting')
												$('#status').removeClass('hide').text("Starting, please wait...").show();
											else if(status === 'started')
												$('#status').removeClass('hide').text("Started").show();
											else if(status === 'stopped')
												stopStream();
										} else if(msg["streaming"] === "event") {
											// Is simulcast in place?
											var substream = result["substream"];
											var temporal = result["temporal"];
 
											// Is VP9/SVC in place?
											var spatial = result["spatial_layer"];
											temporal = result["temporal_layer"];
 
										}
									} else if(msg["error"] !== undefined && msg["error"] !== null) {
										//bootbox.alert(msg["error"]);
										
										stopStream();
										return;
									}
									if(jsep !== undefined && jsep !== null) {
										Janus.debug("Handling SDP as well...");
										Janus.debug(jsep);
										// Offer from the plugin, let's answer
										streaming.createAnswer(
											{
												jsep: jsep,
												media: { audioSend: false, videoSend: false },	// We want recvonly audio/video
												success: function(jsep) {
													Janus.debug("Got SDP!");
													Janus.debug(jsep);
													var body = { "request": "start" };
													streaming.send({"message": body, "jsep": jsep});
													$('#watch').html("Stop").removeAttr('disabled').click(stopStream);
												},
												error: function(error) {
													Janus.error("WebRTC error:", error);
													console.log("jsep == null 164"+error);
													bootbox.alert("WebRTC error... " + JSON.stringify(error));
												}
											});
									} else {
										/////
										//createOffer(handleId, media, callbacks);
										console.log("jsep == null 169");
										///////////
									}
								},
								onremotestream: function(stream) {
									Janus.debug(" ::: Got a remote stream :::");
									Janus.debug(stream);
									var addButtons = false;
									if($('#remotevideo').length === 0) {
										addButtons = true;
										$('#stream').append('<video class="rounded centered hide" id="remotevideo" width=640 height=360 autoplay playsinline/>');
										// Show the stream and hide the spinner when we get a playing event
										$("#remotevideo").bind("playing", function () {
											$('#waitingvideo').remove();
											if(this.videoWidth)
												$('#remotevideo').removeClass('hide').show();
											if(spinner !== null && spinner !== undefined)
												spinner.stop();
											spinner = null;
											var videoTracks = stream.getVideoTracks();
											if(videoTracks === null || videoTracks === undefined || videoTracks.length === 0)
												return;
											var width = this.videoWidth;
											var height = this.videoHeight;
											$('#curres').removeClass('hide').text(width+'x'+height).show();
											if(Janus.webRTCAdapter.browserDetails.browser === "firefox") {
												// Firefox Stable has a bug: width and height are not immediately available after a playing
												setTimeout(function() {
													var width = $("#remotevideo").get(0).videoWidth;
													var height = $("#remotevideo").get(0).videoHeight;
													$('#curres').removeClass('hide').text(width+'x'+height).show();
												}, 2000);
											}
										});
									}
									Janus.attachMediaStream($('#remotevideo').get(0), stream);
									var videoTracks = stream.getVideoTracks();
									if(videoTracks === null || videoTracks === undefined || videoTracks.length === 0) {
										// No remote video
										$('#remotevideo').hide();
										if($('#stream .no-video-container').length === 0) {
											$('#stream').append(
												'<div class="no-video-container">' +
													'<i class="fa fa-video-camera fa-5 no-video-icon"></i>' +
													'<span class="no-video-text">No remote video available</span>' +
												'</div>');
										}
									} else {
										$('#stream .no-video-container').remove();
										$('#remotevideo').removeClass('hide').show();
									}
									if(!addButtons)
										return;
									if(videoTracks && videoTracks.length &&
											(Janus.webRTCAdapter.browserDetails.browser === "chrome" ||
												Janus.webRTCAdapter.browserDetails.browser === "firefox" ||
												Janus.webRTCAdapter.browserDetails.browser === "safari")) {
										$('#curbitrate').removeClass('hide').show();
										bitrateTimer = setInterval(function() {
											// Display updated bitrate, if supported
											var bitrate = streaming.getBitrate();
											//~ Janus.debug("Current bitrate is " + streaming.getBitrate());
											$('#curbitrate').text(bitrate);
											// Check if the resolution changed too
											var width = $("#remotevideo").get(0).videoWidth;
											var height = $("#remotevideo").get(0).videoHeight;
											if(width > 0 && height > 0)
												$('#curres').removeClass('hide').text(width+'x'+height).show();
										}, 1000);
									}
								},
								oncleanup: function() {
									Janus.log(" ::: Got a cleanup notification :::");
									$('#waitingvideo').remove();
									$('#remotevideo').remove();
									$('.no-video-container').remove();
									$('#bitrate').attr('disabled', true);
									$('#bitrateset').html('Bandwidth<span class="caret"></span>');
									$('#curbitrate').hide();
									if(bitrateTimer !== null && bitrateTimer !== undefined)
										clearInterval(bitrateTimer);
									bitrateTimer = null;
									$('#curres').hide();
									$('#simulcast').remove();
									simulcastStarted = false;
								}
							});
					},
					error: function(error) {
						Janus.error(error);
						notStream=false;
					/*	bootbox.alert(error, function() {
							window.location.reload();
						});*/
					},
					destroyed: function() {
						window.location.reload();
					}
				});

	 
	}});
	
}
$(document).ready(function() {
	function streamF3() { 
	// Initialize the library (all console debuggers enabled)

	}
});

 

function updateStreamsList() {
	$('#update-streams').unbind('click').addClass('fa-spin');
	var body = { "request": "list" };
	Janus.debug("Sending message (" + JSON.stringify(body) + ")");
	streaming.send({"message": body, success: function(result) {
		setTimeout(function() {
			$('#update-streams').removeClass('fa-spin').click(updateStreamsList);
		}, 500);
		if(result === null || result === undefined) {
			bootbox.alert("Got no response to our query for available streams");
			return;
		}
		if(result["list"] !== undefined && result["list"] !== null) {
			$('#streams').removeClass('hide').show();
			$('#streamslist').empty();
			$('#watch').attr('disabled', true).unbind('click');
			var list = result["list"];
			Janus.log("Got a list of available streams");
			Janus.debug(list);
			for(var mp in list) {
				Janus.debug("  >> [" + list[mp]["id"] + "] " + list[mp]["description"] + " (" + list[mp]["type"] + ")");
				$('#streamslist').append("<li><a href='#' id='" + list[mp]["id"] + "'>" + list[mp]["description"] + " (" + list[mp]["type"] + ")" + "</a></li>");
			}
			$('#streamslist a').unbind('click').click(function() {
				selectedStream = $(this).attr("id");
				$('#streamset').html($(this).html()).parent().removeClass('open');
				return false;

			});
			 
			startStream();/////////
			$('#watch').removeAttr('disabled').unbind('click').click(startStream);
		}
	}});
	
}

function startStream() {
	///Janus.log("Selected video id #" + selectedStream);
	/*
	if(selectedStream === undefined || selectedStream === null) {
		bootbox.alert("Select a stream from the list");
		return;
	}
	*/
	$('#streamset').attr('disabled', true);
	$('#streamslist').attr('disabled', true);
	$('#watch').attr('disabled', true).unbind('click');
 
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// "request" : "configure",
	/*var body = { "request": "watch", id: parseInt(selectedStream), "offer_audio" : false,"offer_video" : true, "offer_data" :false, "rtsp_user" : "admin", "rtsp_pwd" :"ms1234",
	"url": "rtsp://62.176.127.210:554/sub", "description" : "RTSP Test"
	};
	*/
	var body = { "request": "watch", id: parseInt(selectedStream), "offer_audio" : false,"offer_video" : true};
	//var body = {  "request" : "configure", "offer_audio" : false,"offer_video" : true,"offer_data" :true };
	 
	streaming.send({"message": body});
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// No remote video yet
	$('#stream').append('<video class="rounded centered" id="waitingvideo" width=640 height=360 />');

}

function stopStream() {
	$('#watch').attr('disabled', true).unbind('click');
	var body = { "request": "stop" };
	if (notStream){
		streaming.send({"message": body});
		streaming.hangup();
	}

	$('#streamset').removeAttr('disabled');
	$('#streamslist').removeAttr('disabled');
	$('#watch').html("Пусни").removeAttr('disabled').unbind('click').click(startStream);
	$('#status').empty().hide();
	$('#bitrate').attr('disabled', true);
	$('#bitrateset').html('Bandwidth<span class="caret"></span>');
	$('#curbitrate').hide();
	if(bitrateTimer !== null && bitrateTimer !== undefined)
		clearInterval(bitrateTimer);
	bitrateTimer = null;
	$('#curres').empty().hide();
	$('#simulcast').remove();
	simulcastStarted = false;
}
