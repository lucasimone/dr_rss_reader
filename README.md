# Django ReactJS Feed Reader

This repository contains my first implementation of a webapp combining together DJANGO and REACTJS.

The goal is to create a simple RSS Reader where the API are implemented using DJANGO Restfull framework and
ReactJS will provide the View implementation.

# Try this on your machine

 - Step0: Clone the repository

```bash
git clone https://github.com/lucasimone/dr_rss_reader.git
cd dr_rss_reader/django
```

 - Step1: create your virtualenv (optional)
 If you have never seen this mkvirtualenv command, give a look at the  [documentation here](http://virtualenvwrapper.readthedocs.org/en/latest/) first.


```bash
 mkvirtualenv rssreader
```

 - Step2: install required dependencies for python and setup nodejs
```bash
pip install -r ./django/requirements.txt
npm install
```

- Step3: setup DB (development)
```bash
./django/manage.py migrate
```


- Step3 Start Django & NodeJS
```bash
./django/manage.py runserver

# in another terminal:
node server.js
```


# License
