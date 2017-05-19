from fabric.api import local

def webpack():
    local('rm -rf dr_rss_reader/static/bundles/stage/*')
    local('rm -rf dr_rss_reader/static/bundles/prod/*')
    local('node_modules/.bin/webpack --config webpack.stage.config.js --progress --colors')
    local('node_modules/.bin/webpack --config webpack.prod.config.js --progress --colors')