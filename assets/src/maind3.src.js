import { saveAs } from 'file-saver';
import {getSVGString, svgString2Image} from './processSVG.js';

const WordCloudProcessor = function(options){
    const questionSelector = '#WordCloud--QuestionSelector';
    const loadingBlock = '#WordCloud--loadingBlock';
    const imageContainer = '#WordCloud--imagecontainer';
    const downloadButtonSelector = '#WordCloud--Action--DownloadPNG';

    //OPTIONS
    const cloudWidth = options.cloudWidth || 800;
    const cloudHeight = options.cloudHeight || 500;
    const fontPadding = options.fontPadding || 5;
    const wordAngle = options.wordAngle || 45;
    const minFontSize = options.minFontSize || 10;


    let loading = false;
    let svg = null;

    const toggleLoader = () => {
        if(loading) {
            $(loadingBlock).css('display','none');
        } else {
            $(loadingBlock).css('display','');
        }
        loading = !loading;
    };

    const drawWordCloud = (wordListObject) => {
        const wordList = LS.ld.toPairs(wordListObject);
        $(imageContainer).html('');
 
        const color = d3.scaleLinear()
            .domain([0,1,2,3,4,5,6,10,15,20,100].reverse())
            .range(["#cd113b", "#bc1642", "#ab1c4a", "#992251", "#882758", "#772d5f", "#663366", "#55386e", "#433e75", "#32447c", "#214983", "#213262"]);

        d3.layout.cloud().size([cloudWidth, cloudHeight])
            .words(wordList.map((word) => {
                return {
                    text: word[0],
                    size: (word[1]<minFontSize ? minFontSize : word[1])*3
                }
            }))
            .padding(fontPadding)
            .rotate(function() { 
                let randomOrientation = Math.floor(Math.random()*3); 
                return randomOrientation==0 ? -wordAngle : (randomOrientation==1 ? 0 : wordAngle); 
            })
            .fontSize(function(d) { return d.size; })
            .on("end", draw)
            .start();

        function draw(words) {
            svg = d3.select(imageContainer).append("svg")
                .attr("width", cloudWidth)
                .attr("height", cloudHeight)
                .attr("class", "wordcloud")
                .append("g")
                // without the transform, words words would get cutoff to the left and top, they would
                // appear outside of the SVG area
                .attr("transform", "translate(" + cloudWidth / 2 + "," + cloudHeight / 2 + ")")
                .selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", function(d) { return d.size + "px"; })
                .style("font-family", "Roboto")
                .attr("text-anchor", "middle")
                .style("fill", function(d, i) { return color(i); })
                .attr("transform", function(d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .text(function(d) { return d.text; });
        }
    };

    const reloadQuestionData = () => {
        let currentQid = $(questionSelector).val();
        toggleLoader();
        $.ajax({
            url: options.getQuestionDataUrl,
            data: {qid: currentQid},
            success: drawWordCloud,
            error: (err,xhr) => {console.error("WordCloudError => ", err); toggleLoader();}
        });
    }

    const triggerDownload = () => {
        let currentQid = $(questionSelector).val();
        var svgString = getSVGString($(imageContainer).find('svg').first()[0]);
        svgString2Image( svgString, 2*cloudWidth, 2*cloudHeight, 'png', (dataBlob, fileSize) => {
            saveAs( dataBlob, 'WordCloud-Question-'+currentQid );
        } ); // passes Blob and filesize String to the callback
    };

    const bind = () => {
        $(questionSelector).on('change', reloadQuestionData)
        $(downloadButtonSelector).on('click', triggerDownload)
    }

    return {
        bind,
        reloadQuestionData,
    };
};

window.LS.getWordCloudProcessorFactory = function(){
    return WordCloudProcessor;
};