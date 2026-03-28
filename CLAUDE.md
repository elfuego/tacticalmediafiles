# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Tactical Media Files (TMF)** is a living archive web application for tactical media resources (videos, articles, campaigns, events). It combines a Java/MMBase CMS backend with a modern Gulp-based frontend build pipeline.

## Commands

### Backend (Maven)
```bash
mvn jetty:run        # Start development server at http://localhost:8080
mvn clean install    # Build the WAR package
mvn package          # Build WAR for deployment
```

### Frontend (from `frontend/` directory)
```bash
npm install          # Install dependencies
gulp                 # Default: watch + BrowserSync live reload
gulp styles          # Compile LESS → CSS (with sourcemaps)
gulp js              # Compile ES6 → ES5 (with sourcemaps)
gulp styles-production  # Minified CSS
gulp js-production   # Minified JS
gulp js-lint         # Lint JavaScript with JSHint
gulp clean           # Clean public/ output directory
```

## Architecture

### Request Flow
HTTP requests → `FrameworkFilter` (MMBase) → URL converters (`SiteUrlConverter`, `ContentUrlConverter`, `MediaUrlConverter`) → JSP/JSPX page blocks defined in `src/main/config/components/tmf.xml`

### Backend: MMBase CMS (`src/main/`)
- **Data model** — XML builder definitions in `src/main/config/builders/tmf/` define content types: `keyword`, `video`, `event`, `campaign`, `content`, `person`, `organisation`, `file`, `picture`
- **URL routing** — `src/main/webapp/WEB-INF/config/utils/urlfilter.xml` maps URL patterns to JSP blocks; Java URL converter classes handle custom routing logic
- **Views** — `src/main/webapp/*.jspx` are the main page templates using MMBase taglib; custom JSP tags live in `WEB-INF/tags/`
- **Search** — Lucene full-text search configured in `WEB-INF/config/utils/luceneindex.xml`; keyword faceting via `TagCloud.java` which counts relation nodes
- **API endpoints** — `src/main/webapp/api/` serves JSON for keywords, video thumbs, home thumbs

### Frontend Build Pipeline (`frontend/`)
- Source: Pug templates (`source/pug/`), LESS stylesheets (`source/less/`), ES6 JS (`source/js/`)
- Output: `frontend/public/` — compiled HTML, CSS, JS
- Built CSS/JS assets must be copied to `src/main/webapp/styles/` to be served by the backend

### Database
- **Development:** Embedded HSQLDB (auto-created at `data/hsqldb/tmf`)
- **Production:** MySQL — credentials configured in `jetty-env.xml` via JNDI

### Key Config Files
| File | Purpose |
|------|---------|
| `pom.xml` | Maven deps and plugins (MMBase 1.9, Saxon 9.1, Jetty 7, Lucene) |
| `jetty-env.xml` | JNDI config for dev DB (HSQLDB/MySQL), mail, RMI |
| `src/main/config/components/tmf.xml` | MMBase component blocks (list, content, media, pages) |
| `src/main/webapp/WEB-INF/web.xml` | Servlet/filter config |
| `frontend/config/default.json` | Frontend paths, navigation, asset locations |
| `frontend/gulpfile.babel.js` | Gulp task orchestration |
