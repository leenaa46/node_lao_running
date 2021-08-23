import "@babel/register"
import "./server"

process.on('uncaughtException', (error) => {
  console.log("error");
  console.log(error);
  process.exit(1);
});