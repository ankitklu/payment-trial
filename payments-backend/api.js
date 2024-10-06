const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const { PORT } = process.env;
const ShortId= require("short-unique-id");
const uid= new ShortId({length:10});
const cors= require("cors");

//we are allowing any user to access your server as cross origin
app.use(cors());

app.use(express.json());

const Razorpay= require("razorpay");
const{
    RAZORPAY_PUBLIC_KEY,
    RAZORPAY_PRIVATE_KEY
} = process.env;

const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_PUBLIC_KEY,
    key_secret: RAZORPAY_PRIVATE_KEY
})

app.get("/", (req, res) => {
    console.log("get route is working");
    res.status(200).json({
        message: "received req"
    });
});

app.post("/checkout",async (req, res)=>{
    try{
        const amount=20; //in paisa(s)
        const currency="INR";
        const receipt= `rp_${uid.rnd()}`;
    
        //receipt
        const orderConfig={
            amount: amount*100,
            currency:currency,
            receipt: receipt
        }
        const order= await razorpayInstance.orders.create(orderConfig);
        console.log("order",order);
        res.status(201).json({
            status:"success",
            order: order
        })
    }
    catch(err){
        res.status(500).json({
            status: "failure",
            message: message.err
        })
    }
})

app.post("/verify", function(){
    //that payment os done -> razorpay
    // update the status of the user -> order, premium

})

// Use PORT from environment variables or default to 3400
app.listen(PORT, function() {
    console.log(`Server running at port no ${PORT}`);
}); 
