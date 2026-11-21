FROM tomcat:9.0-jdk11-temurin

LABEL org.mmbase.description="Tomcat with the TMF webapp and MariaDB connector"

ARG MARIA_DB_VERSION=3.5.7
ARG JAVAMAIL_VERSION=1.6.2
ARG ACTIVATION_VERSION=1.1.1
ARG MAVEN=https://repo1.maven.org/maven2

# JDBC driver for the jdbc/MMBase datasource and the mail jars for the mail/Session resource, both defined in tmf.xml
RUN curl --fail -L ${MAVEN}/org/mariadb/jdbc/mariadb-java-client/${MARIA_DB_VERSION}/mariadb-java-client-${MARIA_DB_VERSION}.jar -o ${CATALINA_HOME}/lib/mariadb-java-client-${MARIA_DB_VERSION}.jar \
 && curl --fail -L ${MAVEN}/com/sun/mail/javax.mail/${JAVAMAIL_VERSION}/javax.mail-${JAVAMAIL_VERSION}.jar -o ${CATALINA_HOME}/lib/javax.mail-${JAVAMAIL_VERSION}.jar \
 && curl --fail -L ${MAVEN}/javax/activation/activation/${ACTIVATION_VERSION}/activation-${ACTIVATION_VERSION}.jar -o ${CATALINA_HOME}/lib/activation-${ACTIVATION_VERSION}.jar

# Tomcat does not substitute environment variables in context files, only system properties
RUN printf '%s\n' \
  'CATALINA_OPTS="$CATALINA_OPTS -DMYSQL_USERNAME=$MYSQL_USERNAME -DMYSQL_PWD=$MYSQL_PWD -DMYSQL_HOST=$MYSQL_HOST -DMYSQL_DATABASE=$MYSQL_DATABASE"' \
  > ${CATALINA_HOME}/bin/setenv.sh

RUN rm -rf ${CATALINA_HOME}/webapps/* && mkdir -p /share
COPY target/tmf-*.war ${CATALINA_HOME}/webapps/ROOT.war

EXPOSE 8080
