// We make use of this 'server' variable to provide the address of the
// REST Janus API. By default, in this example we assume that Janus is
// co-located with the web server hosting the HTML pages but listening
// on a different port (8088, the default for HTTP in Janus), which is
// why we make use of the 'window.location.hostname' base address. Since
// Janus can also do HTTPS, and considering we don't really want to make
// use of HTTP for Janus if your demos are served on HTTPS, we also rely
// on the 'window.location.protocol' prefix to build the variable, in
// particular to also change the port used to contact Janus (8088 for
// HTTP and 8089 for HTTPS, if enabled).
// In case you place Janus behind an Apache frontend (as we did on the
// online demos at http://janus.conf.meetecho.com) you can just use a
// relative path for the variable, e.g.:
//
// 		var server = "/janus";
//
// which will take care of this on its own.
//
//
// If you want to use the WebSockets frontend to Janus, instead, you'll
// have to pass a different kind of address, e.g.:
//
// 		var server = "ws://" + window.location.hostname + ":8188";
//
// Of course this assumes that support for WebSockets has been built in
// when compiling the server. WebSockets support has not been tested
// as much as the REST API, so handle with care!
//
//
// If you have multiple options available, and want to let the library
// autodetect the best way to contact your server (or pool of servers),
// you can also pass an array of servers, e.g., to provide alternative
// means of access (e.g., try WebSockets first and, if that fails, fall
// back to plain HTTP) or just have failover servers:
//
//		var server = [
//			"ws://" + window.location.hostname + ":8188",
//			"/janus"
//		];
//
// This will tell the library to try connecting to each of the servers
// in the presented order. The first working server will be used for
// the whole session.
//
//var server = "/janus";

var server = "ws://192.168.18.242:8188";
//var server = "ws://192.168.10.203:8188";
var passwordice="";
var flagice="";
var allResponce="";
var fmtp=null;
var ssrcgroup=null;

var ssrcgroup1=null;
var ssrcgroup2=null;
var mountpoint=null;
var janus = null;
var streaming = null;
var opaqueId ="streamingtest-"+  "99";//"rstp-test";

var bitrateTimer = null;
var spinner = null;

var simulcastStarted = false, svcStarted = false;

var selectedStream = 3;//null;

function streamF() {
}

