export default (err, req, res, _next) => {
  const status = err.statusCode || err.status || 500;
  console.error(`[${req.id || 'req'}] ${err.message}`);
  res.status(status).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'production' && status === 500
        ? 'Something went wrong' : err.message,
    },
  });
};
