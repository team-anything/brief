import pyrebase

from config import *


firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
user = auth.sign_in_with_email_and_password(email, password)


def refresh(user):
    user = auth.refresh(user['refreshToken'])

db = firebase.database()


def add_news(source, news, keep_new=20):
    '''
    source: Name of the news source
    news: list of individual news, each news item is itself a list [url,title,date,image_url,summary]
    '''
    refresh(user)
    try:
        Sources = db.child(source).get(user["idToken"]).val()
        Sources = news + Sources
        Sources = Sources[:keep_new]
        db.child(Source).set(Sources)
    except:
        db.child(source).set(news)
