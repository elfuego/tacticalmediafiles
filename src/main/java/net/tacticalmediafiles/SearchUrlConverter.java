/* This file is part of TMF. */

package net.tacticalmediafiles;

import org.mmbase.bridge.Cloud;
import org.mmbase.bridge.Node;
import org.mmbase.framework.*;
import org.mmbase.framework.basic.BasicFramework;
import org.mmbase.framework.basic.BasicUrl;
import org.mmbase.framework.basic.DirectoryUrlConverter;
import org.mmbase.framework.basic.Url;
import org.mmbase.util.functions.Parameter;
import org.mmbase.util.functions.Parameters;
import org.mmbase.util.logging.Logger;
import org.mmbase.util.logging.Logging;
import org.mmbase.util.transformers.Identifier;

import java.util.List;
import java.util.Map;

/**
 * UrlConverter that can filter and create urls for the TMF search page.
 *
 * @author André van Toly
 * @version $Id:  $
 */
public class SearchUrlConverter extends DirectoryUrlConverter {
    private static final long serialVersionUID = 0L;
    private static final Logger log = Logging.getLoggerInstance(SearchUrlConverter.class);

    private static Identifier trans = new Identifier();
    private String wsReplacer = "-";

    public SearchUrlConverter(BasicFramework fw) {
        super(fw);
        //setDirectory("/video/");
        Component tmf = ComponentRepository.getInstance().getComponent("tmf");
        if (tmf == null) throw new IllegalStateException("No such component tmf");

        addBlock(tmf.getBlock("search"));
    }
 
    @Override
    public int getDefaultWeight() {
        int q = super.getDefaultWeight();
        return Math.max(q, q + 1000);
    }

    public void setWhitespaceReplacer(String ws) {
        wsReplacer = ws;
        trans = new Identifier();
        {
            trans.setWhitespaceReplacer(ws);
        }
    }

    public static final Parameter<Node> NODE = new Parameter<Node>("n", Node.class);

    @Override
    public Parameter[] getParameterDefinition() {
        return new Parameter[] {Parameter.REQUEST, Framework.COMPONENT, Framework.BLOCK, Parameter.CLOUD, NODE};
    }

    /**
     * Generates a nice url
     */
    @Override
    protected void getNiceDirectoryUrl(StringBuilder b,
                                                 Block block,
                                                 Parameters parameters,
                                                 Parameters frameworkParameters,  boolean action) throws FrameworkException {
        if (log.isDebugEnabled()) {
            log.debug("" + parameters + frameworkParameters);
            log.debug("Found tmf block " + block);
        }
        if (block.getName().equals("search")) {
            Node n = frameworkParameters.get(NODE);
            if (n == null) throw new IllegalStateException("No node (n) parameter used in " + frameworkParameters);

            b.append("?q=").append(n.getStringValue("keyword"));

            if (log.isDebugEnabled()) {
                log.debug("b now: " + b.toString());
            }
        }
    }


    /**
     * Translates the result of {@link #getNiceUrl} back to an actual JSP which can render the block
     */
    @Override
    public Url getFilteredInternalDirectoryUrl(List<String>  path, Map<String, ?> params, Parameters frameworkParameters) throws FrameworkException {
        if (log.isDebugEnabled()) log.debug("path pieces: " + path + ", path size: " + path.size());

        StringBuilder result = new StringBuilder();
        if (path.size() == 0) {
            result.append("/search.jspx");
        } else {
            result.append("/search.jspx?q=");
            Cloud cloud = frameworkParameters.get(Parameter.CLOUD);

            if (path.size() > 0) {          // search/[keyword]
                final String keyword = path.get(0);    // keyword is the first element
                if (log.isDebugEnabled()) {
                    log.debug("keyword: " + keyword);
                }
                result.append(keyword);
            }

        }

        if (log.isDebugEnabled()) log.debug("returning: " + result.toString());
        return new BasicUrl(this, result.toString());
    }

}