$(document).ready(function() {
	 
	// Initialize the library (all console debuggers enabled)
	Janus.init({debug: "all", callback: function() {
		// Use a button to start the demo
		$('#start').one('click', function() {
			console.log("start  WebRTC support... 67 ");
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
								opaqueId: opaqueId,
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
									Janus.error("  -- Error attaching plugin... ", error);
									alert("Error attaching plugin... " + error);
								},
								onmessage: function(msg, jsep) {
									Janus.debug(" ::: Got a message :::");
									
												var output = '';
												for (var property in jsep) {
												  output += property + ': ' + jsep[property]+'; ';
												}

												console.log(output);
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
											if((substream !== null && substream !== undefined) || (temporal !== null && temporal !== undefined)) {
												if(!simulcastStarted) {
													simulcastStarted = true;
													addSimulcastButtons(temporal !== null && temporal !== undefined);
												}
												// We just received notice that there's been a switch, update the buttons
												updateSimulcastButtons(substream, temporal);
											}
											// Is VP9/SVC in place?
											var spatial = result["spatial_layer"];
											temporal = result["temporal_layer"];
											if((spatial !== null && spatial !== undefined) || (temporal !== null && temporal !== undefined)) {
												if(!svcStarted) {
													svcStarted = true;
													addSvcButtons();
												}
												// We just received notice that there's been a switch, update the buttons
												updateSvcButtons(spatial, temporal);
											}
										}
									} else if(msg["error"] !== undefined && msg["error"] !== null) {
										alert(msg["error"]);
										stopStream();
										return;
									}
							 
									if(jsep !== undefined && jsep !== null) {
//										Janus.debug("Handling SDP as well...");
 
										var output = '';
									//	jsep.sdp = jsep.sdp.replace("setup:actpass" ,"setup:passive");
										allResponce=jsep;//.sdp;
										
										for (var property in jsep) {
											  output += property + ': ' + jsep[property]+'; ';
											  var includesICE = jsep[property].includes("ice-pwd");
											  
											  
											  console.log(includesICE);
											  
											  
											      if(includesICE==true){
											    	  console.log("-----^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^----------");
											    	  var s = jsep[property].search("ice-ufrag:");
											    	  flagice= jsep[property].substring(s+10, s+14);
											     
											    	  var k = jsep[property].search("fmtp:");
											    	  fmtp= jsep[property].substring(k+5, k+103);
											    	  
											    	  var n = jsep[property].search("ice-pwd:");
											    	
											    	  passwordice = jsep[property].substring(n+8, n+31);
											    	  
											    	  var l = jsep[property].search("ssrc-group:");
											    	  
											    	  ssrcgroup = jsep[property].substring(l+11, l+36);
											    	  
											    	  ssrcgroup1= jsep[property].substring(l+15, l+25);
											    	  ssrcgroup2= jsep[property].substring(l+26, l+36);
											    	  
											    	  var h = jsep[property].search("Mountpoint ");
											    	  
											    	  mountpoint= jsep[property].substring(h+11, h+12);
											    	  
											    	  
											    	  console.log(passwordice);
											    	  console.log(flagice);
											    	  console.log(fmtp);
								    	  
											    	  console.log("-----^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^----------"+ssrcgroup1+"--"+ssrcgroup2);
											      }
											}
										
										  console.log("-----------*****************----------------");
										  console.log(output);
										  
										  console.log("-----------*****************----------------");
										// Offer from the plugin, let's answer
										// alert("strat streaming.createAnswer");  
										streaming.createAnswer(
											{
												jsep: allResponce,
												media: { videoSend: false ,audioSend: false },	// We want recvonly audio/video
												success: function(jsep) {
													//jsep = allResponce;
													//Janus.debug(jsep);
												//	console.log("----------////////////////--------------");
												//	console.log(jsep);
												//	console.log("----------////////////////--------------");
													//jsep.sdp = jsep.sdp.replace("setup:active" ,"setup:passive");
								                    if(adapter.browserDetails.browser === "edge") {
							                             // This is Edge, add an a=end-of-candidates at the end
							                      //       jsep.sdp += "a=end-of-candidates\r\n";
								                    }
								            	//	alert("createAnswer"); 
								                 //   if(adapter.browserDetails.browser === "firefox") {
 /*
									                    if(adapter.browserDetails.browser === "edge") {
								                             // This is Edge, add an a=end-of-candidates at the end
								                             jsep.sdp += "a=end-of-candidates\r\n";
									                    }
											                	//	jsep.sdp = jsep.sdp.replace("a=mid:video", "a=mid:video\r\na=fmtp:"+fmtp+"\r\na=ice-ufrag:"+flagice+"\r\na=ice-pwd:"+passwordice+"\r\na=ssrc-group:"+ssrcgroup+"\r\na=end-of-candidates");
											                    //	var obj2 = {toJSON:"function toJSON() { [native code] }"};
											                    ///	$.extend(jsep, obj2); 
								                    	
									                    	 var pc = new RTCPeerConnection(configuration);
										                     var oldsdp = jsep["sdp"];
										                     var pattern=/420029/gi;
										                     var newsdp = oldsdp.replace(pattern,"42e01f");
										                     Janus.log(newsdp);
										                     jsep["sdp"]=newsdp;
										                     config.pc.setRemoteDescription(
										                                     new RTCSessionDescription(jsep),
										                                     function() {
										                                             Janus.log("Remote description accepted!");
										                                             createAnswer(handleId, media, callbacks);
										                                     }, callbacks.error);
								                   
								                    	
								                    	jsep.sdp = allResponce;
								                    	
								                    	jsep.sdp = jsep.sdp.replace("Mountpoint "+mountpoint ,"-"); 
								                    	
								                    	jsep.sdp = jsep.sdp.replace("1 IN IP4 192.168.10.242" ,"2 IN IP4 IP4 127.0.0.1");
								                    	jsep.sdp = jsep.sdp.replace("IN IP4 192.168.10.242" ,"IN IP4 0.0.0.0");
								                    	jsep.sdp = jsep.sdp.replace("actpass" ,"active");
								                    	jsep.sdp = jsep.sdp.replace("sendonly" ,"recvonly");
								                    	

								                    	jsep.sdp = jsep.sdp.replace("a=ssrc-group:FID "+ssrcgroup1+" "+ssrcgroup2+"\r\n" ,"");
								                    	
								                    	jsep.sdp = jsep.sdp.replace("a=ssrc:"+ssrcgroup1+" cname:janus\r\n" ,"");
								                    	jsep.sdp = jsep.sdp.replace("a=ssrc:"+ssrcgroup1+" msid:janus janusv0\r\n" ,"");
								                    	jsep.sdp = jsep.sdp.replace("a=ssrc:"+ssrcgroup1+" mslabel:janus\r\n" ,"");
								                    	jsep.sdp = jsep.sdp.replace("a=ssrc:"+ssrcgroup1+" label:janusv0\r\n" ,"");
								                    	
								                    	jsep.sdp = jsep.sdp.replace("a=msid-semantic: WMS janus\r\n" ,"a=msid-semantic: WMS\r\n");
								                    	
								                    	jsep.sdp = jsep.sdp.replace("a=ssrc:"+ssrcgroup2+" cname:janus\r\n" ,"");
								                    	jsep.sdp = jsep.sdp.replace("a=ssrc:"+ssrcgroup2+" msid:janus janusv0\r\n" ,"");
								                    	jsep.sdp = jsep.sdp.replace("a=ssrc:"+ssrcgroup2+" mslabel:janus\r\n" ,"");
								                    	jsep.sdp = jsep.sdp.replace("a=ssrc:"+ssrcgroup2+" label:janusv0\r\n" ,"");
								                    	jsep.sdp = jsep.sdp.replace("a=msid:janus janusv0\r\n" ,"");
						                    	
								                    	
								                    	jsep.sdp = allResponce;
								                    	
								                    	allResponce = allResponce.replace("Mountpoint "+mountpoint ,"-"); 
								                    	
								                    	allResponce = allResponce.replace("1 IN IP4 192.168.10.242" ,"2 IN IP4 IP4 127.0.0.1");
								                    	allResponce = allResponce.replace("IN IP4 192.168.10.242" ,"IN IP4 0.0.0.0");
								                    	allResponce = allResponce.replace("actpass" ,"active");
								                    	allResponce = allResponce.replace("sendonly" ,"recvonly");
								                    	
								                    	
								                    	
								                    	allResponce = allResponce.replace("a=ssrc-group:FID "+ssrcgroup1+" "+ssrcgroup2+"\r\n" ,"");
								                    	
								                    	allResponce = allResponce.replace("a=ssrc:"+ssrcgroup1+" cname:janus\r\n" ,"");
								                    	allResponce = allResponce.replace("a=ssrc:"+ssrcgroup1+" msid:janus janusv0\r\n" ,"");
								                    	allResponce = allResponce.replace("a=ssrc:"+ssrcgroup1+" mslabel:janus\r\n" ,"");
								                    	allResponce = allResponce.replace("a=ssrc:"+ssrcgroup1+" label:janusv0\r\n" ,"");
								                    	
								                    	allResponce = allResponce.replace("a=msid-semantic: WMS janus\r\n" ,"a=msid-semantic: WMS\r\n");
								                    	
								                    	allResponce = allResponce.replace("a=ssrc:"+ssrcgroup2+" cname:janus\r\n" ,"");
								                    	allResponce = allResponce.replace("a=ssrc:"+ssrcgroup2+" msid:janus janusv0\r\n" ,"");
								                    	allResponce = allResponce.replace("a=ssrc:"+ssrcgroup2+" mslabel:janus\r\n" ,"");
								                    	allResponce = allResponce.replace("a=ssrc:"+ssrcgroup2+" label:janusv0\r\n" ,"");
								                    	allResponce = allResponce.replace("a=msid:janus janusv0\r\n" ,"");
								                    	 */
								                    	console.log("Got SDP!");
														
													//	var output = '';
 
												//		console.log("----$$$$$$$$$$$$$$$$$$---");
												//		console.log(allResponce);
												//		console.log("------$$$$$$$$$$$$-----");
														//jsep.sdp = jsep.sdp.replace("a=setup:active", "a=setup:passive");
													//	jsep.sdp = jsep.sdp.replace("a=rtpmap:96 H264/90000", "a=setup:passive");
														
								           //         	jsep.sdp = jsep.sdp.replace("a=rtpmap:120 VP8/90000", "m=video 9 UDP/TLS/RTP/SAVPF 96 97\r\na=setup:passive");
							                    	
								                    	//jsep
								                    //	var obj5 = {toJSON:"function toJSON() { [native code] }"};
								                    //	$.extend(jsep, obj5); 
								                    //	jsep.sdp = jsep.sdp.replace("rtpmap:97 rtx/90000" ,"rtpmap:96 H264/90000");

								                    	
								                    	//jsep.sdp = jsep.sdp.replace("rtpmap:120 VP8/90000" ,"rtpmap:97 rtx/90000");
								                    	//jsep.sdp = jsep.sdp.replace("a=rtpmap:120 VP8/90000", "a=ice-ufrag:"+flagice+"\r\na=fmtp:"+fmtp+"\r\na=ice-pwd:"+passwordice+"\r\na=ssrc-group:"+ssrcgroup+"\r\na=fmtp:97 apt=96\r\na=rtpmap:120 VP8/90000\r\na=end-of-candidates");
								              //      }
										/*
													
												    if(jsep.sdp && jsep.sdp.indexOf("\r\na=ice-ufrag") === -1) {
												    	  Janus.debug("------------------jsep.sdp && jsep.sdp.indexOf------------------------------");
										                    jsep.sdp = jsep.sdp.replace("a=mid:video", "a=test");
										            }
										    */        
 
														console.log("Got SDP!");
													
													var output = '';
													for (var property in jsep) {
													  output += property + ': ' + jsep[property]+'; ';
													}
													
													console.log("--------%%%%%%%%%%%%%---------");
													console.log(output);
													console.log("--------%%%%%%%%%%%%%---------");
											 
													var body = { "request": "start" };
													
													streaming.send({"message": body, "jsep": jsep});
													
													$('#watch').html("Stop").removeAttr('disabled').click(stopStream);
												},
												error: function(error) {
													Janus.error("WebRTC error:", error);
													console.log("jsep == null 164"+error);
	//												alert("WebRTC error... " + JSON.stringify(error));
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
								//	Janus.debug(stream);
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
												
												//alert("firefox")
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
						alert(error, function() {
							window.location.reload();
						});
					},
					destroyed: function() {
						window.location.reload();
					}
				});

		});
	}});
	
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
			alert("Got no response to our query for available streams");
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
			 
			//startStream();/////////
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
	var body = { "request": "watch", id: parseInt(selectedStream), "offer_video" : true,"offer_audio" : false,"offer_data" :false };
	//var body = {  "request" : "configure", "offer_audio" : false,"offer_video" : true,"offer_data" :true };
	 
	streaming.send({"message": body});
	
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// No remote video yet
	$('#stream').append('<video class="rounded centered" id="waitingvideo" width=640 height=360 />');
	
	if(spinner == null) {
		var target = document.getElementById('stream');
		spinner = new Spinner({top:100}).spin(target);
	} else {
		spinner.spin();
	}
	
}

