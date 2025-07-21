$(document).ready(function() {
    const chatBox = $('#chatBox');
    const userInput = $('#userInput');
    const sendBtn = $('#sendBtn');

    // ข้อความทักทายที่ Bot สามารถใช้ได้
    const greetingResponses = [
        "How's it going?",
        "Hi, how are you?",
        "How's your day going?",
        "Having a busy day?",
        "How's life?",
        "How's everything?"
    ];

    // คำที่ใช้ในการทักทายจากผู้ใช้
    const greetingTriggers = [
        "hi",
        "hello",
        "yo!",
        "what's up?"
    ];

    // ฟังก์ชันสำหรับเพิ่มข้อความลงใน chatbox
    function addMessage(sender, message) {
        const messageDiv = $('<div class="message ' + sender + '-message"></div>').text(message);
        chatBox.append(messageDiv);
        chatBox.scrollTop(chatBox[0].scrollHeight); // เลื่อนลงไปด้านล่างสุด
    }

    // ฟังก์ชันสำหรับตอบกลับของ Bot
    function botReply(userMessage) {
        userMessage = userMessage.toLowerCase().trim();
        let reply = "How's everything"; // Default reply

        // ตรวจสอบว่าข้อความผู้ใช้เป็นคำทักทายหรือไม่
        if (greetingTriggers.includes(userMessage)) {
            // สุ่มเลือกข้อความตอบกลับจาก greetingResponses
            reply = greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
        } else if (userMessage === "hey") {
            reply = "Hi, how are you?";
        }

        setTimeout(() => {
            addMessage('bot', reply);
        }, 500); // หน่วงเวลาเล็กน้อยเพื่อให้ดูเป็นธรรมชาติ
    }

    // เหตุการณ์เมื่อคลิกปุ่มส่ง
    sendBtn.on('click', function() {
        const message = userInput.val();
        if (message.trim() !== '') {
            addMessage('user', message);
            botReply(message);
            userInput.val(''); // เคลียร์ textbox
        }
    });

    // เหตุการณ์เมื่อกด Enter ในช่องป้อนข้อความ
    userInput.on('keypress', function(e) {
        if (e.which === 13) { // 13 คือโค้ดของปุ่ม Enter
            sendBtn.click();
        }
    });
});