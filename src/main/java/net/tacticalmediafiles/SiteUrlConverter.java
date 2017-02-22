/* This file is part of TMF. */

package net.tacticalmediafiles;

import org.mmbase.bridge.Cloud;
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
import org.mmbase.util.xml.UtilReader;

import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.net.URLEncoder.encode;


/**
 * UrlConverter that can filter and create urls for pre configured pages and templates in TMF.
 * The mapping of templates to pages or url's is done in configuration file 'utils/urlfilter.xml'.
 *
 * @author André van Toly
 * @version $Id:  $
 */
public class SiteUrlConverter extends DirectoryUrlConverter {
    private static final long serialVersionUID = 0L;
    private static final Logger log = Logging.getLoggerInstance(SiteUrlConverter.class);

    protected final List<String> excludedPaths = new ArrayList<String>();
    private static Identifier trans = new Identifier();
    private String wsReplacer = "-";

    /* directories for content (f.e. about): /about */
 	private static Map<String, String> pages = new HashMap<String, String>();

    public SiteUrlConverter(BasicFramework fw) {
        super(fw);
        //setDirectory("/video/");
        Component tmf = ComponentRepository.getInstance().getComponent("tmf");
        if (tmf == null) throw new IllegalStateException("No such component tmf");

        addBlock(tmf.getBlock("pages"));
        readConfiguration(reader);
    }

    /* Config file for more application specific properties, here the paths and templates  */
    private static final String CONFIG_FILE = "urlfilter.xml";
    private static UtilReader reader = new UtilReader(CONFIG_FILE, new Runnable() {
                                                 public void run() {
                                                     readConfiguration(reader);
                                                 }
                                             });

    @Override
    public int getDefaultWeight() {
        int q = super.getDefaultWeight();
        return Math.max(q, q + 2000);
    }

    public void setExcludedPaths(String l) {
        excludedPaths.clear();
        excludedPaths.addAll(Arrays.asList(l.split(",")));
    }

    public void setWhitespaceReplacer(String ws) {
        wsReplacer = ws;
        trans = new Identifier();
        {
            trans.setWhitespaceReplacer(ws);
        }
    }

    public static final Parameter<String> PAGE = new Parameter<String>("page", String.class);
    public static final Parameter<String> KEYWORD = new Parameter<String>("keyword", String.class);

    @Override
    public Parameter[] getParameterDefinition() {
        return new Parameter[] {Parameter.REQUEST, Framework.COMPONENT, Framework.BLOCK, Parameter.CLOUD, PAGE, KEYWORD};
    }

    @Override
    public boolean isFilteredMode(Parameters frameworkParameters) throws FrameworkException {
        HttpServletRequest request = org.mmbase.framework.basic.BasicUrlConverter.getUserRequest(frameworkParameters.get(Parameter.REQUEST));
        String path = FrameworkFilter.getPath(request);
        for (String e : excludedPaths) {
            if (path.startsWith("/" + e + "/")) {
                return false;
            }
        }
        return super.isFilteredMode(frameworkParameters);
    }

    public static void readConfiguration(UtilReader reader) {
        log.info("Reading config...");

        Map<String, String> props = reader.getProperties();

        Map<String, ?> config = reader.getMaps();
        if (config.size() == 0) {
            log.warn("No entries found in " + CONFIG_FILE);
        }

        for (Map.Entry<String, ?> entry : config.entrySet()) {

            String propertyKey = entry.getKey();
            Collection<Map.Entry<String, String>> properties = (Collection<Map.Entry<String, String>>) entry.getValue();
            log.info("Setting properties " + properties + " on " + propertyKey);
            if ("pages".equals(propertyKey)) {
                pages.clear();
                for (Map.Entry<String, String> property : properties) {
                    pages.put(property.getKey(), property.getValue());
                }
            }
        }

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


        if (block.getName().equals("pages")) {
            StringBuilder path = new StringBuilder();
            String page = (String) frameworkParameters.get(PAGE);
            if (log.isDebugEnabled()) log.debug("page: " + page);

            if (pages.containsKey(page)) {
                path.append(page);

                if ("search".equals(page)) {
                    String keyword = (String) frameworkParameters.get(KEYWORD);
                    if (keyword == null || "".equals(keyword)) {
                        if (log.isDebugEnabled()) log.debug("no keyword, path now: " + path.toString());
                    } else {
                        try {
                            keyword = encode(keyword, "UTF-8");
                        } catch (UnsupportedEncodingException e) {
                            e.printStackTrace();
                        }
                        path.append("?q=").append(keyword);
                        if (log.isDebugEnabled()) log.debug("keyword, path now: " + path.toString());
                    }

                }
            }
            if (path.length() > 0) {
                b.append(path);
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
        if (log.isDebugEnabled()) log.debug("path pieces: " + path + ", path size: " + path.size());

        StringBuilder result = new StringBuilder();
        if (path.size() == 0) {
            return Url.NOT;
        } else {

            Cloud cloud = frameworkParameters.get(Parameter.CLOUD);
            if (path.size() > 0 && excludedPaths.contains(path.get(0))) {
                if (log.isDebugEnabled()) {
                    log.debug("Returning null, path in excludepaths: " + path.get(0));
                }
                return Url.NOT;
            }

            if (path.size() > 0) {
                final String firstPart = path.get(0);
                if (log.isDebugEnabled()) {
                    log.debug("firstPart: " + firstPart);
                }
                if (pages.containsKey(firstPart)) {
                    result.append("/").append(pages.get(firstPart));    // append template
                }

                /* if (path.size() > 1) {
                    String second = path.get(1); // node nr
                    if (cloud.hasNode(second)) {
                        result.append("?item=").append(second);
                    }
                } */
            }

        }

        if (log.isDebugEnabled()) log.debug("returning: " + result.toString());
        return new BasicUrl(this, result.toString());
    }

}
