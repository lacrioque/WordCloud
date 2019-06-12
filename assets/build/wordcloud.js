(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
}(function () { 'use strict';

    const WordCloudProcessor = function (options) {
      const questionSelector = '#WordCloud--QuestionSelector';
      const loadingBlock = '#WordCloud--loadingBlock';
      const imageContainer = '#WordCloud--imagecontainer';
      let loading = false;

      const toggleLoader = () => {
        if (loading) {
          $(loadingBlock).css('display', 'none');
        } else {
          $(loadingBlock).css('display', '');
        }

        loading = !loading;
      };

      const drawWordCloud = wordData => {
        $(imageContainer).html('<canvas id="WordCloud--image" width="100%" height="100%"></canvas>');
        wordData.sort((a, b) => {
          return a[1] - b[1];
        });
        let words = wordData;

        if (wordData.length > 50) {
          words = wordData.slice(0, 51);
        }

        WordCloud(document.getElementById('WordCloud--image'), {
          list: words
        });
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

      const bind = () => {
        $(questionSelector).on('change', reloadQuestionData);
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
