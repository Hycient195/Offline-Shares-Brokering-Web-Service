const express = require("express");
const routes = require("./routes/route");
const app = express()


const PORT = 3001;

app.listen(PORT, ()=>{
  console.log(`Server started on port ${PORT}`)
})

app.set('json spaces', 2)
app.set("view engine", "ejs");
app.use(express.json({ limit : '30mb', extended : true}))
app.use(express.static(`${__dirname}/public`))



app.use("/api", routes);

const parameter = {
  name: "hello",
  age: 23,
  cook: "maker"
}

console.log(Object.keys(parameter))