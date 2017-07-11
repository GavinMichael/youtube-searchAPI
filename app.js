


$(document).ready(function(){

	(function(){

		// Variables
		const $searchTxt = $("#searchTxt");
		const $results = $("#results");
		const $searchBtn = $("#searchBtn");
		const youtubeURL = "https://www.googleapis.com/youtube/v3/search";
		const $collection = $(".collection");


		//$results.fadeIn(3000);

		// Search button event listener
		$searchBtn.on("click", function(){
			
			let query = $searchTxt.val();

			//check if query len is more than 3 chars
			if (query.length > 3){
				// when the search button is clicked, 
				// take the search text box value and call the handleSearch()
				// passing in the query
				
				$results.fadeIn(5000);

				handleSearch(query);
			} else {
				$searchTxt.focus();
			}

		});

		function handleSearch(query){
			
			// jQuery GET request
			// hitting the Youtube URL 
			// sending the request obj with the query included

			$.get(youtubeURL, {'maxResults': '50',
				'part': 'snippet',
				'q': query,
				'type': '',
				key: 'YOUR_API_KEY_HERE'
			}, 
			function(data){
	     	//call the handleData function 
	     	handleData(data);
     	}) // end of $.get

		}; // end of handleSearch()

		// JSON data passed in
		// Take the data and plug into HTML
		function handleData(data) {

			// clearing the items inside
			// when performing second search
			$results.html = "";

			// loop through all the data obj
			data.items.forEach((currentValue, index, array)=>{

				// find the 
				// [0].id.videoId
				// [0].snippet.title
				// [0].snippet.description
				// [0].snippet.thumbnails.medium.url				

				let vidID = currentValue.id.videoId;
				let channelId = currentValue.snippet.channelId;
				let title = currentValue.snippet.title;
				let creator = currentValue.snippet.channelTitle;
				let uploadDateTime = currentValue.snippet.publishedAt;
				//get only the date
				//ignore the time
				let uploadDateOnly = uploadDateTime.slice(0, uploadDateTime.indexOf("T"));
				let desc = currentValue.snippet.description;
				let imageURL = currentValue.snippet.thumbnails.medium.url;

				//call the generateHTML passing in the required info
				generateHTML(vidID, channelId, title, creator, uploadDateOnly, desc, imageURL)

			}) // end of for each

		}; // end of handleData()

		function generateHTML(vidID, channelId, title, creator, uploadDate, desc, imageUrl){

			let videoUrl = "https://www.youtube.com/watch?v=" + vidID;
			let creatorUrl = "https://www.youtube.com/channel/" + channelId;
			let HTML_TEMPLATE = '<li class="collection-item">' +
													'<a href="' +
													videoUrl +
													'">' +
													'<div class="image-container">' +
													'<img class="image" src="' +
													imageUrl +
													'" alt="">' +
													'</div>' +
													'</a>' +
													'<div class="video-info-container">' +
													'<ul class="video-info">' +
													'<li class="title"><a href="' +
													videoUrl +
													'">' + 
													title +
													'</a></li>' +
													'<li class="creator"><a href="' +
													creatorUrl + 
													'">' + 
													creator +
													'</a></li>' +
													'<li class="upload-date">' +
													uploadDate +
													'</li>' +
													'<li class="desc">' +
													desc +
													'</li>' +
													'</ul>' +
													'</div>' +
													'</li>';

		// add the built HTML template to the results div
		$results.append(HTML_TEMPLATE);

		} // end of generateHTML

		/*
			Start of Testing area : Functionality will be deletd once complete
			---------------------------------------------------------
			*/

		// test JSON Data
		// to be deleted
		var testData = {
			"kind": "youtube#searchListResponse",
			"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/DFhlbU__ed3j156f5XMeipt1Qzs\"",
			"nextPageToken": "CBkQAA",
			"regionCode": "AE",
			"pageInfo": {
				"totalResults": 1000000,
				"resultsPerPage": 25
			},
			"items": [
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/03m9MCq7f9dnLOX3G9cXRcfR31Q\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "TB-SQhg1z9A"
				},
				"snippet": {
					"publishedAt": "2015-01-04T16:19:48.000Z",
					"channelId": "UCfBqD12IIXjPORycn87MPAg",
					"title": "Big Wave Surfing famous surfer Laird Hamilton 80-100 Feet",
					"description": "Big Wave Surfing famous surfer Laird Hamilton 80-100 Feet http://snowbrains.com/laird-hamilton-tells-cnn-100-foot-wave-doesnt-count/ January 2015 Big Wave ...",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/TB-SQhg1z9A/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/TB-SQhg1z9A/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/TB-SQhg1z9A/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "Utoo B Heavenbound",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/C3yeqEJFt-_bLhuqWrYBNO7HaC0\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "fNr8kqSLpxQ"
				},
				"snippet": {
					"publishedAt": "2014-11-12T18:00:17.000Z",
					"channelId": "UC3Yc0vyFkYXB1_njh3uj7yw",
					"title": "World's best surfing 2014/2015 (HD)",
					"description": "Subscribe: http://bit.ly/SUBICTV Submit a Video : http://bit.ly/T1RsJh Facebook: https://www.facebook.com/Icompilationtv Follow us on Twitter ...",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/fNr8kqSLpxQ/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/fNr8kqSLpxQ/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/fNr8kqSLpxQ/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "IcompilationTV",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/U34_XAoTV_iG0y2JbxJOYOpVON8\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "b6hoBp7Hk-A"
				},
				"snippet": {
					"publishedAt": "2015-02-03T20:00:01.000Z",
					"channelId": "UCblfuW_4rakIf2h6aqANefA",
					"title": "The Beautiful Chaos of Surfing Pipeline",
					"description": "Pipeline is the Yankee Stadium, center court at Wimbledon, and the Melbourne Cricket Ground of surfing. Surfers grow up on the myths of the hallowed reef ...",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/b6hoBp7Hk-A/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/b6hoBp7Hk-A/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/b6hoBp7Hk-A/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "Red Bull",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/EvVv8mqr0gtQTBlEdQsDuW3OrDU\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "pn7SFWpXURk"
				},
				"snippet": {
					"publishedAt": "2017-03-07T17:00:57.000Z",
					"channelId": "UCqhnX4jA0A5paNd1v-zEysw",
					"title": "GoPro Surf: Inside the Legendary Barrels of Namibia",
					"description": "The term \"we scored waves\" in the surfing world gets thrown around quite a bit. Judging from this content of Koa and Alex Smith, Koa Rothman, Benji Brand and ...",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/pn7SFWpXURk/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/pn7SFWpXURk/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/pn7SFWpXURk/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "GoPro",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/S9cuXZkIvXoU_nwLKL9D3qGjIj4\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "26KzUnEbTUs"
				},
				"snippet": {
					"publishedAt": "2013-05-17T22:23:40.000Z",
					"channelId": "UCblfuW_4rakIf2h6aqANefA",
					"title": "Surfing the Heaviest Wave in the World - Teahupoo",
					"description": "Get barreled http://win.gs/1alYVe2 May 13th, 2013 will go down as a memorable day in the Tahitian history books. Watch as Tahitian demi-god Raimana Van ...",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/26KzUnEbTUs/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/26KzUnEbTUs/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/26KzUnEbTUs/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "Red Bull",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/-vEiiLamkNowdpgZ0gafPGbkMiE\"",
				"id": {
					"kind": "youtube#channel",
					"channelId": "UCb0Krmiin58qfsjnvSSDXuw"
				},
				"snippet": {
					"publishedAt": "2013-01-15T18:29:11.000Z",
					"channelId": "UCb0Krmiin58qfsjnvSSDXuw",
					"title": "iSURFTRIBE",
					"description": "iSURFTRIBE - Youtubes Favorite Surfing Family 1. The best learn to surf and improve your surfing tutorials on YouTube 2. Vlog of Mo'e, Atua, Ki'ili and friends ...",
					"thumbnails": {
						"default": {
							"url": "https://yt3.ggpht.com/-sM0JIIxeXig/AAAAAAAAAAI/AAAAAAAAAAA/fhKlJLfKG64/s88-c-k-no-mo-rj-c0xffffff/photo.jpg"
						},
						"medium": {
							"url": "https://yt3.ggpht.com/-sM0JIIxeXig/AAAAAAAAAAI/AAAAAAAAAAA/fhKlJLfKG64/s240-c-k-no-mo-rj-c0xffffff/photo.jpg"
						},
						"high": {
							"url": "https://yt3.ggpht.com/-sM0JIIxeXig/AAAAAAAAAAI/AAAAAAAAAAA/fhKlJLfKG64/s240-c-k-no-mo-rj-c0xffffff/photo.jpg"
						}
					},
					"channelTitle": "iSURFTRIBE",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/v36J4ibwRBdrDEmJw2FPN2Ut7Co\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "k3-ifILx2Hk"
				},
				"snippet": {
					"publishedAt": "2017-07-09T00:26:27.000Z",
					"channelId": "UCVrvnobbNGGMsS5n2mJwfOg",
					"title": "WORLDS BEST WATER SPORT! JET SURFING!",
					"description": "DAY 1430 // 2ND JULY 2017 // Shoreham, United Kingdom https://www.rebelsurf.com/ (mention my name) Go follow… Dave Youtube ...",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/k3-ifILx2Hk/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/k3-ifILx2Hk/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/k3-ifILx2Hk/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "FunForLouis",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/h7LqypPLmSoGcvHsXnvZmFcglkE\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "0pdCW9-eiVU"
				},
				"snippet": {
					"publishedAt": "2017-02-11T00:47:40.000Z",
					"channelId": "UCiiFGfvlKvX3uzMovO3unaw",
					"title": "BIG WAVE SURFING COMPILATION 2017",
					"description": "EVER HAD ONE OF THOSE DAYS PART-2 BIG WAVE SURFING, **AMAZING FOOTAGE ** WITH 60-100FT- HUGE SURF Please Subscribe if You Would like ...",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/0pdCW9-eiVU/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/0pdCW9-eiVU/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/0pdCW9-eiVU/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "Absolutely Flawless",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/kaaJn239e7vWRabvVBmuHIvhcLQ\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "Od3-gMaKyhs"
				},
				"snippet": {
					"publishedAt": "2017-07-08T19:55:27.000Z",
					"channelId": "UCYCuaaPcB6-aJmci9dup4AQ",
					"title": "SUP Surfing Progression: How To Ride a Low Volume board",
					"description": "Want to take your SUP surfing to the next level? If so, you'll probably be looking to lose some volume in your next board. While providing close to shortboard ...",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/Od3-gMaKyhs/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/Od3-gMaKyhs/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/Od3-gMaKyhs/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "blueplanetsurf",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/iyQuHGGF-obuWlEcc9sv8k9Ns5Y\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "RbgjprJP7jw"
				},
				"snippet": {
					"publishedAt": "2017-03-02T19:22:01.000Z",
					"channelId": "UCblfuW_4rakIf2h6aqANefA",
					"title": "Julian Wilson's Surfing is on Fire in \"Wayward\"",
					"description": "Click here to watch Julian rip in \"Raw\" http://win.gs/JulianWilson Julian Wilson will never let you down, but this clip takes things to new heights. Literally. With the ...",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/RbgjprJP7jw/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/RbgjprJP7jw/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/RbgjprJP7jw/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "Red Bull",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/wTrwHzyOOdhChMNAMPPBqeheolM\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "vk0F8dHo3wU"
				},
				"snippet": {
					"publishedAt": "2015-10-14T13:45:47.000Z",
					"channelId": "UC-Zt7GPzlrPPQexkG9-shPg",
					"title": "\"Pacific Dreams\" A California Surfing Film",
					"description": "\"Pacific Dreams\" is a surfing movie featuring my 2015 footage shot around the beautiful state of California. Filmed & Edited by Jeff Chavolla ( http://www.",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/vk0F8dHo3wU/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/vk0F8dHo3wU/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/vk0F8dHo3wU/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "Jeff Chavolla",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/rvXZueV6sHtdly8jcbmBktvPjAg\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "kyXXh3ygLvE"
				},
				"snippet": {
					"publishedAt": "2016-12-16T14:01:00.000Z",
					"channelId": "UCp0hYYBW6IMayGgR-WeoCvQ",
					"title": "Ellen Meets an Unforgettable Kid Surfer",
					"description": "After seeing her vibrant interview online, Ellen brought Australian kid surfer Sabre and her unrivaled excitement to the show!",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/kyXXh3ygLvE/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/kyXXh3ygLvE/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/kyXXh3ygLvE/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "TheEllenShow",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/fF-3r4chXWKJlMsjqI0Xf7aE08s\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "D5a0mOOUHdA"
				},
				"snippet": {
					"publishedAt": "2015-09-23T01:22:53.000Z",
					"channelId": "UCb0Krmiin58qfsjnvSSDXuw",
					"title": "6 Surfing Techniques You Should Never Learn - Kook Protection",
					"description": "http://surfcoaches.com/ Exclusive surfing Videos for Beginners & Intermediates http://surfparts.com/ 10% off all surfing accessories with this code \"surf20\" When ...",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/D5a0mOOUHdA/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/D5a0mOOUHdA/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/D5a0mOOUHdA/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "iSURFTRIBE",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/ygg7VwhHjBJHqVEMJX8GtK5c9RY\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "aizVVLXK0Ms"
				},
				"snippet": {
					"publishedAt": "2016-10-01T20:06:48.000Z",
					"channelId": "UCBi2mrWuNuyYy4gbM6fU18Q",
					"title": "7-Year-Old Phenom 'Flying Squirrel' Takes Surfing World by Storm",
					"description": "Meet quite possibly the best child surfer in the world, Quincy Symonds. SUBSCRIBE to ABC NEWS: https://www.youtube.com/ABCNews/ Watch More on ...",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/aizVVLXK0Ms/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/aizVVLXK0Ms/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/aizVVLXK0Ms/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "ABC News",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/Fo8ooSMNn_h6Dt0RSyx9anaS3gc\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "naL0l8ECAno"
				},
				"snippet": {
					"publishedAt": "2016-10-07T17:01:36.000Z",
					"channelId": "UCytZlLB3uBn2XFfXlN25zPg",
					"title": "TRAMPOLINE SURFING IN A HURRICANE!!!",
					"description": "LETS GET A MILLION LIKES FOR TRAMPOLINE SURFING!!!!! HATS : https://www.JoogSquad.com SHIRTS : https://www.shopjoogsquad.myshopify.com Follow ...",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/naL0l8ECAno/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/naL0l8ECAno/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/naL0l8ECAno/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "JOOGSQUAD PPJT",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/aFLvMIiSGn0894mONBhgYIdX3cg\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "nkhpGC10OVw"
				},
				"snippet": {
					"publishedAt": "2017-04-09T17:18:44.000Z",
					"channelId": "UCHeaHzQFLElUw__yG3SSzMg",
					"title": "World's best surfing 2017",
					"description": "World's best surfing 2017 — Enjoy the video. Rate, Comment, Share... Thanx Subscribe for new compilations: http://goo.gl/X017T If your Video is in this ...",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/nkhpGC10OVw/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/nkhpGC10OVw/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/nkhpGC10OVw/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "Monthly Winners",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/FIKn4rPM_KK_zdFzpP8sHic9-l0\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "yn9X8weJK44"
				},
				"snippet": {
					"publishedAt": "2017-06-09T14:00:09.000Z",
					"channelId": "UCcxTKPM6zJ1jYCIEbfcGghw",
					"title": "11 Year Old Surfing Double-Overhead Waves | Gromheaven",
					"description": "Hugo Prins, 11 years old from Seignosse France was lucky enough to change his hooded 53 Rip Curl Flashbomb, his gloves and boots for a pair of boardshorts ...",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/yn9X8weJK44/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/yn9X8weJK44/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/yn9X8weJK44/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "XTreme Video",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/cs0NuUh9Jy_mriOo46uJPQKGyPg\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "53EeW3mnbUM"
				},
				"snippet": {
					"publishedAt": "2017-01-05T20:30:48.000Z",
					"channelId": "UC4i3-yfVazfuqwoz71T79Sw",
					"title": "The Best (As in Worst) Surfing Wipeouts of 2016",
					"description": "Wipeouts never get old. Performance surfing grows by leaps and bounds every year, but eating shit has essentially remained the same for decades. But we ...",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/53EeW3mnbUM/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/53EeW3mnbUM/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/53EeW3mnbUM/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "Surfline",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/tLLlDC2eJTDRpn_SSASvz-zC-P4\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "86aicFP7tHM"
				},
				"snippet": {
					"publishedAt": "2017-04-03T17:33:48.000Z",
					"channelId": "UChuLeaTGRcfzo0UjL-2qSbQ",
					"title": "2017 Martinique Surf Pro Highlights: Huge Surf and Incredible Surfing Grace the Caribbean",
					"description": "Eight-to-ten foot bombs test surfers of the second and third rounds of Martinique Surf Pro. Subscribe to the WSL for more action: https://goo.gl/VllRuj Watch all the ...",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/86aicFP7tHM/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/86aicFP7tHM/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/86aicFP7tHM/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "World Surf League",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/mnaunq0o6-u42lOxOQk7QAMz7WE\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "anhRxIQutZ8"
				},
				"snippet": {
					"publishedAt": "2015-07-19T20:09:47.000Z",
					"channelId": "UCpwvZwUam-URkxB7g4USKpg",
					"title": "Jaw-dropping: Surfer fights off shark attack live on TV in S. African competition",
					"description": "Courtesy of World Surf League (WSL): www.worldsurfleague.com Professional Australian surfer Mick Fanning had a huge scare as his board was attacked by a ...",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/anhRxIQutZ8/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/anhRxIQutZ8/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/anhRxIQutZ8/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "RT",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/MkxXsleOqLdeFqpUWqYEOG7e6lc\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "9c-Hqe0768A"
				},
				"snippet": {
					"publishedAt": "2013-08-27T21:05:35.000Z",
					"channelId": "UCVk7uRN7g-q_uHMaAjHxk8A",
					"title": "THE GIRLS OF SURFING X",
					"description": "http://www.facebook.com/pages/The-Girls-of-Surfing/368886379860945 Instagram @blueeyedfreckledfrenchie Twitter @jolieoligny SONG TITLE: YACHT ...",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/9c-Hqe0768A/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/9c-Hqe0768A/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/9c-Hqe0768A/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "julianna0263",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/B_RXa20vwx80B5aJm5MEz6kTUfU\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "gS6LJgfR1AM"
				},
				"snippet": {
					"publishedAt": "2017-02-16T17:30:00.000Z",
					"channelId": "UCccOBk6ck17-l_x2THCshdw",
					"title": "This Might Be the Prettiest Footage of Surfing Giant Maverick's We've Ever Seen - The Inertia",
					"description": "Maverick's, in Half Moon Bay, California, is one of the surfing's most menacing and dangerous big waves. This edit shows exactly why. Shot and Edited by Adam ...",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/gS6LJgfR1AM/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/gS6LJgfR1AM/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/gS6LJgfR1AM/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "The Inertia",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/7iZ4ConQKz900FaUwBNBXeQKN3U\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "UxQqTo2U-7k"
				},
				"snippet": {
					"publishedAt": "2015-10-02T17:50:36.000Z",
					"channelId": "UCblfuW_4rakIf2h6aqANefA",
					"title": "Pro Surf Contest in a Wave Pool - Red Bull Unleashed",
					"description": "More Surfing? No problem: http://win.gs/RedBullWater At north Wales's Surf Snowdonia, the world's first Wavegarden, Red Bull delivered a whole new format for ...",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/UxQqTo2U-7k/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/UxQqTo2U-7k/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/UxQqTo2U-7k/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "Red Bull",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/9ZXJTBJIX5FobhRJMH2leyQKhjY\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "Z32qL2MRkJM"
				},
				"snippet": {
					"publishedAt": "2014-02-03T16:27:06.000Z",
					"channelId": "UCsert8exifX1uUnqaoY3dqA",
					"title": "Surfing With Alana Blanchard & Her Boyfriend Jack Freestone Ep. 305",
					"description": "Alana Surfer Girl (Season 3, episode 5): Pro surfer Alana Blanchard opens up about her relationship with Australian pro surfer Jack Freestone—how they met, ...",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/Z32qL2MRkJM/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/Z32qL2MRkJM/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/Z32qL2MRkJM/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "Network A",
					"liveBroadcastContent": "none"
				}
			},
			{
				"kind": "youtube#searchResult",
				"etag": "\"m2yskBQFythfE4irbTIeOgYYfBU/tgVxmuBmfSUkkI2iFJXb7OeJyx4\"",
				"id": {
					"kind": "youtube#video",
					"videoId": "CwJ4eBWalFo"
				},
				"snippet": {
					"publishedAt": "2015-09-18T17:36:10.000Z",
					"channelId": "UC3Yc0vyFkYXB1_njh3uj7yw",
					"title": "World's Best Surfing 2016 - Ultra HD 4K",
					"description": "World's Best Surfing 2015 - 4K Ultra HD! Subcribe for more! Submit a video : http://bit.ly/T1RsJh Music by : Cheat Codes - Senses YouTube ...",
					"thumbnails": {
						"default": {
							"url": "https://i.ytimg.com/vi/CwJ4eBWalFo/default.jpg",
							"width": 120,
							"height": 90
						},
						"medium": {
							"url": "https://i.ytimg.com/vi/CwJ4eBWalFo/mqdefault.jpg",
							"width": 320,
							"height": 180
						},
						"high": {
							"url": "https://i.ytimg.com/vi/CwJ4eBWalFo/hqdefault.jpg",
							"width": 480,
							"height": 360
						}
					},
					"channelTitle": "IcompilationTV",
					"liveBroadcastContent": "none"
				}
			}
			]
		};

		let $testBtn = $("#testBtn").on("click", function(){
			handleData(testData);
		})// end of test btn func

		/*
			End of Testing area : Functionality will be deletd once complete
			---------------------------------------------------------
		*/

	})(); // end function

}); // end of doc ready

