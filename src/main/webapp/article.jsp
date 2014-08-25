<%@ page language="java" contentType="text/html" 
%><%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"
%><%@ taglib uri="http://www.mmbase.org/mmbase-taglib-2.0" prefix="mm" 
%><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
 "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<mm:content expires="0" type="text/html" escaper="none">
<mm:cloud>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
 <meta http-equiv="content-type" content="text/html; charset=utf-8" />
 <title>Redirect</title>
</head>
<body>

<mm:import externid="objectnumber" />

<mm:listnodescontainer type="syncnodes">
  <mm:constraint field="exportnumber" value="$objectnumber" operator="EQUAL" />
  <mm:listnodes>
    <mm:field name="localnumber" />
    
    <mm:link page="content" absolute="context">
      <mm:frameworkparam name="component">tmf</mm:frameworkparam>
      <mm:frameworkparam name="n">${_node.localnumber}</mm:frameworkparam>
      <mm:frameworkparam name="t">articles</mm:frameworkparam> <!-- TODO: replace this ugliness ! -->
      <c:set var="redirect" value="${_}" />
    </mm:link>
    
    <c:redirect url="${redirect}" />
    
  </mm:listnodes>
</mm:listnodescontainer>


</body>
</html>
</mm:cloud>
</mm:content>
