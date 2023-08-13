import mongoose from 'mongoose';

let isConnecter = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnecter){
        console.log('connected')
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "dailyplanner",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnecter = true;
        console.log('connected')
    }catch(error){
        console.log('error.message')
    }
}
