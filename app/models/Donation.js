import mongoose,{models} from "mongoose";
const {Schema,model}= mongoose

const DonationSchema = new Schema({
    name: { type: String, required: true },
    message: { type: String, required: true },
    amount: { type: String, required: true },
});


const Donation = models.Donation || model("Donation", DonationSchema);

export default Donation;