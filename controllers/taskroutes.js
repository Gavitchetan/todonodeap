import Task from "../models/task.js";
export const newTask = async (req, res, next) => {
     try {
          const { title, description } = req.body;

          await Task.create({
               title: title,
               description: description,
               user: req.user
          })

          res.status(201).json({
               success: true,
               message: "Task added Successfully",
          });
     } catch (error) {
          // next(error);
          res.json({
               Messgae: "not created task"
          })
     }
};
export const getMyTask = async (req, res, next) => {
     const userid = req.user._id;
     console.log(userid)
     const task = await Task.find({ user: userid })

     res.status(200).json({
          task,
     })
};


export const updatemy = async (req, res) => {
     const { id } = req.params;
     try {
          const task = await Task.findById(id);
          if (!task) {
               return res.status(404).json({ error: 'Task not found' });
          }

          task.isCompleted = !task.isCompleted;
          await task.save();

          return res.status(200).json({ success: true });
     } catch (error) {
          return res.status(500).json({ error: 'Internal server error' });
     }
};



export const deleteMy = async (req, res) => {
     const { id } = req.params;

     try {
          const result = await Task.deleteOne({ _id: id });
          if (result.deletedCount === 0) {
               return res.status(404).json({ error: 'Task not found' });
          }

          return res.status(200).json({ message: 'Task deleted successfully' });
     } catch (error) {
          return res.status(500).json({ error: 'Internal server error' });
     }
};
