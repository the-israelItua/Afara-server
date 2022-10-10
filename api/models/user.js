import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type:String,
    required:true,
  },
  age: {
    type: Number,
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  occupation: {
    type:String,
  },
  currentlyEmployed: {
    type: Boolean,
  },
  address: {
    type:String,
  },
  yrsEmployed: {
    type: Number,
  },
  
})

const User = mongoose.model('User', userSchema);
export default  User;


