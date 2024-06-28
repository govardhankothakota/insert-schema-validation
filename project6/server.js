const mongoose = require("mongoose");
const { type } = require("os");

let userSchema = new mongoose.Schema({
  id: String,
  firstName: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z ]{2,30}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid firstname`,
    },
    required: [true, "firstname is Mandatory"],
  },
  lastName: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z ]{2,30}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid lastname`,
    },
    required: [true, "lastname is Mandatory"],
  },
  age: {
    type: Number,
    min: [18, "your age is below 18 years"],
    max: [100, "Invalid age"],
    required: [true, "Age is Mandatory"],
  },
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: [true, "email is Mandatory"],
  },
  mobileNo: {
    type: Number,
    validate: {
      validator: function (v) {
        return /^[6-9]\d{9}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid mobile number!`,
    },
    required: [true, "User mobile number required"],
  },
  gender: {
    type: String,
    enum: ["male", "female", "others"],
    lowercase: true,
    required: [true, "Gender is Mandatory"],
  },
  nationality: {
    type: String,
    enum: ["indian", "others"],
    lowercase: true,
    required: [true, "Nationality is Mandatory"],
  },
});

let UserDetails = new mongoose.model(`users`, userSchema);

let insertUserDataIntoMDB = async () => {
  try {
    let user1 = new UserDetails({
      id: "1",
      firstName: "Nagendra",
      lastName: "Nallamaappa",
      age: 25,
      email: "nagendran99@gmail.com",
      mobileNo: "8516428547",
      gender: "Male",
      nationality: "Indian",
    });
    let user2 = new UserDetails({
      id: "2",
      firstName: "Sathish",
      lastName: "Korinepalli",
      age: 27,
      email: "sathishk97@gmail.com",
      mobileNo: "9493904028",
      gender: "Male",
      nationality: "Indian",
    });
    let user3 = new UserDetails({
      id: "3",
      firstName: "jyothsna",
      lastName: "kothakota",
      age: 31,
      email: "jyothsnak93@gmail.com",
      mobileNo: "9954687952",
      gender: "Female",
      nationality: "Indian",
    });
    // await user1.save();
    // await user2.save();
    UserDetails.insertMany([user1, user2, user3]);
    console.log(`Successfully inserted data into DB`);
  } catch (error) {
    console.log(`Uanble to insert data into DB`);
  }
};

let connectTOMDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://govardhank:govardhank@brnstudent.z5qymfc.mongodb.net/UsersDB?retryWrites=true&w=majority&appName=brnstudent`
    );
    console.log(`successfully connected to MDB`);
    insertUserDataIntoMDB();
  } catch (error) {
    console.log(`Unable to connect to MDB`);
  }
};
connectTOMDB();
