from flask import Flask, render_template, jsonify, request
import random

app = Flask(__name__)


# =========================================================
# HOME
# =========================================================

@app.route("/")
def home():
    return render_template("index.html")


# =========================================================
# BUBBLE SORT
# =========================================================

@app.route("/api/bubble-sort")
def bubble_sort():

    numbers = [random.randint(10, 100) for _ in range(12)]
    arr = numbers.copy()
    steps = []

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


# =========================================================
# SELECTION SORT
# =========================================================

@app.route("/api/selection-sort")
def selection_sort():

    numbers = [random.randint(10, 100) for _ in range(12)]
    arr = numbers.copy()
    steps = []

    for i in range(len(arr)):

        minimum = i

        for j in range(i + 1, len(arr)):

            steps.append({
                "array": arr.copy(),
                "compare": [minimum, j]
            })

            if arr[j] < arr[minimum]:
                minimum = j

        if minimum != i:

            arr[i], arr[minimum] = arr[minimum], arr[i]

            steps.append({
                "array": arr.copy(),
                "swap": [i, minimum]
            })

    steps.append({
        "array": arr.copy(),
        "sorted": True
    })

    return jsonify({
        "original": numbers,
        "steps": steps
    })


# =========================================================
# INSERTION SORT
# =========================================================

@app.route("/api/insertion-sort")
def insertion_sort():

    numbers = [random.randint(10, 100) for _ in range(12)]
    arr = numbers.copy()
    steps = []

    for i in range(1, len(arr)):

        key = arr[i]
        j = i - 1

        while j >= 0 and arr[j] > key:

            steps.append({
                "array": arr.copy(),
                "compare": [j, j + 1]
            })

            arr[j + 1] = arr[j]

            steps.append({
                "array": arr.copy(),
                "swap": [j, j + 1]
            })

            j -= 1

        arr[j + 1] = key

    steps.append({
        "array": arr.copy(),
        "sorted": True
    })

    return jsonify({
        "original": numbers,
        "steps": steps
    })


# =========================================================
# LINEAR SEARCH
# =========================================================

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


# =========================================================
# BINARY SEARCH
# =========================================================

@app.route("/api/binary-search/<int:target>")
def binary_search(target):

    numbers = sorted(
        [random.randint(10, 99) for _ in range(12)]
    )

    steps = []

    left = 0
    right = len(numbers) - 1

    while left <= right:

        middle = (left + right) // 2

        steps.append({
            "array": numbers,
            "current": middle,
            "left": left,
            "right": right
        })

        if numbers[middle] == target:

            steps.append({
                "array": numbers,
                "found": middle
            })

            break

        elif numbers[middle] < target:

            left = middle + 1

        else:

            right = middle - 1

    else:

        steps.append({
            "array": numbers,
            "not_found": True
        })

    return jsonify({
        "array": numbers,
        "steps": steps
    })


# =========================================================
# STACK
# =========================================================

stack = []


@app.route("/api/stack", methods=["GET"])
def get_stack():

    return jsonify({
        "stack": stack
    })


@app.route("/api/stack/push", methods=["POST"])
def stack_push():

    data = request.get_json()
    value = data.get("value")

    if value is None:
        return jsonify({"error": "Value required"}), 400

    stack.append(value)

    return jsonify({
        "stack": stack,
        "message": f"{value} pushed onto stack"
    })


@app.route("/api/stack/pop", methods=["POST"])
def stack_pop():

    if not stack:

        return jsonify({
            "stack": [],
            "message": "Stack is empty"
        })

    value = stack.pop()

    return jsonify({
        "stack": stack,
        "message": f"{value} popped from stack"
    })


# =========================================================
# QUEUE
# =========================================================

queue = []


@app.route("/api/queue", methods=["GET"])
def get_queue():

    return jsonify({
        "queue": queue
    })


@app.route("/api/queue/enqueue", methods=["POST"])
def enqueue():

    data = request.get_json()
    value = data.get("value")

    if value is None:
        return jsonify({"error": "Value required"}), 400

    queue.append(value)

    return jsonify({
        "queue": queue,
        "message": f"{value} added to queue"
    })


@app.route("/api/queue/dequeue", methods=["POST"])
def dequeue():

    if not queue:

        return jsonify({
            "queue": [],
            "message": "Queue is empty"
        })

    value = queue.pop(0)

    return jsonify({
        "queue": queue,
        "message": f"{value} removed from queue"
    })


# =========================================================
# LINKED LIST
# =========================================================

linked_list = []


@app.route("/api/linked-list", methods=["GET"])
def get_linked_list():

    return jsonify({
        "list": linked_list
    })


@app.route("/api/linked-list/insert", methods=["POST"])
def linked_list_insert():

    data = request.get_json()
    value = data.get("value")

    if value is None:
        return jsonify({"error": "Value required"}), 400

    linked_list.append(value)

    return jsonify({
        "list": linked_list,
        "message": f"{value} inserted"
    })


@app.route("/api/linked-list/delete", methods=["POST"])
def linked_list_delete():

    data = request.get_json()
    value = data.get("value")

    if value in linked_list:

        linked_list.remove(value)

        return jsonify({
            "list": linked_list,
            "message": f"{value} deleted"
        })

    return jsonify({
        "list": linked_list,
        "message": f"{value} not found"
    })


# =========================================================
# BINARY SEARCH TREE
# =========================================================

class TreeNode:

    def __init__(self, value):

        self.value = value
        self.left = None
        self.right = None


root = None


def insert_node(node, value):

    if node is None:
        return TreeNode(value)

    if value < node.value:
        node.left = insert_node(node.left, value)

    elif value > node.value:
        node.right = insert_node(node.right, value)

    return node


def search_node(node, value):

    if node is None:
        return False

    if node.value == value:
        return True

    if value < node.value:
        return search_node(node.left, value)

    return search_node(node.right, value)


def tree_to_dict(node):

    if node is None:
        return None

    return {
        "value": node.value,
        "left": tree_to_dict(node.left),
        "right": tree_to_dict(node.right)
    }


@app.route("/api/tree", methods=["GET"])
def get_tree():

    return jsonify({
        "tree": tree_to_dict(root)
    })


@app.route("/api/tree/insert", methods=["POST"])
def tree_insert():

    global root

    data = request.get_json()
    value = data.get("value")

    if value is None:
        return jsonify({"error": "Value required"}), 400

    try:
        value = int(value)
    except ValueError:
        return jsonify({"error": "Value must be a number"}), 400

    root = insert_node(root, value)

    return jsonify({
        "tree": tree_to_dict(root),
        "message": f"{value} inserted into tree"
    })


@app.route("/api/tree/search", methods=["POST"])
def tree_search():

    data = request.get_json()
    value = data.get("value")

    if value is None:
        return jsonify({"error": "Value required"}), 400

    try:
        value = int(value)
    except ValueError:
        return jsonify({"error": "Value must be a number"}), 400

    found = search_node(root, value)

    return jsonify({
        "found": found,
        "value": value
    })


# =========================================================
# RUN
# =========================================================

if __name__ == "__main__":
    app.run(debug=True)
