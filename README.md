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


s
