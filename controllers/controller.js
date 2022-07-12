const sharesData = require("../shares.json");
const fs = require("fs")



/*====================*/
/* Listing All Shares */
/*====================*/
module.exports.list_shares = (req, res) =>{
  try {
    // res.status(200).json(
    //   JSON.parse(
    //     fs.readFileSync("shares.json", "utf-8")
    //   )
    // );
    // res.render('list_shares', {payload: fs.readFileSync("shares.json", "utf-8")})
    res.locals.payload = fs.readFileSync("shares.json", "utf-8")
    res.render("list_shares.ejs");
  } catch (error){
    res.status(400).json({ message: error.message })
  }
}


/*=================*/
/* Purchase Shares */
/*=================*/
module.exports.purchase_share = (req, res) =>{
  const { company_name, num_of_shares, buyer } = req.body
  console.log(req.body)
  const stagedShares = [];
  try {
    sharesData.forEach(share =>{
      if(share.company_name == company_name.trim()){
        stagedShares.push({
          company_name,
          num_of_shares,
          buyer,
          date: new Date().toLocaleDateString()
        })
      }
    })
    const stagedFileContent = JSON.parse(fs.readFileSync("stagedShares.json", "utf-8"));
    stagedFileContent.push(...stagedShares)
    fs.writeFile("stagedShares.json", JSON.stringify(stagedFileContent), ()=>{
      console.log("Content written to file")
    })
    res.status(200).json({ message: `${num_of_shares} share(s) staged for purchase from ${company_name}` })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}




/*=============*/
/* Sell Shares */
/*=============*/
module.exports.sell_share = (req, res) =>{
  const { company_name } = req.body;
  let modifiedShares = [];
  
  let stagedShares = fs.readFileSync("stagedShares.json", "utf-8")

  try {
    sharesData.map(share =>{
      JSON.parse(stagedShares).forEach(item =>{
        if(share.company_name === company_name){
          if(item.company_name.trim() === company_name){
            share.avaliable_shares -= Number(item.num_of_shares);
            share.last_updated = new Date().toLocaleDateString();
            modifiedShares.push(share)
          }
          modifiedShares.push(share)
        }
        modifiedShares.push(share)
      })
    })
    // console.log(modifiedShares)
      fs.writeFile("shares.json", JSON.stringify(sharesData), ()=>{
        console.log("File written");
      });
      fs.writeFile("stagedShares.json", '[]', ()=>{
        console.log("Cleared file content");
      })
    res.status(201).json({ message: `All ${company_name} shares sucessfully sold`});
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}




/*=============================================*/
/* Finding a specific share based on crieteria */
/*=============================================*/
module.exports.find_share_on_crieterion = ( req, res ) =>{
  const { crieterion, value } = req.query
  try {
    let shareFound;
    JSON.parse(fs.readFileSync("shares.json", "utf-8")).map(share =>{
      share[crieterion] == value ? shareFound = share : null;
    })

    // fs.readFile("shares.json",{
    //   encoding: "utf-8",
    // }, (err, data)=>{
    //   res.locals.payload = JSON.stringify(data);
    //   res.render("list_shares.ejs")
    // })
    console.log(shareFound)
    // res.status(201).json(shareFound)
    res.locals.payload = JSON.stringify([shareFound]);
    res.render("list_shares.ejs")
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}




/*==============================================*/
/* Listing Share Offering With the Higest Price */
/*==============================================*/
module.exports.find_highest_share_price = (req, res) =>{
  const { currency } = req.query
  let highest_offer_share = [];
  try {
    const priceArr = [];
    JSON.parse(fs.readFileSync("shares.json", "utf-8")).forEach(share => {
      share.currency === currency ?
        priceArr.push(share.price) :
        null;
    })
    JSON.parse(fs.readFileSync("shares.json", "utf-8")).forEach(share =>{
      share.currency === currency ?
        share.price === Math.max(...priceArr) ? highest_offer_share.push(share) : null :
        null;
    })
    // res.status(200).json(highest_offer_share);
    res.locals.payload = JSON.stringify(highest_offer_share)
    res.render("list_shares.ejs");
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}





/*==============================================*/
/* Listing Share Offering With the Lowest Price */
/*==============================================*/
module.exports.find_lowest_share_price = (req, res) =>{
  const { currency } = req.query;
  try {
    let lowest_offer_share = [];
    const priceArr = [];
    JSON.parse(fs.readFileSync("shares.json", "utf-8")).forEach(share => {
      share.currency === currency ?
        priceArr.push(share.price) :
        null;
    })
    JSON.parse(fs.readFileSync("shares.json", "utf-8")).forEach(share =>{
      share.currency === currency ?
        share.price === Math.min(...priceArr) ? lowest_offer_share.push(share) : null :
        null;
    })
    // res.status(201).json(lowest_offer_share);
    res.locals.payload = JSON.stringify(lowest_offer_share)
    res.render("list_shares.ejs");
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}





/*===============================================*/
/* Listing Offers Within A Specified Price Range */
/*===============================================*/
module.exports.find_shares_in_range = (req, res) =>{
  const { lowerBound, upperBound, currency } = req.query;

  try {
    const sharesList = [];
    JSON.parse(fs.readFileSync("shares.json", "utf-8")).forEach(share =>{
      share.currency == currency ?
        share.price <= upperBound ?
          share.price >= lowerBound ?
            sharesList.push(share) :
          null :
        null :
      null;
    })
    // res.status(200).json(sharesList)
    res.locals.payload = JSON.stringify(sharesList)
    res.render("list_shares.ejs");
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}