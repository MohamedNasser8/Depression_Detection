from deep_translator import GoogleTranslator
from transformers import pipeline
import requests
import string
import re


class DepressionDetector:
    def __init__(self):
        # initiate the model
        self.model = pipeline("text-classification", model="paulagarciaserrano/roberta-depression-detection")
        self.API_URL = "https://api-inference.huggingface.co/models/rafalposwiata/deproberta-large-depression"
        self.headers = {"Authorization": "Bearer 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"}

    def query(self,payload):
        response = requests.post(self.API_URL, headers=self.headers, json=payload)
        return response.json()
    def remove_diacritics(self,text):
        arabic_diacritics = re.compile("""
                                ّ    | # Tashdid
                                َ    | # Fatha
                                ً    | # Tanwin Fath
                                ُ    | # Damma
                                ٌ    | # Tanwin Damm
                                ِ    | # Kasra
                                ٍ    | # Tanwin Kasr
                                ْ    | # Sukun
                                ـ     # Tatwil/Kashida

                            """, re.VERBOSE)
        text = re.sub(arabic_diacritics, '', text)
        return text

    def remove_punctuations(self,text):
        arabic_punctuations = '''`÷×؛<>_()*&^%][ـ،/:"؟.,'{}~¦+|!”…“–ـ'''
        english_punctuations = string.punctuation
        punctuations_list = arabic_punctuations + english_punctuations
        translator = str.maketrans('', '', punctuations_list)
        return text.translate(translator)

    def remove_repeating_char(self,text):
        return re.sub(r'(.)\1+', r'\1', text)

    def remove_emojis(self,data):
        emoj = re.compile("["
            u"\U0001F600-\U0001F64F"  # emoticons
            u"\U0001F300-\U0001F5FF"  # symbols & pictographs
            u"\U0001F680-\U0001F6FF"  # transport & map symbols
            u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
            u"\U00002500-\U00002BEF"  # chinese char
            u"\U00002702-\U000027B0"
            u"\U00002702-\U000027B0"
            u"\U000024C2-\U0001F251"
            u"\U0001f926-\U0001f937"
            u"\U00010000-\U0010ffff"
            u"\u2640-\u2642"
            u"\u2600-\u2B55"
            u"\u200d"
            u"\u23cf"
            u"\u23e9"
            u"\u231a"
            u"\ufe0f"  # dingbats
            u"\u3030"
                          "]+", re.UNICODE)
        return re.sub(emoj, '', data)

    def preprocess_tweet(self,text):
        text = self.remove_diacritics(text)
        text = self.remove_punctuations(text)
        text = self.remove_repeating_char(text)
        text = self.remove_emojis(text)
        return text

    def get_label_score(self, tweet):
        tweet = self.preprocess_tweet(tweet)
        translated = GoogleTranslator(source="auto", target="en").translate(tweet)
        output = self.query({
            "inputs": translated,
        })
        # print("Output:", output)  # Print the output for inspection


        return output
    

# how to use
# if __name__ == "__main__":
#     detector = DepressionDetector()
#     print(detector.get_label_score("اريد انهي حياتي 💔😭"))
#     print(detector.get_label_score("I am very sad."))