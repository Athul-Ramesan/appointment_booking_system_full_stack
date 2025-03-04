const db = require("../config/db")

class Appointment {
    static findAvailableSlots (date){
        return new Promise((resolve, reject)=>{
            const query = `
            SELECT time_slot FROM appointments
            WHERE date = ?
            GROUP BY time_slot
            `;


            db.all(query, [date], (err, bookedSlots)=> {
                if(err) {
                    reject(err)
                }

                const allSlots = require('../utils/timeSlots').generateTimeSlots()
                console.log("🚀 ~ Appointment ~ db.all ~ allSlots:", allSlots)
                const availableSlots = allSlots.filter(slot => 
                    !bookedSlots.some(booked => booked.time_slot === slot)
                );
                
                resolve(availableSlots)
            })
        })
    }
    static createAppointment(data){
        return new Promise((resolve, reject)=>{
            const {name, phone, date, timeSlot} = data;
            const query =`
            INSERT INTO appointments(name,phone,date,time_slot)
            VALUES(?,?,?,?)
            `;
            
            db.run(query, [name,phone,data,timeSlot], function(err){
                if(err){
                    if (err.message.includes('UNIQUE constraint failed')) {
                        reject(new Error('Slot already booked'));
                      } else {
                        reject(err);
                      }
                }else{
                    resolve({id:this.lastID})
                }
            })
        })
    }
}

module.exports = Appointment