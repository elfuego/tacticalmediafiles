<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:node="org.mmbase.bridge.util.xml.NodeFunction"
  xmlns:date="org.mmbase.bridge.util.xml.DateFormat"
  extension-element-prefixes="node date">
  <!--
    wizard_tinymce.xsl

    To use the tinymce html editor, place it in the xsl directory of the application calling the wizard.

    You need to download tinymce, and unpack the entire directory in the wizard templates directory (this
    creates a tinymce directory).
    If you have the source, you can use the editwizard build script to download and extract tinymce ('ant tinymce').

    @author Pierre van Rooden
    @version $Id: wizard_teleacnot.xsl,v 1.5 2008/08/13 14:23:17 telnotap Exp $

    This xsl uses Xalan functionality to call java classes
    to format dates and call functions on nodes
    See the xmlns attributes of the xsl:stylesheet
  -->

  <xsl:import href="xsl/wizard.xsl"/>

  <!-- ================================================================================
    The following things can be overriden to customize the appearance of wizard
    ================================================================================ -->
  
  <xsl:variable name="BodyOnLoad">doOnLoad_ew(); start_validator();</xsl:variable>
  
  <xsl:template name="tmfstyle">
    <link rel="stylesheet" type="text/css" href="{$templatedir}/edit/css/edit.css" />
  </xsl:template>

  <xsl:template name="javascript-html">
    <xsl:call-template name="tmfstyle" />
    <script type="text/javascript" src="../../../tiny_mce/tiny_mce.js">
      <xsl:comment>help IE</xsl:comment>
    </script>
    <script type="text/javascript">
          <xsl:text disable-output-escaping="yes">
            <![CDATA[
function mmbaseOnChangeHandler(inst) {
    inst.save();
    validator.validate(inst.getElement());
}
// possible extra buttons: help, flash
tinyMCE.init({
    mode: "textareas",
    editor_selector : "htmlarea",
    language: "en",
    content_css: "../../../../edit/css/tiny_mce.css",
    theme : "advanced",
    theme_advanced_blockformats : "p,pre,blockquote,h1,h2,h3,h4,h5,h6,div,dt,dd,code,samp", // enable button 'formatselect'
    extended_valid_elements : "video[controls|src|width|height|poster|class],audio[controls|src|width|height|poster|class],source[type|src]"
  +"embed[src|width|height|quality|pluginspace|type,"
  +"object[archive|border|class|classid"
  +"|codebase|codetype|data|declare|dir<ltr?rtl|height|id|lang|name"
  +"|onclick|ondblclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove"
  +"|onmouseout|onmouseover|onmouseup|standby|tabindex|title|type|usemap"
  +"|width],"
  +"param[id|name|type|value|valuetype<DATA?OBJECT?REF]",
    // plugins : "flash,table,fullscreen,xhtmlxtras",
    plugins : "fullscreen,xhtmlxtras",
    entity_encoding: "raw",
    relative_urls : false,
    forced_root_block : false,
    convert_newlines_to_brs: false,
    force_br_newlines: false,
    force_p_newlines: true,
    theme_advanced_toolbar_align : "left",
    theme_advanced_path_location : "bottom",
    theme_advanced_toolbar_location : "top",
    theme_advanced_buttons1 : "formatselect,bold,italic,separator,bullist,numlist,separator,abbr,acronym,separator,sub,sup,separator,link,unlink,separator,cleanup,code,charmap,separator,fullscreen",
    theme_advanced_buttons2 : "",
    theme_advanced_buttons3 : "",
    flash_wmode : "transparent",
    flash_quality : "high",
    flash_menu : "false",
    onchange_callback : "mmbaseOnChangeHandler"

});
          ]]></xsl:text>
    </script>
  </xsl:template>

  <!-- turn off datepicker (doesn't work properly) -->
  <xsl:template name="javascript-date-picker">
  </xsl:template>

  <xsl:template name="date-picker">
  </xsl:template>


  <!-- show field description as help text -->
  <xsl:template name="fieldintro">
     <xsl:if test="description and @ftype!='data'">
     <!-- <xsl:if test="description"> -->
       <div class="fieldintro"><xsl:call-template name="i18n">
         <xsl:with-param name="nodes" select="description" />
       </xsl:call-template></div>
     </xsl:if>
  </xsl:template>

  <xsl:template name="ftype-datetime-date">
    <input class="date" name="internal_{@fieldname}_day" super="{@fieldname}" type="text" value="{date:getDay(string(value), string($timezone))}" size="3" maxlength="2"/>
    <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
    <select name="internal_{@fieldname}_month" super="{@fieldname}">
      <xsl:call-template name="optionlist_months">
        <xsl:with-param name="selected" select="date:getMonth(string(value), string($timezone))" />
      </xsl:call-template>
    </select>
    <xsl:text disable-output-escaping="yes">&amp;nbsp;</xsl:text>
    <input class="date" name="internal_{@fieldname}_year" super="{@fieldname}" type="text" value="{date:getYear(string(value), string($timezone))}" size="5" maxlength="4"/>
  </xsl:template>

</xsl:stylesheet>
