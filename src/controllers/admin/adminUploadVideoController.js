
const preRecordVideoModel = require("../../models/preRecordVideoModel");
const { preRecordVideoByModuleIdService,singlePreRecordVideoService } = require("../../services/preRecordVideoService");

exports.uploadPreRecordVideo = async(req,res)=>{
    try {
        const reqBoyd = req.body;

        let data = await uploadPreRecordVideo.create(reqBoyd)
        
        return res.status(201).json({
            status: "success",
            msg: "Video uploaded successfully",
            data : data
        });
        
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: error.message
        });
    
}
};

exports.updatePreRecordVideo = async(req,res)=>{
    try {
        let id = req.params.id;
        let filter = {_id : id};
        let reqBody = req.body;
        let update = reqBody;
        let data = await preRecordVideoModel.findByIdAndUpdate(filter,update,{new: true});
        if(!data){
            return res.status(404).json({
                status: "fail",
                msg: "Video not found"
            });
        }
        return res.status(200).json({
            status: "success",
            msg: "Video updated successfully",
            data : data
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: error.message
        })
    }
};

exports.deletePreRecordVideo = async(req,res)=>{
    try {
        let id = req.params.id;
        let data = await preRecordVideoModel.findByIdAndDelete({_id : id});
        if(!data){
            return res.status(404).json({
                status: "fail",
                msg: "Video not found"
            });
        }
        return res.status(200).json({
            status: "success",
            msg: "Video deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: error.message
        });
    }
};

exports.allPreRecordVideo = async(req,res)=>{
    try {
        let data = await preRecordVideoModel.find({});
        return res.status(200).json({
            status: "success",
            data : data
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: error.message
        });
    }
};

exports.preRecordVideoByModuleId = async(req,res)=>{
    const data = await preRecordVideoByModuleIdService(req);
    res.send(data);
};

exports.singlePreRecordVideo = async(req,res)=>{
    const data = await singlePreRecordVideoService(req);
    res.send(data);
};