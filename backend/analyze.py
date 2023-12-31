#!/usr/bin/env python

from DepressionDetector import DepressionDetector

from playwright.sync_api import sync_playwright
from nested_lookup import nested_lookup
import json
import sys


# block pages by resource type. e.g. image, stylesheet
BLOCK_RESOURCE_TYPES = [
  'beacon',
  'csp_report',
  'font',
  'image',
  'imageset',
  'media',
  'object',
  'texttrack',
#  we can even block stylsheets and scripts though it's not recommended:
# 'stylesheet',
# 'script',  
# 'xhr',
]


# we can also block popular 3rd party resources like tracking and advertisements.
BLOCK_RESOURCE_NAMES = [
  'adzerk',
  'analytics',
  'cdn.api.twitter',
  'doubleclick',
  'exelator',
  'facebook',
  'fontawesome',
  'google',
  'google-analytics',
  'googletagmanager',
]




def scrape_profile(url: str) -> dict:
    """
    Scrapes Twitter user profile page e.g.:
    https://twitter.com/scrapfly_dev
    returns user data and latest tweets
    """
    _xhr_calls = []

    def intercept_response(response):
        """capture all background requests and save them"""
        # we can extract details from background requests
        if response.request.resource_type in BLOCK_RESOURCE_TYPES:
            return 


        if response.request.resource_type == "xhr":
            _xhr_calls.append(response)
        return response

    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        context = browser.new_context(viewport={"width": 1920, "height": 1080})
        page = context.new_page()
        # enable intercepting for this page

        page.on("response", intercept_response)
        page.goto(url)
        page.wait_for_selector("[data-testid='tweet']")

        user_calls = [f for f in _xhr_calls if "UserBy" in f.url]
        users = {}
        for xhr in user_calls:
            data = xhr.json()
            user_data = data["data"]["user"]["result"]
            users[user_data["legacy"]["screen_name"]] = user_data

        tweet_calls = [f for f in _xhr_calls if "UserTweets" in f.url]
        tweets = []
        for xhr in tweet_calls:
            data = xhr.json()
            xhr_tweets = nested_lookup("tweet_results", data)
            tweets.extend([tweet["result"] for tweet in xhr_tweets])
            users[user_data["legacy"]["screen_name"]] = user_data

    return {"users": users, "tweets": tweets}


if __name__ == "__main__":
    user = sys.argv[1]
    detector = DepressionDetector()

    for item in scrape_profile(user)["tweets"]:
        print(detector.get_label_score(item["legacy"]["full_text"]))
        # print(item["legacy"]["full_text"])
        print(" ")


