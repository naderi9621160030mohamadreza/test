const trigger = [
//0
    ["hi", "hey", "hello"],
//1
    ["how are you", "how are things"],
//2
    ["what is going on", "what is up"],
//3
    ["happy", "good", "well", "fantastic", "cool"],
//4
    ["bad", "bored", "tired", "sad"],
//5
    ["tell me story", "tell me joke"],
//6
    ["thanks", "thank you"],
//7
    ["bye", "good bye", "goodbye"],
//8
    ['what is your name','what is your name','your name','your name','name'],
];

const reply = [
//0
    ["Hello!", "Hi!", "Hey!", "Hi there!"],
//1
    [
        "Fine... how are you?",
        "Pretty well, how are you?",
        "Fantastic, how are you?"
    ],
//2
    [
        "Nothing much",
        "Exciting things!"
    ],
//3
    ["Glad to hear it"],
//4
    ["Why?", "Cheer up buddy"],
//5
    ["What about?", "Once upon a time..."],
//6
    ["You're welcome", "No problem"],
//7
    ["Goodbye", "See you later"],
//8
    ["mr7", "my name is mr7"],
];

const alternative = [
    "Same",
    "Go on...",
    "Try again",
    "I'm listening...",
    "Bro...",
    "what ?",
    "I did not get ..."
];


document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input")
    inputField.addEventListener("keydown", function(e) {
        if (e.code === "Enter") {
            let input = inputField.value;
            inputField.value = "";
            output(input);
        }
    });
});

function compare(triggerArray, replyArray, text) {
    let item;
    for (let x = 0; x < triggerArray.length; x++) {
        for (let y = 0; y < replyArray.length; y++) {
            if (triggerArray[x][y] == text) {
                items = replyArray[x];
                item = items[Math.floor(Math.random() * items.length)];
            }
        }
    }
    return item;
}

function output(input) {
    let product;
    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
    text = text
        .replace(/ a /g, " ")
        .replace(/i feel /g, "")
        .replace(/whats/g, "what is")
        .replace(/please /g, "")
        .replace(/ please/g, "");

//compare arrays
//then search keyword
//then random alternative

    if (compare(trigger, reply, text)) {
        product = compare(trigger, reply, text);
    } else if (text.match(/robot/gi)) {
        product = robot[Math.floor(Math.random() * robot.length)];
    } else {
        product = alternative[Math.floor(Math.random() * alternative.length)];
    }

    //update DOM
    addChat(input, product);
}

function addChat(input, product) {
    const mainDiv = document.getElementById("message");
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.innerHTML = `You: <span id="user-response">${input}</span>`;
    mainDiv.appendChild(userDiv);

    let botDiv = document.createElement("div");
    botDiv.id = "bot";
    botDiv.innerHTML = `mr7: <span id="bot-response">${product}</span>`;
    mainDiv.appendChild(botDiv);
    mainDiv.scrollTop += 1000;
    speak(product);
}

function speak(string) {
    const u = new SpeechSynthesisUtterance();
    allVoices = speechSynthesis.getVoices();
    u.voice = allVoices.filter(voice => voice.name === "Alex")[0];
    u.text = string;
    u.lang = "en-US";
    u.volume = 1; //0-1 interval
    u.rate = 1;
    u.pitch = 1; //0-2 interval
    speechSynthesis.speak(u);
}

