import { userSchema } from "../Model/userSchema.js"
import { bcryptData } from "../utils/bcrypt.js"
import { generateTOken } from "../utils/jwt.js"


export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body
        // console.log(req.body);

        const emailChecking = await userSchema.findOne({ email })

        if (emailChecking) {
            return res.status(400).json({ success: false, message: 'email alredy using' })
        }

        const hashedPassword = await bcryptData.hashedPassword(password)
        console.log("hashed", hashedPassword);

        const userData = new userSchema({
            name,
            email,
            password: hashedPassword
        })

        await userData.save()

        res.status(200).json({ success: true, message: "signup compleeted", data: userData })

    } catch (error) {
        return res.status(500).json({ success: false, message: error })

    }

}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body


        const user = await userSchema.findOne({ email })
        //  console.log(email);

        if (!user) {
            res.status(400).json({ success: false, message: error })
        }
        //    console.log(user);


        const compareP = await bcryptData.comparePasword(password, user.password)
        // console.log( password);
        // console.log( user.password);
        //   console.log(compareP);



        if (!compareP) {
            return res.status(401).json({ success: false, message: "incorrect password" })
        }
        //  console.log(compareP);


        console.log(user.is_blocked);
        if (user.is_blocked) {
        // console.log("block");
        return res.status(401).json({success:false,message:"you are blocked"})
        
        } else {
            const token = generateTOken(user._id);
            console.log(user._id);



            return res.status(200).json({ success: true, data: user, token })



        }



    } catch (error) {
        return res.status(500).json({ success: false, message: `server errro${error.message}` })

    }
}

export const logOut=async (req,res)=>{
    try {
        res.cookie('token',null)
        
        res.status(200).json({success:true,message:'logged out'})
        
    } catch (error) {
        res.status(500).json({success:false,message:`${error.message}`})
        
    }
}



export const blockStatus = async (req, res) => {
    try {
        const userId = req.params.id
        console.log(userId);

        const user = await userSchema.findById(userId)

        if (!user) {
            res.status(404).json({ success: false, message: 'user not found' })

        }

        const newStatus = !user.is_blocked
        await userSchema.findByIdAndUpdate(userId, { is_blocked: newStatus })
        const message = newStatus ? "user blocked" : "unblocked"

        return res.status(200).json({ success: true, message, data: newStatus, })


    } catch (error) {
        return res.status(500).json({ success: false, message: `bad requiest ${error.message}` })
    }
}


export const getUserId = async (req,res)=>{
    try {
        const userId=req.params.id

        const user=await userSchema.findById(userId)
            if(!user){
                return res.status(400).json({success:false,message:'user not found'})

            }

           res.status(200).json({success:true,data:user})
        
        
    } catch (error) {
        return res.status(500).json({success:false,message:`bad reqiuest ${error.message}`})
        
    }
}