
// Função para converter texto no formato "HH:MM" para objeto Date
function textToDate(timeText) {
    const [hours, minutes] = timeText.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Define horas e minutos
    return date;
}

// Função para calcular a diferença em minutos entre dois objetos Date
function calculateTimeDifferenceInMinutes(startTime, endTime) {
    let diffMilliseconds = endTime - startTime;

    // Se a diferença for negativa, significa que o horário final é no dia seguinte
    if (diffMilliseconds < 0) {
        diffMilliseconds += 24 * 60 * 60 * 1000; // Adiciona 24 horas em milissegundos
    }

    return Math.floor(diffMilliseconds / (1000 * 60));
}

// Função para converter minutos em formato "HH:MM"
function minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
}

// Função para dividir o intervalo igualmente entre pessoas
function divideTimeEqually(startTimeText, endTimeText, numberOfPeople) {
    const startTime = textToDate(startTimeText);
    const endTime = textToDate(endTimeText);
    const totalMinutes = calculateTimeDifferenceInMinutes(startTime, endTime);
    const minutesPerPerson = Math.floor(totalMinutes / numberOfPeople);
    
    const timeSlots = [];
    let currentStartTime = startTime;

    for (let i = 0; i < numberOfPeople; i++) {
        const currentEndTime = new Date(currentStartTime.getTime() + minutesPerPerson * 60 * 1000);
        
        const startText = minutesToTime(currentStartTime.getHours() * 60 + currentStartTime.getMinutes());
        const endText = minutesToTime(currentEndTime.getHours() * 60 + currentEndTime.getMinutes());
        
        timeSlots.push({ start: startText, end: endText });
        
        currentStartTime = currentEndTime;
    }
    
    return timeSlots;
}

// Exemplo de uso
const startTimeText = "08:00";
const endTimeText = "12:00";
const numberOfPeople = 4;

const timeSlots = divideTimeEqually(startTimeText, endTimeText, numberOfPeople);
timeSlots.forEach((slot, index) => {
    console.log(`Pessoa ${index + 1}: Início - ${slot.start}, Fim - ${slot.end}`);
});
