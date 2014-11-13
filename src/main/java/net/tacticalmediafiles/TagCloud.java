package net.tacticalmediafiles;

import org.mmbase.bridge.*;
import org.mmbase.bridge.util.Queries;
import org.mmbase.bridge.util.SearchUtil;
import org.mmbase.util.logging.ChainedLogger;
import org.mmbase.util.logging.Logger;
import org.mmbase.util.logging.LoggerAccepter;
import org.mmbase.util.logging.Logging;

import java.util.Iterator;

/**
 * Counts the number of relations a keyword has to be able to create
 * a tagcloud.
 *
 * @author  André van Toly
 * @version $Id: RelatedByTags.java 46427 2012-06-07 12:23:49Z andre $
 */

public class TagCloud implements Runnable, LoggerAccepter {
    private static final Logger LOG = Logging.getLoggerInstance(TagCloud.class);

    private static final int MAX_SIZE = 99;
    private ChainedLogger log = new ChainedLogger(LOG);
    private final Thread thread = Thread.currentThread();
    public static TagCloud running;

    public void count(Cloud cloud) throws Exception {
        //Cloud cloud = CloudThreadLocal.currentCloud();
        NodeList keywords = cloud.getNodeManager("keyword").createNodeList();

        //Map<Integer,Integer> map = new HashMap<Integer,Integer>();
        NodeManager sourceNodeManager = cloud.getNodeManager("object");

        int c = 0;
        Iterator<Node> ni =  SearchUtil.findNodeList(cloud, "keyword").iterator();
        while (ni.hasNext() && c < MAX_SIZE) {
            Node node = ni.next();
            //int count = 0;
            try {
                Query query = Queries.createRelatedNodesQuery(node, sourceNodeManager, "related", "source");

                int count = Queries.count(query);
                //if (count > 0) {
                String name = node.getStringValue("keyword");
                if (log.isDebugEnabled()) {
                    log.debug("keyword #" + name + " : size " + count);
                }
                int current_count = node.getIntValue("relationcount");
                if (current_count != count) {
                    node.setIntValue("relationcount", count);
                    log.info("keyword #" + name + " - old count: " + count + ", new count: " + count);
                }

                    //map.put(node.getNumber(), count);
                c++;
                //}

            } catch (Exception e) {
                log.error("Exception while building query: " + e);
            }

        }



    }

    public void addLogger(Logger l) {

    }

    public boolean containsLogger(Logger l) {
        return false;
    }

    public boolean removeLogger(Logger l) {
        return false;
    }

    public void run() {
        try {
            Cloud cloud = ContextProvider.getDefaultCloudContext().getCloud("mmbase", "class", null);
            count(cloud);
        }
        /*  catch (IOException ioe) {
            log.error(ioe.getMessage(), ioe);
        } catch (java.net.URISyntaxException u) {
            log.error(u.getMessage(), u);
        } */
        catch (Exception ex) {
            log.error(ex);
        }

    }

}
