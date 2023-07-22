export const errorMiddleware = (req, res, next) => {
     return res.status(404).json({
          message: "not found",
          success: false,
     })
}