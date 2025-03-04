function generateTimeSlots(){
    const slots =[]


    for(let hour =10 ; hour < 17 ; hour++){
        for (let minute of [0, 30]){
            if(hour === 12){
                continue;
            }
            const timeString = `${hour.toString().padStart(2,"0")}: ${minute.toString().padStart(2,"0")}`
            slots.push(timeString)  
        }
    }
    return slots
}

module.exports={
    generateTimeSlots
}