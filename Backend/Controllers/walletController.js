import Wallet from '../models/walletSchema.js';


export const refundToWallet = async (req, res) => {
    const { userId, doctorticketPrice, isCancelledBy } = req.body;

    const parseDoctorPrice = parseInt(doctorticketPrice)

    if (!userId || !doctorticketPrice) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const lastWalletEntry = await Wallet.findOne({ userId }).sort({ createdAt: -1 });

        const existingAmount = lastWalletEntry ? lastWalletEntry.currentWalletAmount : 0;
        const newAmount = existingAmount + parseDoctorPrice;
        const wallet = new Wallet({
            userId: userId,
            transactionType: "credit",
            cancelledBy: isCancelledBy || null,
            amount: doctorticketPrice,
            currentWalletAmount: newAmount
        });

        await wallet.save();

        return res.status(200).json({ message: "Wallet credited successfully", wallet });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


export const CurrentBalance = async (req,res)=>{
    
    try {
        const userId =  req.params.userId
        

        const finalBalance = await Wallet.findOne({ userId }).sort({ createdAt: -1 });
        const balance = finalBalance.currentWalletAmount
        console.log('bal',balance);
        return res.status(200).json({success:true, message: "Wallet balance", balance });
        
    } catch (error) {
        console.log('internal');
        return res.status(500).json({success:false, message:"Not found"})
    }
}