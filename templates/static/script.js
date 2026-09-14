// =========================================================
// GLOBAL
// =========================================================

let currentArray = [];


// =========================================================
// SLEEP
// =========================================================

function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}


// =========================================================
// ARRAY GENERATOR
// =========================================================

function generateArray() {

    currentArray = [];

    for (let i = 0; i < 12; i++) {

        currentArray.push(
            Math.floor(Math.random() * 90) + 10
        );

    }

    renderArray(currentArray);

    document.getElementById("status").textContent =
        "New array generated.";

}


// =========================================================
// RENDER ARRAY
// =========================================================

function renderArray(
    array,
    specialIndexes = [],
    className = ""
) {

    const container =
        document.getElementById("array");

    container.innerHTML = "";


    array.forEach((value, index) => {

        const bar =
            document.createElement("div");

        bar.className =
            "bar " + className;

        bar.style.height =
            value * 3 + "px";


        if (specialIndexes.includes(index)) {

            bar.classList.add(className);

        }


        const label =
            document.createElement("div");

        label.className =
            "bar-value";

        label.textContent =
            value;


        bar.appendChild(label);

        container.appendChild(bar);

    });

}


// =========================================================
// BUBBLE SORT
// =========================================================

async function bubbleSort() {

    setStatus("Running Bubble Sort...");


    const response =
        await fetch("/api/bubble-sort");

    const data =
        await response.json();


    for (const step of data.steps) {

        if (step.compare) {

            renderArray(
                step.array,
                step.compare,
                "compare"
            );

            setStatus(
                "Comparing elements..."
            );

        }


        if (step.swap) {

            renderArray(
                step.array,
                step.swap,
                "swap"
            );

            setStatus(
                "Swapping elements..."
            );

        }


        if (step.sorted) {

            renderArray(
                step.array,
                [],
                "found"
            );

            setStatus(
                "✓ Bubble Sort completed."
            );

        }


        await sleep(180);

    }

}


// =========================================================
// SELECTION SORT
// =========================================================

async function selectionSort() {

    setStatus("Running Selection Sort...");


    const response =
        await fetch("/api/selection-sort");

    const data =
        await response.json();


    for (const step of data.steps) {

        if (step.compare) {

            renderArray(
                step.array,
                step.compare,
                "compare"
            );

            setStatus(
                "Finding the minimum element..."
            );

        }


        if (step.swap) {

            renderArray(
                step.array,
                step.swap,
                "swap"
            );

            setStatus(
                "Swapping minimum into position..."
            );

        }


        if (step.sorted) {

            renderArray(
                step.array,
                [],
                "found"
            );

            setStatus(
                "✓ Selection Sort completed."
            );

        }


        await sleep(220);

    }

}


// =========================================================
// INSERTION SORT
// =========================================================

async function insertionSort() {

    setStatus(
        "Running Insertion Sort..."
    );


    const response =
        await fetch("/api/insertion-sort");

    const data =
        await response.json();


    for (const step of data.steps) {

        if (step.compare) {

            renderArray(
                step.array,
                step.compare,
                "compare"
            );

            setStatus(
                "Comparing elements..."
            );

        }


        if (step.swap) {

            renderArray(
                step.array,
                step.swap,
                "swap"
            );

            setStatus(
                "Moving element..."
            );

        }


        if (step.sorted) {

            renderArray(
                step.array,
                [],
                "found"
            );

            setStatus(
                "✓ Insertion Sort completed."
            );

        }


        await sleep(250);

    }

}


// =========================================================
// LINEAR SEARCH
// =========================================================

async function linearSearch() {

    const target =
        prompt(
            "Enter a number to search for:"
        );


    if (!target) return;


    const response =
        await fetch(
            `/api/linear-search/${target}`
        );


    const data =
        await response.json();


    for (const step of data.steps) {

        if (
            step.current !== undefined
        ) {

            renderArray(
                step.array,
                [step.current],
                "compare"
            );

            setStatus(
                `Checking ${step.array[step.current]}...`
            );

        }


        if (
            step.found !== undefined
        ) {

            renderArray(
                step.array,
                [step.found],
                "found"
            );

            setStatus(
                `✓ Found ${target}!`
            );

        }


        if (step.not_found) {

            renderArray(step.array);

            setStatus(
                `✕ ${target} was not found.`
            );

        }


        await sleep(350);

    }

}


// =========================================================
// BINARY SEARCH
// =========================================================

async function binarySearch() {

    const target =
        prompt(
            "Enter a number to search for:"
        );


    if (!target) return;


    const response =
        await fetch(
            `/api/binary-search/${target}`
        );


    const data =
        await response.json();


    for (const step of data.steps) {

        if (
            step.current !== undefined
        ) {

            renderArray(
                step.array,
                [step.current],
                "compare"
            );

            setStatus(
                `Checking middle value: ${
                    step.array[step.current]
                }`
            );

        }


        if (
            step.found !== undefined
        ) {

            renderArray(
                step.array,
                [step.found],
                "found"
            );

            setStatus(
                `✓ Found ${target}!`
            );

        }


        if (step.not_found) {

            renderArray(step.array);

            setStatus(
                `✕ ${target} was not found.`
            );

        }


        await sleep(600);

    }

}


// =========================================================
// STATUS
// =========================================================

function setStatus(message) {

    document.getElementById(
        "status"
    ).textContent = message;

}


// =========================================================
// STACK
// =========================================================

async function loadStack() {

    const response =
        await fetch("/api/stack");

    const data =
        await response.json();

    renderStack(data.stack);

}


