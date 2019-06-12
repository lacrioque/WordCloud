<?php
/**
 * View: Main view and question selector
 * 
 * @package WordCloud
 * @author Markus Flür <markus.fluer@limesurvey.org>
 * @license GPL3.0
 */
?>
<div class='side-body <?php echo getSideBodyClass(false); ?>'>
    <div class="container-center">
        <div class="row">
            <div class="col-sm-12">
                <h3 class="pagetitle">WordCloud</h3>
            </div>
        </div>
        <div class="row">
            <hr/>
        </div>
        <div class="row">
            <div class="col-sm-6 ">
                <button class="btn btn-default" id="WordCloud--Action--DownloadPNG">Download (PNG)</button>
            </div>
            <div class="col-sm-6 text-left">
                <select id="WordCloud--QuestionSelector" name="WordCloudQuestionSelector"  class="form-control">
                    <option value="---">No question selected</option>
                    <?php foreach($questions as $oQuestion) {
                        printf("<option value='%s'>(%s) %s</option>",$oQuestion->qid, $oQuestion->title, ellipsize($oQuestion->question, 40));
                    } ?>
                </select>
            </div>
        </div>
        <div class="row">
            <hr/>
        </div>
        <div class="row">
            <div class="col-sm-12 text-center" id="WordCloud--imagecontainer" style="min-height: 550px;">
            </div>
        </div>
    </div>
</div>
<script>
var WordCloudFactory = LS.getWordCloudProcessorFactory();
var wordCloudRenderer = WordCloudFactory({
        getQuestionDataUrl: '<?=Yii::app()->createUrl('/plugins/direct/',['plugin' => 'WordCloud', 'function' => 'getWordCloudData'])?>',
        cloudWidth: <?=$pluginSettings['cloudWidth']?>,
        cloudHeight: <?=$pluginSettings['cloudHeight']?>,
        fontPadding: <?=$pluginSettings['fontPadding']?>,
        wordAngle: <?=$pluginSettings['wordAngle']?>,
        minFontSize: <?=$pluginSettings['minFontSize']?>
    });
$(document).on('ready pjax:scriptcomplete', function(){ wordCloudRenderer.bind();});
</script>






