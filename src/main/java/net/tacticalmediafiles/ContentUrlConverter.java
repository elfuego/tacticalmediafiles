/*

This file is part of TMF.

*/

package net.tacticalmediafiles;

import java.util.*;
import javax.servlet.http.HttpServletRequest;

import org.mmbase.util.transformers.CharTransformer;
import org.mmbase.util.transformers.Identifier;
import org.mmbase.bridge.*;

import org.mmbase.framework.*;
import org.mmbase.framework.basic.DirectoryUrlConverter;
import org.mmbase.framework.basic.BasicFramework;
import org.mmbase.framework.basic.Url;
import org.mmbase.framework.basic.BasicUrl;
import org.mmbase.bridge.util.SearchUtil;
import org.mmbase.util.functions.*;
import org.mmbase.util.logging.*;

/**
 * UrlConverter that can filter and create urls for TMF.
 *
 * @author André van Toly
 * @version $Id: ContentUrlConverter.java 45504 2011-03-02 20:48:29Z michiel $
 */
public class ContentUrlConverter extends DirectoryUrlConverter {
    private static final long serialVersionUID = 0L;
    private static final Logger log = Logging.getLoggerInstance(ContentUrlConverter.class);

    public ContentUrlConverter(BasicFramework fw) {
        super(fw);
        setDirectory("/article/");
        addBlock(ComponentRepository.getInstance().getComponent("tmf").getBlock("article"));
    }
 
    @Override
    public int getDefaultWeight() {
        int q = super.getDefaultWeight();
        return Math.max(q, q + 1000);
    }

    public static final Parameter<Node> NODE = new Parameter<Node>("n", Node.class);

    @Override
    public Parameter[] getParameterDefinition() {
        return new Parameter[] {Parameter.REQUEST, Framework.COMPONENT, Framework.BLOCK, Parameter.CLOUD, NODE};
    }

    /**
     * Generates a nice url for 'tags'.
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
        if (block.getName().equals("tag")) {
            Node n = frameworkParameters.get(NODE);
            if (n == null) throw new IllegalStateException("No tag parameter used in " + frameworkParameters);
            
            Cloud cloud = n.getCloud();

            //b.append("/").append(trans.transform(n.getStringValue("name")));
            b.append(n.getStringValue("name"));
            
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

        HttpServletRequest request = frameworkParameters.get(Parameter.REQUEST);

        StringBuilder result = new StringBuilder();
        if (path.size() == 0) {
            return Url.NOT; // handled by mmsite
        } else {
            result.append("/tag.jspx?n=");

            String last = path.get(path.size() - 1); // last element can contain language
            path.set(path.size() - 1, last);    // put it back

            if (path.size() > 0) {
                final String tagname = path.get(0);    // tagName is first element
                if (log.isDebugEnabled()) {
                    log.debug("tagname: " + tagname);
                }
                
                final Cloud cloud = frameworkParameters.get(Parameter.CLOUD);
                final Node node = SearchUtil.findNode(cloud, "tags", "name", tagname);
                if (node == null) {
                    log.debug("No tag with name" + tagname);
                    return Url.NOT;
                }
                frameworkParameters.set(NODE, node);
                String nr = "" + node.getNumber();
                result.append(nr);

 
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
