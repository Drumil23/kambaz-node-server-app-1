export default function PathParameters(app) {
 const add = (req, res) => {
   const { a, b } = req.params;
   const sum = parseInt(a) + parseInt(b);
   res.send(sum.toString());
 };
 const substract = (req, res) => {
   const { a, b } = req.params;
   const sum = parseInt(a) - parseInt(b);
   res.send(sum.toString());
 };
 const multiply = (req, res) => {
   const { a, b } = req.params;
   const result = parseInt(a) * parseInt(b);
   res.send(result.toString());
 };
 const divide = (req, res) => {
   const { a, b } = req.params;
   const divisor = parseInt(b);
   if (divisor === 0) {
     res.status(400).send('Division by zero');
     return;
   }
   const result = parseInt(a) / divisor;
   res.send(result.toString());
 };
 app.get("/lab5/add/:a/:b", add);
 app.get("/lab5/subtract/:a/:b", substract);
 app.get("/lab5/multiply/:a/:b", multiply);
 app.get("/lab5/divide/:a/:b", divide);
};
