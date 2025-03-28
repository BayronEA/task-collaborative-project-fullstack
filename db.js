import mongoose from 'mongoose'


const dbmongoose = "mongodb+srv://boydark_ea:jwgUPsN2oHkg6xa4@clusterlearn.92zqg.mongodb.net/learnmongodb?retryWrites=true&w=majority&appName=ClusterLearn"

export const database = async ()=>{
    try{
        await mongoose.connect(dbmongoose)
        console.log('base de datos conectada')
    }catch{
        console.log('error')
    }
    
}
