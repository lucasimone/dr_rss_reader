# DR. RSS Reader - DJANGO Section

In this section there are all the details about DJANGO



## Prerequisites
- Python




# Workflow

This should be the development workflow
```bash
cd django
./manage.py runserver
# On another terminal
node server.js
```

- Work on your code in ReactJS APP
- Commit your new bundles

```bash
fab webpack
```

RUN the code in the deployment.
On your servers, you will need a local_settings.py
where you override the WEBPACK_LOADER setting like this:

```
WEBPACK_LOADER = {
    'DEFAULT': {
        'BUNDLE_DIR_NAME': 'bundles/stage/',  # end with slash
        'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats-stage.json'),
    }
}
```