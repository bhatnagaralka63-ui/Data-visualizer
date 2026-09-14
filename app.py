from flask import Flask, render_template, jsonify
import random

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/bubble-sort")
def bubble_sort():

    numbers = [random.randint(10, 100) for _ in range(12)]

    steps = []
    arr = numbers.copy()

    for i in range(len(arr)):

        for j in range(0, len(arr) - i - 1):

            steps.append({
                "array": arr.copy(),
                "compare": [j, j + 1]
            })

            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

                steps.append({
                    "array": arr.copy(),
                    "swap": [j, j + 1]
                })

    steps.append({
        "array": arr.copy(),
        "sorted": True
    })

    return jsonify({
        "original": numbers,
        "steps": steps
    })


@app.route("/api/linear-search/<int:target>")
def linear_search(target):

    numbers = [random.randint(10, 99) for _ in range(12)]

    steps = []

    for i, value in enumerate(numbers):

        steps.append({
            "array": numbers,
            "current": i
        })

        if value == target:

            steps.append({
                "array": numbers,
                "found": i
            })

            break

    else:

        steps.append({
            "array": numbers,
            "not_found": True
        })

    return jsonify({
        "array": numbers,
        "steps": steps
    })


if __name__ == "__main__":
    app.run(debug=True)