function stopStream() {
	$('#watch').attr('disabled', true).unbind('click');
	var body = { "request": "stop" };
	streaming.send({"message": body});
	streaming.hangup();
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

// Helpers to create Simulcast-related UI, if enabled

function addSimulcastButtons(temporal) {
	$('#curres').parent().append(
		'<div id="simulcast" class="btn-group-vertical btn-group-vertical-xs pull-right">' +
		'	<div class"row">' +
		'		<div class="btn-group btn-group-xs" style="width: 100%">' +
		'			<button id="sl-2" type="button" class="btn btn-primary" data-toggle="tooltip" title="Switch to higher quality" style="width: 33%">SL 2</button>' +
		'			<button id="sl-1" type="button" class="btn btn-primary" data-toggle="tooltip" title="Switch to normal quality" style="width: 33%">SL 1</button>' +
		'			<button id="sl-0" type="button" class="btn btn-primary" data-toggle="tooltip" title="Switch to lower quality" style="width: 34%">SL 0</button>' +
		'		</div>' +
		'	</div>' +
		'	<div class"row">' +
		'		<div class="btn-group btn-group-xs hide" style="width: 100%">' +
		'			<button id="tl-2" type="button" class="btn btn-primary" data-toggle="tooltip" title="Cap to temporal layer 2" style="width: 34%">TL 2</button>' +
		'			<button id="tl-1" type="button" class="btn btn-primary" data-toggle="tooltip" title="Cap to temporal layer 1" style="width: 33%">TL 1</button>' +
		'			<button id="tl-0" type="button" class="btn btn-primary" data-toggle="tooltip" title="Cap to temporal layer 0" style="width: 33%">TL 0</button>' +
		'		</div>' +
		'	</div>' +
		'</div>');
	// Enable the simulcast selection buttons
	$('#sl-0').removeClass('btn-primary btn-success').addClass('btn-primary')
		.unbind('click').click(function() {
			toastr.info("Switching simulcast substream, wait for it... (lower quality)", null, {timeOut: 2000});
			if(!$('#sl-2').hasClass('btn-success'))
				$('#sl-2').removeClass('btn-primary btn-info').addClass('btn-primary');
			if(!$('#sl-1').hasClass('btn-success'))
				$('#sl-1').removeClass('btn-primary btn-info').addClass('btn-primary');
			$('#sl-0').removeClass('btn-primary btn-info btn-success').addClass('btn-info');
			streaming.send({message: { request: "configure", substream: 0 }});
		});
	$('#sl-1').removeClass('btn-primary btn-success').addClass('btn-primary')
		.unbind('click').click(function() {
			toastr.info("Switching simulcast substream, wait for it... (normal quality)", null, {timeOut: 2000});
			if(!$('#sl-2').hasClass('btn-success'))
				$('#sl-2').removeClass('btn-primary btn-info').addClass('btn-primary');
			$('#sl-1').removeClass('btn-primary btn-info btn-success').addClass('btn-info');
			if(!$('#sl-0').hasClass('btn-success'))
				$('#sl-0').removeClass('btn-primary btn-info').addClass('btn-primary');
			streaming.send({message: { request: "configure", substream: 1 }});
		});
	$('#sl-2').removeClass('btn-primary btn-success').addClass('btn-primary')
		.unbind('click').click(function() {
			toastr.info("Switching simulcast substream, wait for it... (higher quality)", null, {timeOut: 2000});
			$('#sl-2').removeClass('btn-primary btn-info btn-success').addClass('btn-info');
			if(!$('#sl-1').hasClass('btn-success'))
				$('#sl-1').removeClass('btn-primary btn-info').addClass('btn-primary');
			if(!$('#sl-0').hasClass('btn-success'))
				$('#sl-0').removeClass('btn-primary btn-info').addClass('btn-primary');
			streaming.send({message: { request: "configure", substream: 2 }});
		});
	if(!temporal)	// No temporal layer support
		return;
	$('#tl-0').parent().removeClass('hide');
	$('#tl-0').removeClass('btn-primary btn-success').addClass('btn-primary')
		.unbind('click').click(function() {
			toastr.info("Capping simulcast temporal layer, wait for it... (lowest FPS)", null, {timeOut: 2000});
			if(!$('#tl-2').hasClass('btn-success'))
				$('#tl-2').removeClass('btn-primary btn-info').addClass('btn-primary');
			if(!$('#tl-1').hasClass('btn-success'))
				$('#tl-1').removeClass('btn-primary btn-info').addClass('btn-primary');
			$('#tl-0').removeClass('btn-primary btn-info btn-success').addClass('btn-info');
			streaming.send({message: { request: "configure", temporal: 0 }});
		});
	$('#tl-1').removeClass('btn-primary btn-success').addClass('btn-primary')
		.unbind('click').click(function() {
			toastr.info("Capping simulcast temporal layer, wait for it... (medium FPS)", null, {timeOut: 2000});
			if(!$('#tl-2').hasClass('btn-success'))
				$('#tl-2').removeClass('btn-primary btn-info').addClass('btn-primary');
			$('#tl-1').removeClass('btn-primary btn-info').addClass('btn-info');
			if(!$('#tl-0').hasClass('btn-success'))
				$('#tl-0').removeClass('btn-primary btn-info').addClass('btn-primary');
			streaming.send({message: { request: "configure", temporal: 1 }});
		});
	$('#tl-2').removeClass('btn-primary btn-success').addClass('btn-primary')
		.unbind('click').click(function() {
			toastr.info("Capping simulcast temporal layer, wait for it... (highest FPS)", null, {timeOut: 2000});
			$('#tl-2').removeClass('btn-primary btn-info btn-success').addClass('btn-info');
			if(!$('#tl-1').hasClass('btn-success'))
				$('#tl-1').removeClass('btn-primary btn-info').addClass('btn-primary');
			if(!$('#tl-0').hasClass('btn-success'))
				$('#tl-0').removeClass('btn-primary btn-info').addClass('btn-primary');
			streaming.send({message: { request: "configure", temporal: 2 }});
		});
}

function updateSimulcastButtons(substream, temporal) {
	// Check the substream
	if(substream === 0) {
		toastr.success("Switched simulcast substream! (lower quality)", null, {timeOut: 2000});
		$('#sl-2').removeClass('btn-primary btn-success').addClass('btn-primary');
		$('#sl-1').removeClass('btn-primary btn-success').addClass('btn-primary');
		$('#sl-0').removeClass('btn-primary btn-info btn-success').addClass('btn-success');
	} else if(substream === 1) {
		toastr.success("Switched simulcast substream! (normal quality)", null, {timeOut: 2000});
		$('#sl-2').removeClass('btn-primary btn-success').addClass('btn-primary');
		$('#sl-1').removeClass('btn-primary btn-info btn-success').addClass('btn-success');
		$('#sl-0').removeClass('btn-primary btn-success').addClass('btn-primary');
	} else if(substream === 2) {
		toastr.success("Switched simulcast substream! (higher quality)", null, {timeOut: 2000});
		$('#sl-2').removeClass('btn-primary btn-info btn-success').addClass('btn-success');
		$('#sl-1').removeClass('btn-primary btn-success').addClass('btn-primary');
		$('#sl-0').removeClass('btn-primary btn-success').addClass('btn-primary');
	}
	// Check the temporal layer
	if(temporal === 0) {
		toastr.success("Capped simulcast temporal layer! (lowest FPS)", null, {timeOut: 2000});
		$('#tl-2').removeClass('btn-primary btn-success').addClass('btn-primary');
		$('#tl-1').removeClass('btn-primary btn-success').addClass('btn-primary');
		$('#tl-0').removeClass('btn-primary btn-info btn-success').addClass('btn-success');
	} else if(temporal === 1) {
		toastr.success("Capped simulcast temporal layer! (medium FPS)", null, {timeOut: 2000});
		$('#tl-2').removeClass('btn-primary btn-success').addClass('btn-primary');
		$('#tl-1').removeClass('btn-primary btn-info btn-success').addClass('btn-success');
		$('#tl-0').removeClass('btn-primary btn-success').addClass('btn-primary');
	} else if(temporal === 2) {
		toastr.success("Capped simulcast temporal layer! (highest FPS)", null, {timeOut: 2000});
		$('#tl-2').removeClass('btn-primary btn-info btn-success').addClass('btn-success');
		$('#tl-1').removeClass('btn-primary btn-success').addClass('btn-primary');
		$('#tl-0').removeClass('btn-primary btn-success').addClass('btn-primary');
	}
}

// Helpers to create SVC-related UI for a new viewer
function addSvcButtons() {
	if($('#svc').length > 0)
		return;
	$('#curres').parent().append(
		'<div id="svc" class="btn-group-vertical btn-group-vertical-xs pull-right">' +
		'	<div class"row">' +
		'		<div class="btn-group btn-group-xs" style="width: 100%">' +
		'			<button id="sl-1" type="button" class="btn btn-primary" data-toggle="tooltip" title="Switch to normal resolution" style="width: 50%">SL 1</button>' +
		'			<button id="sl-0" type="button" class="btn btn-primary" data-toggle="tooltip" title="Switch to low resolution" style="width: 50%">SL 0</button>' +
		'		</div>' +
		'	</div>' +
		'	<div class"row">' +
		'		<div class="btn-group btn-group-xs" style="width: 100%">' +
		'			<button id="tl-2" type="button" class="btn btn-primary" data-toggle="tooltip" title="Cap to temporal layer 2 (high FPS)" style="width: 34%">TL 2</button>' +
		'			<button id="tl-1" type="button" class="btn btn-primary" data-toggle="tooltip" title="Cap to temporal layer 1 (medium FPS)" style="width: 33%">TL 1</button>' +
		'			<button id="tl-0" type="button" class="btn btn-primary" data-toggle="tooltip" title="Cap to temporal layer 0 (low FPS)" style="width: 33%">TL 0</button>' +
		'		</div>' +
		'	</div>' +
		'</div>'
	);
	// Enable the VP8 simulcast selection buttons
	$('#sl-0').removeClass('btn-primary btn-success').addClass('btn-primary')
		.unbind('click').click(function() {
			toastr.info("Switching SVC spatial layer, wait for it... (low resolution)", null, {timeOut: 2000});
			if(!$('#sl-1').hasClass('btn-success'))
				$('#sl-1').removeClass('btn-primary btn-info').addClass('btn-primary');
			$('#sl-0').removeClass('btn-primary btn-info btn-success').addClass('btn-info');
			streaming.send({message: { request: "configure", spatial_layer: 0 }});
		});
	$('#sl-1').removeClass('btn-primary btn-success').addClass('btn-primary')
		.unbind('click').click(function() {
			toastr.info("Switching SVC spatial layer, wait for it... (normal resolution)", null, {timeOut: 2000});
			$('#sl-1').removeClass('btn-primary btn-info btn-success').addClass('btn-info');
			if(!$('#sl-0').hasClass('btn-success'))
				$('#sl-0').removeClass('btn-primary btn-info').addClass('btn-primary');
			streaming.send({message: { request: "configure", spatial_layer: 1 }});
		});
	$('#tl-0').removeClass('btn-primary btn-success').addClass('btn-primary')
		.unbind('click').click(function() {
			toastr.info("Capping SVC temporal layer, wait for it... (lowest FPS)", null, {timeOut: 2000});
			if(!$('#tl-2').hasClass('btn-success'))
				$('#tl-2').removeClass('btn-primary btn-info').addClass('btn-primary');
			if(!$('#tl-1').hasClass('btn-success'))
				$('#tl-1').removeClass('btn-primary btn-info').addClass('btn-primary');
			$('#tl-0').removeClass('btn-primary btn-info btn-success').addClass('btn-info');
			streaming.send({message: { request: "configure", temporal_layer: 0 }});
		});
	$('#tl-1').removeClass('btn-primary btn-success').addClass('btn-primary')
		.unbind('click').click(function() {
			toastr.info("Capping SVC temporal layer, wait for it... (medium FPS)", null, {timeOut: 2000});
			if(!$('#tl-2').hasClass('btn-success'))
				$('#tl-2').removeClass('btn-primary btn-info').addClass('btn-primary');
			$('#tl-1').removeClass('btn-primary btn-info').addClass('btn-info');
			if(!$('#tl-0').hasClass('btn-success'))
				$('#tl-0').removeClass('btn-primary btn-info').addClass('btn-primary');
			streaming.send({message: { request: "configure", temporal_layer: 1 }});
		});
	$('#tl-2').removeClass('btn-primary btn-success').addClass('btn-primary')
		.unbind('click').click(function() {
			toastr.info("Capping SVC temporal layer, wait for it... (highest FPS)", null, {timeOut: 2000});
			$('#tl-2').removeClass('btn-primary btn-info btn-success').addClass('btn-info');
			if(!$('#tl-1').hasClass('btn-success'))
				$('#tl-1').removeClass('btn-primary btn-info').addClass('btn-primary');
			if(!$('#tl-0').hasClass('btn-success'))
				$('#tl-0').removeClass('btn-primary btn-info').addClass('btn-primary');
			streaming.send({message: { request: "configure", temporal_layer: 2 }});
		});
}

function updateSvcButtons(spatial, temporal) {
	// Check the spatial layer
	if(spatial === 0) {
		toastr.success("Switched SVC spatial layer! (lower resolution)", null, {timeOut: 2000});
		$('#sl-1').removeClass('btn-primary btn-success').addClass('btn-primary');
		$('#sl-0').removeClass('btn-primary btn-info btn-success').addClass('btn-success');
	} else if(spatial === 1) {
		toastr.success("Switched SVC spatial layer! (normal resolution)", null, {timeOut: 2000});
		$('#sl-1').removeClass('btn-primary btn-info btn-success').addClass('btn-success');
		$('#sl-0').removeClass('btn-primary btn-success').addClass('btn-primary');
	}
	// Check the temporal layer
	if(temporal === 0) {
		toastr.success("Capped SVC temporal layer! (lowest FPS)", null, {timeOut: 2000});
		$('#tl-2').removeClass('btn-primary btn-success').addClass('btn-primary');
		$('#tl-1').removeClass('btn-primary btn-success').addClass('btn-primary');
		$('#tl-0').removeClass('btn-primary btn-info btn-success').addClass('btn-success');
	} else if(temporal === 1) {
		toastr.success("Capped SVC temporal layer! (medium FPS)", null, {timeOut: 2000});
		$('#tl-2').removeClass('btn-primary btn-success').addClass('btn-primary');
		$('#tl-1').removeClass('btn-primary btn-info btn-success').addClass('btn-success');
		$('#tl-0').removeClass('btn-primary btn-success').addClass('btn-primary');
	} else if(temporal === 2) {
		toastr.success("Capped SVC temporal layer! (highest FPS)", null, {timeOut: 2000});
		$('#tl-2').removeClass('btn-primary btn-info btn-success').addClass('btn-success');
		$('#tl-1').removeClass('btn-primary btn-success').addClass('btn-primary');
		$('#tl-0').removeClass('btn-primary btn-success').addClass('btn-primary');
	}
}
