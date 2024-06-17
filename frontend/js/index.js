function toggleChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.style.display = (chatBox.style.display === 'none' || chatBox.style.display === '') ? 'flex' : 'none';
    if (chatBox.style.display === 'flex' && step === 0) {
        sendMessage();
    }
}

let step = 0;
const urlApi = "http://localhost:3050/api/v1";
let userData = {
    userId: "",
    userName: "",
    userCpf: "",
    userPlan: "",
    userEmail: "",
    userPhone: "",
    visitDate: "",
    visitTime: "",
    contactProblem: ""
}

const botQuestions = [
    {
        question: "Bom dia, antes de iniciarmos, pode nos informar seu nome?",
        inputName: "userName",
        innerHTML: "",
    },
    {
        question: "Pode nos informar seu CPF?",
        inputName: "userCpf",
        innerHTML: "",
    },
    {
        question: "Seu CPF não se encontra no nosso sistema. Gostaria de Aderir a um de nossos planos?",
        inputName: "",
        innerHTML: `
            <button class="buttonChat" onclick="selectOption('sim', true)">Sim</button>
            <button class="buttonChat" onclick="selectOption('não', true)">Não</button>
            `,
    },
    {
        question: "Qual Dos Nossos planos planeja Aderir?",
        inputName: "userPlan",
        innerHTML: `
            <button class="buttonChat" onclick="selectOption('700mega', false)">700 Mega (R$ 94,90))</button>
            <button class="buttonChat" onclick="selectOption('500mega', false)">500 Mega (R$ 84,90))</button>
            <button class="buttonChat" onclick="selectOption('400mega', false)">400 Mega (R$ 74,90))</button>
            `,
    },
    {
        question: "Pode nos informar seu Email?",
        inputName: "userEmail",
        innerHTML: "",
    },
    {
        question: "Pode nos informar seu telefone para contato?",
        inputName: "userPhone",
        innerHTML: "",
    },
    {
        question: "Pode nos informar qual o motivo do contato?",
        inputName: "contactProblem",
        innerHTML: "",
    },
    {
        question: "Pode nos dizer a data para que possamos lhe enviar um técnico para lhe auxiliar?",
        inputName: "visitTime",
        innerHTML: `<input type="date" id="date-input" onchange="handleDateChange(event)">`,
    },
    {
        question: "Pode nos dizer o melhor horário? manhã ou tarde?",
        inputName: "visitDate",
        innerHTML: `
            <button class="buttonChat" onclick="selectOption('manhã', false)">Manhã</button>
            <button class="buttonChat" onclick="selectOption('tarde', false)">Tarde</button>
            `,
    },
    {
        question: "Obrigado por entrar em contato com a Vem De Net.",
        inputName: "",
        innerHTML: "",
    }
]

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

async function sendMessage() {
    const userInput = document.getElementById('user-input');
    const userMessage = userInput.value.trim();
    if(userMessage != ""){
        displayUserMessage(userMessage);
        if(step != 2){
            userData[botQuestions[step].inputName] = userMessage;
        }
        userInput.value = '';
        if(step == 1){
            const request = await requestUser(userData.userCpf);
            if(request){
                step = 6;
            }else{
                step++;
            }
        
        }else if(step == 4){
            if(isValidEmail(userData.userEmail)){
                step++;
            }else{
                displayBotMessage("Email Invalido. Tente novamente");
                step = 4;
            }
        }else{
            step++;
        }
    }else if(step > 0){
        displayBotMessage("Mensagem Invalida. Tente novamente");
        step--;
    }
    chatBotMessages();
}

