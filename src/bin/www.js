import app from '../app';

const port = process.env.PORT || 3030;

app.listen(port, console.log(`server started at port ${port}`));