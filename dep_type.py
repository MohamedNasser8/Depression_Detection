import nltk
import joblib

class TweetClassifier:
    def __init__(self, model_path='deptype.pkl', vectorizer_path='vectorizer.pkl'):
        # Load the saved model and vectorizer from file
        self.model = joblib.load(model_path)
        self.vectorizer = joblib.load(vectorizer_path)

        # Initialize the preprocessing components
        self.stopwords = nltk.corpus.stopwords.words('arabic')
        self.stemmer = nltk.stem.ISRIStemmer()

    def preprocess_text(self, text):
        words = nltk.word_tokenize(text)
        words = [self.stemmer.stem(word) for word in words if word not in self.stopwords]
        processed_text = ' '.join(words)
        return processed_text

    def predict_category(self, tweet):
        # Preprocess the tweet
        processed_tweet = self.preprocess_text(tweet)

        # Vectorize the processed tweet
        tweet_vectorized = self.vectorizer.transform([processed_tweet])

        # Make prediction using the loaded model
        predicted_category = self.model.predict(tweet_vectorized)

        return predicted_category[0]

# How to use 
# if __name__ == '__main__':
#     tweet_classifier = TweetClassifier()
#     tweet = "يومين ما انام "
#     print(tweet_classifier.predict_category(tweet))