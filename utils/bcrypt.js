import bcrypt from 'bcrypt'

const hashedPassword= async (password)=>{
    return await bcrypt.hash(password,10)
}

const comparePasword = async (password,newPassword)=>{
    return await bcrypt.compare(password,newPassword)
}


export const bcryptData={
    hashedPassword,
    comparePasword
}
