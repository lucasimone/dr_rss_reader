# Django ReactJS Feed Reader

This repository contains my first implementation of a webapp combining together DJANGO and REACTJS.

The goal is to create a simple RSS Reader where the API are implemented using DJANGO Restfull framework and ReactJS will provide the View implementation.

[![build status](https://circleci.com/gh/lucasimone/dr_rss_reader.png?style=shield&circle-token=:813bdbe556e8318483173efaafd93af78a798c95)](https://circleci.com/gh/lucasimone/dr_rss_reader)


# Installation



```bash
git clone https://github.com/lucasimone/dr_rss_reader.git
cd dr_rss_reader/django
mkvirtualenv rssreader
pip install -r ./django/requirements.txt
npm install

# Setup Django DB
./django/manage.py migrate
./django/manage.py runserver

# in another terminal:
node server.js
```





# Technologies in place


* ReactJS adn ES6
* REDUX
* DJANGO & Rest_framework
* Webpack
* NodeJS


# DONE
Features available in the D+Rss Reader at the moment


* First Release of the API available
    * API V1 - http://localhost:8000/api/v1/
    * Source code django/api
* The APP uses Django  Web Template
    * TEMPLATE index.html
* D+Rss Reader is developed as React App using
    * Source availble in /django/reactjs
    * APP running at http://localhost:8000/
* Integration with WEBPACK to Hotdeploy change while coding
    * Run server ./django/reactjs/server.js
    * Webpack base/local/prod/stage JSON configuration
* Integration with Redux as FLUX Implementation:
    * Actions Available [reactjs/actions]:
        * Read Categories
        * Read Feeds
        * Read Feed Items
        * Post new Feeds
    * Reducers for the Action upper described [reactjs/reducers]:
* App provide a first basic implementation of
    * Registration/authentication
    * New Main page
    * Feed Page





# TODO
At the moment there are a lot of graphical issue listed marked for the improvement of the solution
But issues are

* Improve lifecicle APP (REGISTER -> LOGIN -> Add FEED -> SEE ITEMS -> Manage FILTERS)
* Add more UI feedback while user perfom actions
* Add Feed: works but the UI is stuck and no graphical feeback
* List of Feed is broken
* Registration works but need to be improved the UI and the feedback (using redux)
* Use cookies to store data while refreshing
* Add Tag to news
* Populate #Tag List and filter by #tag
* Set read/unread a list
* Remove old list
* Pagination should be comoleted
* Remove button for items/feeds

