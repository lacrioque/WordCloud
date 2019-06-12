(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}(function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var FileSaver_min = createCommonjsModule(function (module, exports) {
	(function(a,b){b();})(commonjsGlobal,function(){function b(a,b){return "undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(b,c,d){var e=new XMLHttpRequest;e.open("GET",b),e.responseType="blob",e.onload=function(){a(e.response,c,d);},e.onerror=function(){console.error("could not download file");},e.send();}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send();}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"));}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b);}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof commonjsGlobal&&commonjsGlobal.global===commonjsGlobal?commonjsGlobal:void 0,a=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href);},4E4),setTimeout(function(){e(j);},0));}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i);});}}:function(a,b,d,e){if(e=e||open("","_blank"),e&&(e.document.title=e.document.body.innerText="downloading..."),"string"==typeof a)return c(a,b,d);var g="application/octet-stream"===a.type,h=/constructor/i.test(f.HTMLElement)||f.safari,i=/CriOS\/[\d]+/.test(navigator.userAgent);if((i||g&&h)&&"object"==typeof FileReader){var j=new FileReader;j.onloadend=function(){var a=j.result;a=i?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),e?e.location.href=a:location=a,e=null;},j.readAsDataURL(a);}else{var k=f.URL||f.webkitURL,l=k.createObjectURL(a);e?e.location=l:location.href=l,e=null,setTimeout(function(){k.revokeObjectURL(l);},4E4);}});f.saveAs=a.saveAs=a,module.exports=a;});


	});
	var FileSaver_min_1 = FileSaver_min.saveAs;

	/* canvas-toBlob.js
	 * A canvas.toBlob() implementation.
	 * 2016-05-26
	 * 
	 * By Eli Grey, http://eligrey.com and Devin Samarin, https://github.com/eboyjr
	 * License: MIT
	 *   See https://github.com/eligrey/canvas-toBlob.js/blob/master/LICENSE.md
	 */

	/*global self */
	/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
	  plusplus: true */

	/*! @source http://purl.eligrey.com/github/canvas-toBlob.js/blob/master/canvas-toBlob.js */

	(function(view) {
	var
		  Uint8Array = view.Uint8Array
		, HTMLCanvasElement = view.HTMLCanvasElement
		, canvas_proto = HTMLCanvasElement && HTMLCanvasElement.prototype
		, is_base64_regex = /\s*;\s*base64\s*(?:;|$)/i
		, to_data_url = "toDataURL"
		, base64_ranks
		, decode_base64 = function(base64) {
			var
				  len = base64.length
				, buffer = new Uint8Array(len / 4 * 3 | 0)
				, i = 0
				, outptr = 0
				, last = [0, 0]
				, state = 0
				, save = 0
				, rank
				, code
				, undef
			;
			while (len--) {
				code = base64.charCodeAt(i++);
				rank = base64_ranks[code-43];
				if (rank !== 255 && rank !== undef) {
					last[1] = last[0];
					last[0] = code;
					save = (save << 6) | rank;
					state++;
					if (state === 4) {
						buffer[outptr++] = save >>> 16;
						if (last[1] !== 61 /* padding character */) {
							buffer[outptr++] = save >>> 8;
						}
						if (last[0] !== 61 /* padding character */) {
							buffer[outptr++] = save;
						}
						state = 0;
					}
				}
			}
			// 2/3 chance there's going to be some null bytes at the end, but that
			// doesn't really matter with most image formats.
			// If it somehow matters for you, truncate the buffer up outptr.
			return buffer;
		}
	;
	if (Uint8Array) {
		base64_ranks = new Uint8Array([
			  62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1
			, -1, -1,  0, -1, -1, -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9
			, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25
			, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35
			, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51
		]);
	}
	if (HTMLCanvasElement && (!canvas_proto.toBlob || !canvas_proto.toBlobHD)) {
		if (!canvas_proto.toBlob)
		canvas_proto.toBlob = function(callback, type /*, ...args*/) {
			  if (!type) {
				type = "image/png";
			} if (this.mozGetAsFile) {
				callback(this.mozGetAsFile("canvas", type));
				return;
			} if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(type)) {
				callback(this.msToBlob());
				return;
			}

			var
				  args = Array.prototype.slice.call(arguments, 1)
				, dataURI = this[to_data_url].apply(this, args)
				, header_end = dataURI.indexOf(",")
				, data = dataURI.substring(header_end + 1)
				, is_base64 = is_base64_regex.test(dataURI.substring(0, header_end))
				, blob
			;
			if (Blob.fake) {
				// no reason to decode a data: URI that's just going to become a data URI again
				blob = new Blob;
				if (is_base64) {
					blob.encoding = "base64";
				} else {
					blob.encoding = "URI";
				}
				blob.data = data;
				blob.size = data.length;
			} else if (Uint8Array) {
				if (is_base64) {
					blob = new Blob([decode_base64(data)], {type: type});
				} else {
					blob = new Blob([decodeURIComponent(data)], {type: type});
				}
			}
			callback(blob);
		};

		if (!canvas_proto.toBlobHD && canvas_proto.toDataURLHD) {
			canvas_proto.toBlobHD = function() {
				to_data_url = "toDataURLHD";
				var blob = this.toBlob();
				to_data_url = "toDataURL";
				return blob;
			};
		} else {
			canvas_proto.toBlobHD = canvas_proto.toBlob;
		}
	}
	}(typeof self !== "undefined" && self || typeof window !== "undefined" && window || commonjsGlobal.content || commonjsGlobal));

	const contains = (str, arr) => {
	  return arr.indexOf(str) === -1 ? false : true;
	};

	const getCSSStyles = parentElement => {
	  const selectorTextArr = []; // Add Parent element Id and Classes to the list

	  selectorTextArr.push('#' + parentElement.id);

	  for (let c = 0; c < parentElement.classList.length; c++) if (!contains('.' + parentElement.classList[c], selectorTextArr)) selectorTextArr.push('.' + parentElement.classList[c]); // Add Children element Ids and Classes to the list


	  const nodes = parentElement.getElementsByTagName("*");

	  for (let i = 0; i < nodes.length; i++) {
	    const id = nodes[i].id;
	    if (!contains('#' + id, selectorTextArr)) selectorTextArr.push('#' + id);
	    const classes = nodes[i].classList;

	    for (let c = 0; c < classes.length; c++) if (!contains('.' + classes[c], selectorTextArr)) selectorTextArr.push('.' + classes[c]);
	  } // Extract CSS Rules


	  let extractedCSSText = "";

	  for (let i = 0; i < document.styleSheets.length; i++) {
	    const s = document.styleSheets[i];

	    try {
	      if (!s.cssRules) continue;
	    } catch (e) {
	      if (e.name !== 'SecurityError') throw e; // for Firefox

	      continue;
	    }

	    const cssRules = s.cssRules;

	    for (let r = 0; r < cssRules.length; r++) {
	      if (contains(cssRules[r].selectorText, selectorTextArr)) extractedCSSText += cssRules[r].cssText;
	    }
	  }

	  return extractedCSSText;
	};

	const appendCSS = (cssText, element) => {
	  const styleElement = document.createElement("style");
	  styleElement.setAttribute("type", "text/css");
	  styleElement.innerHTML = cssText;
	  const refNode = element.hasChildNodes() ? element.children[0] : null;
	  element.insertBefore(styleElement, refNode);
	}; // Below are the functions that handle actual exporting:
	// getSVGString ( svgNode ) and svgString2Image( svgString, width, height, format, callback )


	const getSVGString = function (svgNode) {
	  svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
	  const cssStyleText = getCSSStyles(svgNode);
	  appendCSS(cssStyleText, svgNode);
	  const serializer = new XMLSerializer();
	  let svgString = serializer.serializeToString(svgNode);
	  svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace

	  svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

	  return svgString;
	};
	const svgString2Image = function (svgString, width, height, format = 'png', callback) {
	  const imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString))); // Convert SVG string to data URL

	  const canvas = document.createElement("canvas");
	  const context = canvas.getContext("2d");
	  canvas.width = width;
	  canvas.height = height;
	  const image = new Image();

	  image.onload = function () {
	    context.clearRect(0, 0, width, height);
	    context.drawImage(image, 0, 0, width, height);
	    canvas.toBlob(function (blob) {
	      const filesize = Math.round(blob.length / 1024) + ' KB';
	      if (callback) callback(blob, filesize);
	    });
	  };

	  image.src = imgsrc;
	};

	const WordCloudProcessor = function (options) {
	  const questionSelector = '#WordCloud--QuestionSelector';
	  const loadingBlock = '#WordCloud--loadingBlock';
	  const imageContainer = '#WordCloud--imagecontainer';
	  const downloadButtonSelector = '#WordCloud--Action--DownloadPNG'; //OPTIONS

	  const cloudWidth = options.cloudWidth || 800;
	  const cloudHeight = options.cloudHeight || 500;
	  const fontPadding = options.fontPadding || 5;
	  const wordAngle = options.wordAngle || 45;
	  const minFontSize = options.minFontSize || 10;
	  let loading = false;
	  let svg = null;

	  const toggleLoader = () => {
	    if (loading) {
	      $(loadingBlock).css('display', 'none');
	    } else {
	      $(loadingBlock).css('display', '');
	    }

	    loading = !loading;
	  };

	  const drawWordCloud = wordListObject => {
	    const wordList = LS.ld.toPairs(wordListObject);
	    $(imageContainer).html('');
	    const color = d3.scaleLinear().domain([0, 1, 2, 3, 4, 5, 6, 10, 15, 20, 100].reverse()).range(["#cd113b", "#bc1642", "#ab1c4a", "#992251", "#882758", "#772d5f", "#663366", "#55386e", "#433e75", "#32447c", "#214983", "#213262"]);
	    d3.layout.cloud().size([cloudWidth, cloudHeight]).words(wordList.map(word => {
	      return {
	        text: word[0],
	        size: (word[1] < minFontSize ? minFontSize : word[1]) * 3
	      };
	    })).padding(fontPadding).rotate(function () {
	      let randomOrientation = Math.floor(Math.random() * 3);
	      return randomOrientation == 0 ? -wordAngle : randomOrientation == 1 ? 0 : wordAngle;
	    }).fontSize(function (d) {
	      return d.size;
	    }).on("end", draw).start();

	    function draw(words) {
	      svg = d3.select(imageContainer).append("svg").attr("width", cloudWidth).attr("height", cloudHeight).attr("class", "wordcloud").append("g") // without the transform, words words would get cutoff to the left and top, they would
	      // appear outside of the SVG area
	      .attr("transform", "translate(" + cloudWidth / 2 + "," + cloudHeight / 2 + ")").selectAll("text").data(words).enter().append("text").style("font-size", function (d) {
	        return d.size + "px";
	      }).style("font-family", "Roboto").attr("text-anchor", "middle").style("fill", function (d, i) {
	        return color(i);
	      }).attr("transform", function (d) {
	        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	      }).text(function (d) {
	        return d.text;
	      });
	    }
	  };

	  const reloadQuestionData = () => {
	    let currentQid = $(questionSelector).val();
	    toggleLoader();
	    $.ajax({
	      url: options.getQuestionDataUrl,
	      data: {
	        qid: currentQid
	      },
	      success: drawWordCloud,
	      error: (err, xhr) => {
	        console.error("WordCloudError => ", err);
	        toggleLoader();
	      }
	    });
	  };

	  const triggerDownload = () => {
	    let currentQid = $(questionSelector).val();
	    var svgString = getSVGString($(imageContainer).find('svg').first()[0]);
	    svgString2Image(svgString, 2 * cloudWidth, 2 * cloudHeight, 'png', (dataBlob, fileSize) => {
	      FileSaver_min_1(dataBlob, 'WordCloud-Question-' + currentQid);
	    }); // passes Blob and filesize String to the callback
	  };

	  const bind = () => {
	    $(questionSelector).on('change', reloadQuestionData);
	    $(downloadButtonSelector).on('click', triggerDownload);
	  };

	  return {
	    bind,
	    reloadQuestionData
	  };
	};

	window.LS.getWordCloudProcessorFactory = function () {
	  return WordCloudProcessor;
	};

}));
