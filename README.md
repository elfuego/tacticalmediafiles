Tactical Media Files
====================
Sources to build the Tactical Media Files website with MMBase 1.9.

I just presume you will be having the same settings as I have for 
Maven 2 and Java. You then should be able to build a runable 
webapplication - from the same directory with the Maven pom.xml - 
with the command:

  mvn clean install
  
All the needed resources are downloaded from several maven servers,
including the mmbase.org server. It should also be possibe to run
the site on localhost:8080 with the terminal command:

  mvn jetty:run

