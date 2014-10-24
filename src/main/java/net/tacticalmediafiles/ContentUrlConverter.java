/* This file is part of TMF. */

package net.tacticalmediafiles;

import org.mmbase.bridge.Cloud;
import org.mmbase.bridge.Node;
import org.mmbase.bridge.NodeManager;
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
 * UrlConverter that can filter and create urls for TMF.
 *
 * @author André van Toly
 * @version $Id:  $
 */
public class ContentUrlConverter extends DirectoryUrlConverter {
    private static final long serialVersionUID = 0L;
    private static final Logger log = Logging.getLoggerInstance(ContentUrlConverter.class);

    private boolean useTitle = true;
    private static Identifier trans = new Identifier();
    private String wsReplacer = "-";

    /* piece of path that leads to all content of this type, e.g. /user/[content]/edit */
    protected String type = "article";

    public ContentUrlConverter(BasicFramework fw) {
        super(fw);

        Component tmf = ComponentRepository.getInstance().getComponent("tmf");
        if (tmf == null) throw new IllegalStateException("No such component tmf");

        addBlock(tmf.getBlock("content"));
    }
 
    @Override
    public int getDefaultWeight() {
        int q = super.getDefaultWeight();
        return Math.max(q, q + 1000);
    }

    public void setType(String t) {
        type = t;
    }

    public void setUseTitle(boolean t) {
        useTitle = t;
    }

    public void setWhitespaceReplacer(String ws) {
        wsReplacer = ws;
        trans = new Identifier();
        {
            trans.setWhitespaceReplacer(ws);
        }
    }

    public static final Parameter<Node> NODE = new Parameter<Node>("n", Node.class);
    public static final Parameter<String> TYPE = new Parameter<String>("t", String.class);

    @Override
    public Parameter[] getParameterDefinition() {
        return new Parameter[] {Parameter.REQUEST, Framework.COMPONENT, Framework.BLOCK, Parameter.CLOUD, NODE, TYPE};
    }

    /**
     * Generates a nice url
     */
    @Override
    protected void getNiceDirectoryUrl(StringBuilder b,
                                                 Block block,
                                                 Parameters parameters,
                                                 Parameters frameworkParameters, boolean action) throws FrameworkException {
        if (log.isDebugEnabled()) {
            //log.debug("" + parameters + frameworkParameters);
            log.debug("Found tmf block " + block);
        }
        if (block.getName().equals("content")) {
            Node n = frameworkParameters.get(NODE);
            if (n == null) throw new IllegalStateException("No node (n) parameter used in " + frameworkParameters);

            //String nmName = n.getNodeManager().getName();
            String nmName = n.getNodeManager().getGUIName(NodeManager.GUI_PLURAL).toLowerCase();

            // replace begin of path with type
            b.replace(1, b.indexOf("/", 2), nmName);

            b.append(n.getStringValue("number"));
            if (useTitle) {
                if (n.getNodeManager().hasField("title")) {
                    b.append("/").append(trans.transform(n.getStringValue("title")));
                } else if (n.getNodeManager().getName().equals("person")){
                    b.append("/").append(trans.transform(n.getStringValue("firstname")));
                    if (! "".equals(n.getStringValue("sirname"))) {
                        b.append(wsReplacer).append(trans.transform(n.getStringValue("sirname")));
                    }
                }
            }

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
        if (log.isDebugEnabled()) {
            log.debug("path pieces: " + path + ", path size: " + path.size());
            log.debug("@@ type here " + frameworkParameters.get(TYPE) );
        }

        StringBuilder result = new StringBuilder();
        if (path.size() == 0) {
            result.append("/list.jspx?t=" + type);
        } else {
            result.append("/content.jspx?n=");
            Cloud cloud = frameworkParameters.get(Parameter.CLOUD);

            if (path.size() > 0) {          // article/[nodennr]/title
                final String nr = path.get(0);    // nodenumber is first element
                if (log.isDebugEnabled()) {
                    log.debug("nr: " + nr);
                }

                if (cloud.hasNode(nr)) {    // works also for aliasses
                    result.append(nr);
                } else {
                    return Url.NOT;
                }
 
            } else {
                if (log.isDebugEnabled()) { 
                    log.debug("path not > 0");
                }
                return Url.NOT;
            }

        }

        if (log.isDebugEnabled()) log.debug("returning: " + result.toString());
        return new BasicUrl(this, result.toString());
    }

}
