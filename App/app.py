import newspaper
import schedule
import pandas as pd

from utils import summarizer

import time
from datetime import datetime


# Load available sources
SOURCE_FILE = "data/sources.csv"
sources = pd.read_csv(SOURCE_FILE)
dataframe = pd.DataFrame({"names": sources["name"], "links": sources["link"]})
sources_to_link = dict(zip(list(dataframe.names), list(dataframe.links)))


def get_source(url, max_get_articles=20):
    '''
    '''
    news_articles = newspaper.build(url, memoize_articles=False)
    n_articles = len(news_articles.articles)

    articles = []
    for article in news_articles.articles[:min(max_get_articles, n_articles)]:
        article.download()
        article.parse()

        title = article.title
        try:
            image = article.top_image
        except:
            image = "https://github.com/team-anything/Briefly/blob/master/assets/Briefly.png"

        article.nlp()
        summary = summarizer(article)

        # TODO: humanize in Client-Side
        date = datetime.today().strftime("%b %d %Y")
        print([article.url, title, date, image, summary])
        articles.append([article.url, title, date, image, summary])

    return articles


def conduct():
    '''
    TODO: A B
        A
            1. Pull Data Via Source Keys
                [optional] Map Reduce over source -> Have N Source Keys ( source -> articles )
            2. Update DB
        B
            Redundant Memoize Articles, Latest Pull Issue

    '''
    print(datetime.today().strftime("%b %d %Y %H:%M:%S"))
    source_to_processed_articles = dict()

    for source in sources_to_link.keys():
        source_to_processed_articles[source] = get_source(sources_to_link[source])
        print("Collected {number} articles of {source}".format(number=len(source_to_processed_articles[source]), source=source))

    # A.2 Update DB

schedule.every(30).minutes.do(conduct)

if __name__ == "__main__":
    conduct()
    while True:
        schedule.run_pending()
        time.sleep(5)