async function pushStack() {

    const input =
        document.getElementById(
            "stackInput"
        );

    const value =
        input.value;


    if (!value) return;


    await fetch(
        "/api/stack/push",
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                value: value
            })
        }
    );


    input.value = "";

    loadStack();

}


async function popStack() {

    await fetch(
        "/api/stack/pop",
        {
            method: "POST"
        }
    );


    loadStack();

}


function renderStack(stack) {

    const container =
        document.getElementById("stack");

    container.innerHTML = "";


    stack.forEach(value => {

        const node =
            document.createElement("div");

        node.className =
            "stack-node";

        node.textContent =
            value;

        container.appendChild(node);

    });

}


// =========================================================
// QUEUE
// =========================================================

async function loadQueue() {

    const response =
        await fetch("/api/queue");

    const data =
        await response.json();

    renderQueue(data.queue);

}


async function enqueue() {

    const input =
        document.getElementById(
            "queueInput"
        );

    const value =
        input.value;


    if (!value) return;


    await fetch(
        "/api/queue/enqueue",
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                value: value
            })
        }
    );


    input.value = "";

    loadQueue();

}


async function dequeue() {

    await fetch(
        "/api/queue/dequeue",
        {
            method: "POST"
        }
    );


    loadQueue();

}


function renderQueue(queue) {

    const container =
        document.getElementById("queue");

    container.innerHTML = "";


    queue.forEach(value => {

        const node =
            document.createElement("div");

        node.className =
            "queue-node";

        node.textContent =
            value;

        container.appendChild(node);

    });

}


// =========================================================
// LINKED LIST
// =========================================================

async function loadLinkedList() {

    const response =
        await fetch(
            "/api/linked-list"
        );

    const data =
        await response.json();

    renderLinkedList(
        data.list
    );

}


async function insertLinkedList() {

    const input =
        document.getElementById(
            "listInput"
        );

    const value =
        input.value;


    if (!value) return;


    await fetch(
        "/api/linked-list/insert",
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                value: value
            })
        }
    );


    input.value = "";

    loadLinkedList();

}


async function deleteLinkedList() {

    const input =
        document.getElementById(
            "listInput"
        );

    const value =
        input.value;


    if (!value) return;


    await fetch(
        "/api/linked-list/delete",
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                value: value
            })
        }
    );


    input.value = "";

    loadLinkedList();

}


function renderLinkedList(list) {

    const container =
        document.getElementById(
            "linkedList"
        );

    container.innerHTML = "";


    list.forEach(
        (value, index) => {

            const wrapper =
                document.createElement(
                    "div"
                );

            wrapper.className =
                "list-node";


            const node =
                document.createElement(
                    "div"
                );

            node.className =
                "node-box";

            node.textContent =
                value;


            wrapper.appendChild(node);


            if (
                index <
                list.length - 1
            ) {

                const arrow =
                    document.createElement(
                        "div"
                    );

                arrow.className =
                    "arrow";

                arrow.textContent =
                    "→";

                wrapper.appendChild(
                    arrow
                );

            }


            container.appendChild(
                wrapper
            );

        }
    );


    if (list.length > 0) {

        const nullNode =
            document.createElement(
                "span"
            );

        nullNode.className =
            "null-node";

        nullNode.textContent =
            "→ NULL";

        container.appendChild(
            nullNode
        );

    }

}


// =========================================================
// BINARY TREE
// =========================================================

async function insertTree() {

    const input =
        document.getElementById(
            "treeInput"
        );

    const value =
        input.value;


    if (!value) return;


    await fetch(
        "/api/tree/insert",
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                value: value
            })
        }
    );


    input.value = "";

    loadTree();

}


async function searchTree() {

    const input =
        document.getElementById(
            "treeInput"
        );

    const value =
        input.value;


    if (!value) return;


    const response =
        await fetch(
            "/api/tree/search",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    value: value
                })
            }
        );


    const data =
        await response.json();


    if (data.found) {

        alert(
            `✓ ${value} exists in the tree.`
        );

    } else {

        alert(
            `✕ ${value} was not found.`
        );

    }

}


async function loadTree() {

    const response =
        await fetch("/api/tree");

    const data =
        await response.json();


    const container =
        document.getElementById("tree");

    container.innerHTML = "";


    if (!data.tree) {

        container.innerHTML =
            `<p class="empty-tree">
                Insert values to build the tree.
             </p>`;

        return;

    }


    container.appendChild(
        createTreeNode(
            data.tree
        )
    );

}


function createTreeNode(nodeData) {

    const node =
        document.createElement(
            "div"
        );

    node.className =
        "tree-node";


    const circle =
        document.createElement(
            "div"
        );

    circle.className =
        "tree-circle";

    circle.textContent =
        nodeData.value;


    node.appendChild(circle);


    if (
        nodeData.left ||
        nodeData.right
    ) {

        const children =
            document.createElement(
                "div"
            );

        children.className =
            "tree-children";


        const left =
            document.createElement(
                "div"
            );

        left.className =
            "tree-child";


        if (nodeData.left) {

            left.appendChild(
                createTreeNode(
                    nodeData.left
                )
            );

        }


        const right =
            document.createElement(
                "div"
            );

        right.className =
            "tree-child";


        if (nodeData.right) {

            right.appendChild(
                createTreeNode(
                    nodeData.right
                )
            );

        }


        children.appendChild(left);

        children.appendChild(right);

        node.appendChild(children);

    }


    return node;

}


// =========================================================
// INITIAL LOAD
// =========================================================

generateArray();

loadStack();

loadQueue();

loadLinkedList();

loadTree();
