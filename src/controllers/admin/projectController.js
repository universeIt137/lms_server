const projectModel = require("../../models/projectModel");
const projectService = require("../../services/projectService");

class projectClass {
  createProject = async (req, res) => {
    try {
      let reqBody = req.body;

      let data = await projectModel.create(reqBody);

      return res.status(201).json({
        status: "success",
        msg: "Project created successfully",
        data: data,
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        msg: error.toString(),
      });
    }
  };

  updateProject = async (req, res) => {
    try {
      
      let id = req.params.id;
      let filter = { _id: id };
      let data = await projectModel.findById({ _id: id });
      if (!data)
        return res.status(404).json({
          status: "fail",
          msg: "Project data not found",
        });
        
      let updateData = await projectModel.findByIdAndUpdate(filter, req.body, {
        new: true,
      });
      return res.status(200).json({
        status: "success",
        msg: "Project data updated successfully",
        data: updateData,
      }); 


    } catch (error) {
      return res.status(500).json({
        status: "fail",
        msg: error.toString(),
      })
    }
  };


  deleteProject = async (req, res) => {
    try {
      let id = req.params.id;
      let filter = { _id: id };
      let data = await projectModel.findById({ _id: id });

      if (!data)
        return res.status(404).json({
          status: "fail",
          msg: "Project data not found",
        });

      await projectModel.findByIdAndDelete(filter);
      return res.status(200).json({
        status: "success",
        msg: "Project data delete successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        msg: error.toString(),
      });
    }
  };

  getAllProjectByAdmin = async (req, res) => {
    let data = await projectService.getAllProjectsService();
    res.send(data);
  };

  getSingleProjectById = async (req, res) => {
    let data = await projectService.getSingleProjectService(req);
    res.send(data);
  };
  getProjectByCourseId = async (req, res) => {
    let data = await projectService.projectByCourseIdService (req);
    res.send(data);
  };
}

const projectController = new projectClass();

module.exports = projectController;
