import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    
    date,
    participantes, //arr de jugadores de la communidad que van participar,
    typeEvent,
    winner//fecha unica liga
})

