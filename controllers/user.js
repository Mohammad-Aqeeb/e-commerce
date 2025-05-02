const User = require("../models/user");

async function createUser(req, res){
    try{
        const {userName, email, password} = req.body;

        if(!userName || !email || !password){
            return res.status(500).json({
                success : false,
                message : "Fill the details correctly"
            })
        }

        const existingData = await User.findOne({email});
        console.log(existingData);

        if(existingData){
            return res.status(500).json({
                success : false,
                message : "User already exisits"
            })
        }

        const data = await User.create({userName, email, password, role : "User"});

        res.status(200).json({
            success : true,
            data : data,
            message : "User created"
        })
    }

    catch(error){
        console.error(error);
        res.status(500).json({
            success : false,
            error : error.message,
            message : "Error while creating user",
        })
    }
}

async function getUsers(req, res){
    try{
        const data = await User.find({});

        if(!data){
            return res.status(404).json({
                success : false,
                message : "No user found"
            })
        }
        
        res.status(200).json({
            success : true,
            data : data,
            message : "User fetched successfuly"
        })

    }
    catch(error){
        console.error(error)
        res.status(500).json({
            success : false,
            message : error.message,
            messsage : "Error in getting user"
        })
    }
}

async function deleteUser(req, res){
    try{
        const id = req.body.userId;

        if(!id){
            return res.status(500).json({
                success : false,
                message : "Please provide valid user id"
            })
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({
            success : true,
            message : "User deleted successfuly"
        })

    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success : false,
            message : "Internal server error",
            error : error.message
        })
    }
}

async function loginUser(req, res){
    try{
        const {email, password} = req.body;

        if(!email && !password){
            return res.status(500).json({
                success : false,
                message : "Please fill the details"
            })
        }

        const data = await User.findOne({email});

        if(!data){
            return res.status(500).json({
                success : false,
                message : "User not found"
            })
        }
        console.log(data);

        if(data.password !== password){
            return res.status(500).json({
                success : false,
                message : "Password Incorrect"
            })
        }

        res.status(200).json({
            success : true,
            data : data,
            message : "User login successfully"
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            error : error.message,
            message : "Error while login"
        })
    }
}


// async function updateUser(req, res){
//     try{
//         const {userName, email, password, role, id} = req.body;

//         if()

//         if(!userName || !email || !password || !role){
//             return res.status(500).json({
//                 success : false,
//                 message : "Fill the details correctly"
//             })
//         }
//     }
//     catch(error){
//         console.error(error)
//         res.status(500).json({
//             success : false,
//             message : error.message
//         })
//     }
// }

module.exports = {
    createUser,
    loginUser,
    getUsers,
    deleteUser,
    // updateUser,
};