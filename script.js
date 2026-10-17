// GETTING ALL ELEMENTS

const start_button = document.querySelector(".start_button button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const next_btn = document.querySelector(".next_btn");
const timer_sec = document.querySelector(".timer_sec");
const time_line = document.querySelector(".time_line");

// THE TICK AND CROSS ICONS
let tick_icon = '<div class = "icon tick"><i class = "fas fa-check"></i></div>';
let cross_icon = '<div class = "icon cross"><i class = "fas fa-times"></i></div>';

let que_count = 0;
let counter;
let time_value = 15;

//PRESS START BUTTON
start_button.onclick = ()=>
{
    info_box.classList.add("activeInfo");
}

//PRESS EXIT BUTTON
exit_btn.onclick = ()=>
{
    info_box.classList.remove("activeInfo");
}

//PRESS CONTINUE
continue_btn.onclick = ()=>
{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(que_count);
    startTimer(time_value);
}

//PRESS NEXT
next_btn.onclick = ()=>
{
    clearInterval(counter);
    if (que_count < questions.length - 1)
    {
        que_count++;
        showQuestions(que_count);
        startTimer(time_value);
    }
    else
    {
        // LAST QUESTION DONE: go back to the start screen
        window.location.reload();
    }
}

//QUESTIONS

function showQuestions(index)
{
    const que_text = document.querySelector(".que_text");
    let que_tag = '<span>' + questions[index].question + '</span>';
    let option_tag = '<div class = "option"><span>' + questions[index].options[0] + '</span></div>'
                   + '<div class = "option"><span>' + questions[index].options[1] + '</span></div>'
                   + '<div class = "option"><span>' + questions[index].options[2] + '</span></div>'
                   + '<div class = "option"><span>' + questions[index].options[3] + '</span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    queCounter(index + 1);
    next_btn.style.visibility = "hidden";   // the next button only shows after an answer

    // the button says Finish Quiz on the last question
    if (index == questions.length - 1)
    {
        next_btn.textContent = "Finish Quiz";
    }
    else
    {
        next_btn.textContent = "Next Question";
    }

    // CHOOSE
    const all_options = option_list.querySelectorAll(".option");
    for (let i = 0; i < all_options.length; i++)
    {
        all_options[i].onclick = ()=>
        {
            optionSelected(all_options[i]);
        }
    }
}

// WHEN ANSWER PICKED
function optionSelected(answer)
{
    clearInterval(counter);
    let user_answer = answer.querySelector("span").textContent;
    let correct_answer = questions[que_count].answer;

    if (user_answer == correct_answer)
    {
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tick_icon);
    }
    else
    {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", cross_icon);
        showCorrectAnswer();
    }

    lockOptions();
    next_btn.style.visibility = "visible";
}

// TURN THE CORRECT ANSWER GREEN
function showCorrectAnswer()
{
    let correct_answer = questions[que_count].answer;
    const all_options = option_list.querySelectorAll(".option");
    for (let i = 0; i < all_options.length; i++)
    {
        if (all_options[i].querySelector("span").textContent == correct_answer)
        {
            all_options[i].classList.add("correct");
            all_options[i].insertAdjacentHTML("beforeend", tick_icon);
        }
    }
}

// STOP  CLICKING AGAIN
function lockOptions()
{
    const all_options = option_list.querySelectorAll(".option");
    for (let i = 0; i < all_options.length; i++)
    {
        all_options[i].classList.add("disabled");
    }
}

// THE 15 SECOND TIMER
function startTimer(time)
{
    timer_sec.textContent = time;
    time_line.style.width = "100%";
    counter = setInterval(timer, 1000);

    function timer()
    {
        time--;
        timer_sec.textContent = time;
        time_line.style.width = (time / time_value * 100) + "%";

        if (time <= 0)
        {
            // TIME RAN OUT: show the right answer and lock everything
            clearInterval(counter);
            showCorrectAnswer();
            lockOptions();
            next_btn.style.visibility = "visible";
        }
    }
}

// "1 Of 5 Questions" AT THE BOTTOM
function queCounter(index)
{
    const total_questions = document.querySelector(".total_questions");
    total_questions.innerHTML = '<span><p>' + index + '</p><p>Of</p><p>' + questions.length + '</p><p>Questions</p></span>';

}