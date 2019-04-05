import newspaper
import schedule
import pandas as pd
import nltk

from utils import summarizer
from firebase_utils import add_news

import time
from datetime import datetime

# Init
nltk.download('punkt')

# Load available sources
SOURCE_FILE = "data/sources.csv"
sources = pd.read_csv(SOURCE_FILE)
dataframe = pd.DataFrame({"names": sources["name"], "links": sources["link"]})
sources_to_link = dict(zip(list(dataframe.names), list(dataframe.links)))


def get_source(url, max_get_articles=20):
    '''
    TODO: memoize_articles , check latency in DB updates
    '''
    news_articles = newspaper.build(url, memoize_articles=False)
    n_articles = len(news_articles.articles)

    articles = []
    placeholder_image = "https://github.com/team-anything/Briefly/blob/master/assets/Briefly.png"
    for article in news_articles.articles[:min(max_get_articles, n_articles)]:
        date = datetime.today().strftime("%b %d %Y")
        # TODO: FIX NEEDED form CrashLoopBackOff
        try:
            article.download()
            article.parse()

            title = article.title
            try:
                image = article.top_image
            except:
                image = placeholder_image

            article.nlp()
            summary = summarizer(article)

            # TODO: humanize in Client-Side
            articles.append([article.url, title, date, image, summary])
        except:
            articles.append(["https://github.com/team-anything/Briefly/","~PLACEHOLDER",date, placeholder_image, PLACEHOLDER])

    return articles


def conduct():
    '''
    TODO: A B
        A
            1. X Pull Data Via Source Keys
                [optional] Map Reduce over source -> Have N Source Keys ( source -> articles )
            2. X Update DB
        B
            Redundant Memoize Articles, Latest Pull Issue

    '''
    print(datetime.today().strftime("%b %d %Y %H:%M:%S"))

    for source in sources_to_link.keys():
        news_articles = get_source(sources_to_link[source])
        print("Collected {number} articles of {source}".format(
            number=len(news_articles), source=source))

        # Update DB
        add_news(source, news_articles, keep_new=15)

schedule.every(60).minutes.do(conduct)

if __name__ == "__main__":
    conduct()
    while True:
        schedule.run_pending()
        time.sleep(5)
    # print(get_source(sources_to_link["bhaskar"]))