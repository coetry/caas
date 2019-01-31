const ts = require("typescript");
const { send, json, run } = require("micro");

const handler = async (req, res) => {
  res.setHeader("Access-Control-Request-Method", "POST");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  console.log(req);
  const { src } = await json(req);
  console.log(src);
  let result = "";
  if (src) {
    result = ts.transpileModule(src, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext
      }
    });
    console.log(result);
    send(res, 200, { result });
  }
};

module.exports = handler;
