let currentArray = [];


/* =========================
   GENERATE ARRAY
========================= */

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


/* =========================
   RENDER ARRAY
========================= */

function renderArray(
    array,
    specialIndexes = [],
    className = ""
) {

    const container =
        document.getElementById("array");

    container.innerHTML = "";


    array.forEach((value, index) => {

        const bar = document.createElement("div");

        bar.className = "bar " + className;

        bar.style.height = value * 3 + "px";


        if (specialIndexes.includes(index)) {

            bar.classList.add(className);

        }


        const label =
            document.createElement("div");

        label.className = "bar-value";

        label.textContent = value;


        bar.appendChild(label);

        container.appendChild(bar);

    });

}


/* =========================
   BUBBLE SORT
========================= */

async function bubbleSort() {

    document.getElementById("status").textContent =
        "Running Bubble Sort...";

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

            document.getElementById("status").textContent =
                `Comparing positions
                ${step.compare[0] + 1}
                and
                ${step.compare[1] + 1}`;

        }


        if (step.swap) {

            renderArray(
                step.array,
                step.swap,
                "swap"
            );

            document.getElementById("status").textContent =
                "Swapping elements.";

        }


        if (step.sorted) {

            renderArray(
                step.array,
                [],
                "found"
            );

            document.getElementById("status").textContent =
                "✓ Array sorted successfully.";

        }


        await sleep(250);

    }

}


/* =========================
   LINEAR SEARCH
========================= */

async function linearSearch() {

    const target =
        prompt("Enter a number to search for:");

    if (!target) {
        return;
    }


    const response =
        await fetch(
            `/api/linear-search/${target}`
        );


    const data =
        await response.json();


    for (const step of data.steps) {

        if (step.current !== undefined) {

            renderArray(
                step.array,
                [step.current],
                "compare"
            );

            document.getElementById("status").textContent =
                `Checking value ${step.array[step.current]}...`;

        }


        if (step.found !== undefined) {

            renderArray(
                step.array,
                [step.found],
                "found"
            );

            document.getElementById("status").textContent =
                `✓ Found ${target} at position ${step.found + 1}.`;

        }


        if (step.not_found) {

            renderArray(step.array);

            document.getElementById("status").textContent =
                `✕ ${target} was not found.`;

        }


        await sleep(400);

    }

}


/* =========================
   DELAY
========================= */

function sleep(ms) {

    return new Promise(
        resolve => setTimeout(resolve, ms)
    );

}


/* =========================
   INITIAL ARRAY
========================= */

generateArray();