function chatBotMessages(){
    if(step === 0){
        displayBotMessage(botQuestions[step].question)
    }else if(step === 1){
        displayBotMessage(`Olá ${userData.userName}. ${botQuestions[step].question}`)
    }else if(step === 2){
        displayBotMessage(botQuestions[step].question);
        addOptions(botQuestions[step].innerHTML);
    }else if(step === 3){
        displayBotMessage(botQuestions[step].question);
        addOptions(botQuestions[step].innerHTML);
    }else if(step === 4){
        displayBotMessage(botQuestions[step].question);
    }else if(step === 5){
        displayBotMessage(botQuestions[step].question);
    }else if(step === 6){
        displayBotMessage(botQuestions[step].question);
    }else if(step === 7){
        registerUser();
        displayBotMessage(botQuestions[step].question);
        addOptions(botQuestions[step].innerHTML);
    }else if(step === 8){
        displayBotMessage(botQuestions[step].question);
        addOptions(botQuestions[step].innerHTML);
    }else{
        registerOrder();
        displayBotMessage(botQuestions[step].question);
        document.querySelector('.chat-footer input').disabled = true;
        document.querySelector('.chat-footer button').disabled = true;
    }
}

function displayUserMessage(message) {
    const chatBody = document.getElementById('chat-body');
    const userMessageElement = document.createElement('div');
    userMessageElement.className = 'user-message';
    userMessageElement.innerHTML = `<p>${message}</p>`;
    chatBody.appendChild(userMessageElement);
}

function displayBotMessage(message) {
    const chatBody = document.getElementById('chat-body');
    const botMessageElement = document.createElement('div');
    botMessageElement.className = 'bot-message';
    botMessageElement.innerHTML = `<p>${message}</p>`;
    chatBody.appendChild(botMessageElement);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function addOptions(innerHTML) {
    const chatBody = document.getElementById('chat-body');
    const optionsElement = document.createElement('div');
    optionsElement.className = 'buttonsChat';
    optionsElement.innerHTML = innerHTML;
    chatBody.appendChild(optionsElement);
    document.getElementById('user-input').disabled = true;
    chatBody.scrollTop = chatBody.scrollHeight;
}

function selectOption(option, isAdopt) {
    const chatBody = document.getElementById('chat-body');
    const userInput = document.getElementById('user-input');

    const buttons = chatBody.querySelectorAll('.buttonsChat button');
    buttons.forEach(button => button.remove());

    document.getElementById('user-input').disabled = false;
    document.getElementById('user-input').focus();

    if(isAdopt){
        if (option.toLowerCase() === 'sim') {
            const userInput = document.getElementById('user-input');
            userInput.value = "Sim";
            sendMessage();
        }
        else {
            displayBotMessage("Ok, se precisar de algo, estamos à disposição!");
            document.querySelector('.chat-footer input').disabled = true;
            document.querySelector('.chat-footer button').disabled = true;
        }
    }else{
        const userInput = document.getElementById('user-input');
        userInput.value = option;
        sendMessage();
    }
    chatBody.scrollTop = chatBody.scrollHeight;
}

function addDateInput(innerHTML) {
    const chatBody = document.getElementById('chat-body');
    const dateInputElement = document.createElement('div');
    dateInputElement.className = 'bot-message';
    dateInputElement.innerHTML = innerHTML;
    chatBody.appendChild(dateInputElement);
    document.getElementById('user-input').disabled = true;
    chatBody.scrollTop = chatBody.scrollHeight;
}

function handleDateChange(event) {
    const selectedDate = event.target.value;
    const userInput = document.getElementById('user-input');
    userInput.value = selectedDate;
    const dateInput = document.getElementById('date-input');
    if (dateInput) dateInput.parentElement.remove();
    document.getElementById('user-input').disabled = false;
    sendMessage();
}

document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

async function requestUser(userCpf){
    try {
        const response = await axios.get(`${urlApi}/user/cpf/${userCpf}`);
        userData.userId = response.data.id;
        userData.userEmail = response.data.email;
        userData.userPhone = response.data.phone;
        return true;
    } catch (error) {
        return false;
    }
}

async function registerUser(){
    try {
        const response = await axios.post(`${urlApi}/user`, {
            cpf: userData.userCpf,
            username: userData.userName,
            email: userData.userEmail,
            phone: userData.userPhone
        });
        userData.userId = response.data.id;
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

async function registerOrder(){
    try {
        const response = await axios.post(`${urlApi}/order`, {
            user_id: userData.userId,
            date: userData.visitDate,
            type: userData.contactProblem,
            shift: userData.visitTime,
        });
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}