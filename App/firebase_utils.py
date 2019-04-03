import pyrebase

'''
! Imports data ( latests ) from scaper.conduct
! Updates with latest. Keep Max 50 per source. 
'''
config = {
    "apiKey": "AIzaSyBvuB5BfFnsnUJqgPtrLUyMxLtASNrwKSU",
    "authDomain": "digizen-a55ed.firebaseapp.com",
    "databaseURL": "https://digizen-a55ed.firebaseio.com",
    "storageBucket": "digizen-a55ed.appspot.com",
}


email="chiragshetty98@gmail.com"
password="test1234"

firebase = pyrebase.initialize_app(config)
auth=firebase.auth()
user=auth.sign_in_with_email_and_password(email,password)


def refresh(user):
    user = auth.refresh(user['refreshToken'])

db=firebase.database()

def get_sources(Source):
    refresh(user)
    SourceName = db.child(Source).get(user["idToken"]).val()
    return SourceName

def add_news(Source,News):
    '''
    Source: Name of the news source
    New: list of individual news, each news item is itself a list [title,url,image_url,date,summary]
    '''
    refresh(user)
    try:
        Sources = db.child(Source).get(user["idToken"]).val()
        Sources = News+Sources
        Sources = Sources[:10]
        db.child(Source).set(Sources)
    except:
        db.child(Source).set(News)
