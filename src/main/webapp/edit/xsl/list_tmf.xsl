<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:import href="ew:xsl/list.xsl"/>

  <xsl:template name="tmfstyle">
    <link rel="stylesheet" type="text/css" href="{$templatedir}/edit/css/edit.css" />
  </xsl:template>
  
  <xsl:template match="list">
    <xsl:call-template name="tmfstyle" />
    <xsl:call-template name="searchbox" />
    <xsl:call-template name="listlinks" />
    <xsl:if test="count(/*/pages/page) &gt; 1">
      <tr class="pagescanvas">
        <td>
          <div>
            <xsl:apply-templates select="/*/pages" />
            <br />
            <br />
          </div>
        </td>
      </tr>
    </xsl:if>
    <tr class="listcanvas">
      <td>
        <xsl:call-template name="dolist" />
      </td>
    </tr>
    <xsl:if test="count(/*/pages/page) &gt; 1">
      <tr class="pagescanvas">
        <td>
          <div>
            <xsl:apply-templates select="/*/pages" />
            <br />
            <br />
          </div>
        </td>
      </tr>
    </xsl:if>
    <tr class="buttoncanvas">
      <td>
        <xsl:if test="$searchfields=&apos;&apos; and $creatable=&apos;true&apos;">
          <br />
          <div width="100%" align="left">
            <xsl:if test="$createprompt">
              <div style="width: 200px;">
                <xsl:value-of select="$createprompt" />
              </div>
            </xsl:if>
            <a
              href="{$wizardpage}&amp;wizard={$wizard}&amp;objectnumber=new&amp;origin={$origin}"
              title="{$tooltip_new}">
              <xsl:call-template name="prompt_new" />
            </a>
          </div>
        </xsl:if>
      </td>
    </tr>
    <xsl:call-template name="listlinks" />
  </xsl:template>

</xsl:stylesheet>
