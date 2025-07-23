let questionContainer = document.querySelector("#question");
let optionsContainer = document.querySelector("#options");
let b1 = document.querySelector("#next-btn");
let scoretag = document.querySelector("#score");

let index = 0;
let a = [];  // Fixed declaration
let score = 0;

async function loadQues() {
    try {
        let response = await fetch("./quiz.json");
        a = await response.json();
        console.log(a);
        displayQues();
    } catch (error) {
        console.log(error);
    }
}

function displayQues() {
    optionsContainer.innerHTML = "";
    let current = a[index];
    questionContainer.textContent = current.question;
    current.options.forEach((element, optIndex) => { // Renamed index to optIndex
        let button = document.createElement('button');
        button.textContent = element;
        button.classList.add('option-btn');
        button.addEventListener("click", () => {
            selectAnswer(optIndex);
        });
        optionsContainer.appendChild(button);
    });
}

b1.addEventListener("click", () => {
    index++;
    if (index < a.length) {
        displayQues();
    } else {
        // End Quiz
        questionContainer.textContent = "Quiz Completed";
        optionsContainer.innerHTML = "";
        b1.style.display = "none";
        scoretag.textContent = `Final Score: ${score}/${a.length}`;
    }
});

function selectAnswer(selectedIndex) {
    let current = a[index];
    let optionButtons = document.querySelectorAll('.option-btn');
    
    optionButtons.forEach((button, btnIndex) => {
        if (btnIndex === current.correct) {
            button.style.backgroundColor = "green";
            
        } else {
            button.style.backgroundColor = "red";
        }
        button.disabled = true;
    });

    if (selectedIndex === current.correct) {
        score++;
        console.log("Correct answer!");
        scoretag.textContent = `Score: ${score}`;
    }
}

loadQues();
