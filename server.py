import pandas
from datetime import datetime
from flask import Flask, render_template, request

app = Flask(__name__)

lives = 5

game_df = pandas.read_csv("musicfortheday.csv")
game_data = game_df.to_dict(orient="records")

day = str(datetime.now()).split(" ")[0].split("-")[2]
month = str(datetime.now()).split(" ")[0].split("-")[1]

for item in game_data:
    if item["day"] == int(day) and item["month"] == int(month):
        song_cover_pixel = item["songCoverPixel"]
        song_snippet = item["songSnippet"]
        song_title = item["songTitle"]
        artist = item["artist"]
        song_cover = item["songCover"]
        song_full = item["songFull"]


@app.route("/")
def hello_world():
    global song_cover_pixel, song_snippet
    text = "You have 5 tries"
    return render_template("index.html", cover_img=song_cover_pixel, song_audio=song_snippet, songtitle=text)


@app.route("/checkanswer", methods=["POST"])
def check_answer():
    global song_title, artist, song_cover, song_full, lives, song_cover_pixel, song_snippet
    user_answer = request.form["userguess"].lower()

    lives -= 1
    if lives >= 1:
        if user_answer == song_title.lower():
            return render_template("index.html", songtitle=song_title, songartist=artist, cover_img=song_cover,
                                   song_audio=song_full, congratsvalue="block", formhere="none")
        else:
            text = f"You have {lives} tries left"
            return render_template("index.html", songtitle=text, cover_img=song_cover_pixel, song_audio=song_snippet)
    else:
        text = f"You have no tries left, better luck tomorrow"
        return render_template("index.html", songtitle=text, cover_img=song_cover_pixel, song_audio=song_snippet,
                               lostvalue="block", formhere="none")


if __name__ == "__main__":
    app.run(debug=True)
