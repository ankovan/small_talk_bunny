const greetingList = ["Hi, welcome to my place.", "Hello there.", "Hey, nice to see you.", "Howdy."];
const greetingRandom = greetingList[Math.floor(Math.random()*greetingList.length)];
const byeList = ["I have to go now. See you next time.", "I think that's enough for now. Bye."];
const byeRandom = byeList[Math.floor(Math.random()*byeList.length)];
let messageElement;
let answerOptionElement;
let talkButtonElement; 
let messageTree;
let bunnyElement;
let messageTreeList = [
    [
        {
            id: 1,
            text: "Have you slept enough today?", 
            emotion: "normal", 
            options: [
                {
                    text: "Yes, I've slept well.",
                    nextText: 2
                },
                {
                    text: "Not really.",
                    nextText: 3
                }
            ]
        },
        {
            id: 2,
            text: "That's nice to hear.",
            emotion: "happy"
        },
        {
            id: 3,
            text: "Poor you, you should find time to rest.",
            emotion: "sad"
        }
    ],
    [
        {
            id: 1,
            text: "Which colors do you like more - warm or cold ones?",
            emotion: "normal",
            options: [
                    {
                        text: "I like cold colors more.",
                        nextText: 2
                    },
                    {
                        text: "Both are good, especially if you mix them.",
                        nextText: 3
                    },
                    {
                        text: "Warm, of course.",
                        nextText: 4
                    }
            ]
        },
        {
            id: 2,
            text: "For the most part, they are not my favourite, but some of them can be nice.",
            emotion: "normal"
        },
        {
            id: 3,
            text: "You mean contrast? It works pretty well, yes. But for me it's a risky combination.",
            emotion: "thinking"
        },
        {
            id: 4,
            text: "Same thing here, they just make me happy and remind me my childhood.",
            emotion: "happy"
        }
    ],
    [
        {
            id: 1,
            text: "i'm bad at math.", 
            emotion: "sad", 
            options: [
                {
                    text: "Same here.",
                    nextText: 2
                },
                {
                    text: "It's super simple.",
                    nextText: 3
                }
            ]
        },
        {
            id: 2,
            text: "And it's perfectly okay. I'm sure you're good at something else.",
            emotion: "normal"
        },
        {
            id: 3,
            text: "Maybe for you. But for me, it's hard to count with my paws.",
            emotion: "sad"
        }
    ]
]

window.onload = function () {
    messageElement = document.getElementById("message");
    messageElement.innerHTML = greetingRandom;
    answerOptionElement = document.getElementById("answer-options");
    talkButtonElement = document.getElementById("talk-button");
    bunnyElement = document.getElementById("bunny");
}
function bye () {
    messageElement.innerHTML = byeRandom;
    document.getElementById("bye-button").style.display = "block";
}
function refreshThePage() {
    location.reload();
}
function getRandomDialogueTree () {
    talkButtonElement.style.display = "none";
    if (!messageTreeList.length) {
        bye();
        return;
    }
    const index = Math.floor(Math.random()*messageTreeList.length)
    messageTree = messageTreeList[index];   
    messageTreeList.splice(index, 1);
    getDialogue()

}
function getDialogue(id = 1) {
    bunnyElement.classList = ["canvas"]
    answerOptionElement.innerHTML = "";
    const message = messageTree.find(function (item){
        return item.id == id;
    })
    bunnyElement.classList.add(message.emotion); 
    messageElement.innerHTML = message.text;
    if (message.options) {
        message.options.forEach(function(item){
            const button = document.createElement("button");
            button.classList.add("talk")
            button.innerHTML = item.text;
            button.addEventListener( "click", function(e) {
                getDialogue(item.nextText)
            });
            answerOptionElement.appendChild(button);
        })
    } else {
        talkButtonElement.style.display = "block";
    }
}
