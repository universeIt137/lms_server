const { mongo, default: mongoose } = require("mongoose");
const moduleModel = require("../../models/moduleModel");
const checkAssociate = require("../../services/checkAssociate");
const moduleDetailsModel = require("../../models/moduleDetailsModel");

class moduleClass {
    moduleCreate = async (req,res)=>{
        try {
            let reqBody = req.body;
            let data = await moduleModel.create(reqBody);
            res.status(201).json({
                status:"success",
                msg : "Module create successfully",
                data : data
            });
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };

    moduleUpdate = async (req,res)=>{
        try {
            let id = req.params.id;
            let filter = { _id : id };
            let reqBody = req.body;
            let update = reqBody;
            let data = await moduleModel.findById({_id : id});
            if(!data) return res.status(404).json({
                status:"fail",
                msg : "module data not found"
            });
            let updateData = await moduleModel.findByIdAndUpdate(
                filter,update,{new:true}
            );
            return res.status(200).json({
                status:"success",
                msg : "Module data update successfully",
                data : updateData
            });
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    };

    moduleDelete = async (req,res)=>{
        try {
            let id = new mongoose.Types.ObjectId(req.params.id);
            let data = await moduleModel.findById({_id : id});
            if(!data) return res.status(404).json({
                status:"fail",
                msg : "module data not found"
            });
            let checkData = await checkAssociate({_id : id},moduleDetailsModel);
            if(checkData){
                return res.status(400).json({
                    status:"fail",
                    msg : "Associate with module details"
                });
            }else {
                await moduleModel.findByIdAndDelete(filter);
                return res.status(200).json({
                    status:"success",
                    msg : "Module data delete successfully",
                });
            }
        } catch (error) {
            return res.status(500).json({
                status:"fail",
                msg : error.toString()
            });
        }
    }
}

const moduleController = new moduleClass();

module.exports = moduleController;