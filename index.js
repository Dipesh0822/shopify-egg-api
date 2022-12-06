const express = require('express')
const cors = require("cors")
const router = express.Router();
const app = express()
const port = 8013

async function getstuff(req, res) {
  let qrcode = Date.now();
  let img = 1;
  let ani = 1;
  let success = false;
  /**
   * response = post.getqrCodes(     
                                  user_session
                                  current_page_url
                                  extra_data
                              )
  
   */
  let bodyStuff = JSON.stringify(req.body);
  console.log("bodyStuff=" + bodyStuff);
  let queryStuff = JSON.stringify(req.query);
  if (!bodyStuff)
    bodyStuff = "";
  if (!queryStuff)
    queryStuff = "";
  bodyStuff = queryStuff + bodyStuff;
  if (bodyStuff.toUpperCase().indexOf("TABLET") != -1) {
    img = 3;
    ani = 3;
    success = true;
  } else if (bodyStuff.toUpperCase().indexOf("APPLE") != -1) {
    img = 1;
    ani = 1;
    success = true;
  } else if (bodyStuff.toUpperCase().indexOf("POTATO") != -1) {
    img = 2;
    ani = 2;
    success = true;
  } else if (bodyStuff.toUpperCase().indexOf("THIS_TEXT_WILL_TRIGGER_PRIZE") != -1) {
    img = 4;
    ani = 4;
    success = true;
  } else {
    qrcode = undefined;
    img = undefined;
    ani = undefined;
    success = false;
  }
  let app_url = "https://mars.boomio.com/openme/coupon_code=" + qrcode;
  let img_url = "https://boomio.s3.amazonaws.com/campaign_assets/g_ww_boomiodownload.png";
  let won_text = "You won someting ! Scan me with boommio!";
  let desc = "or click to open with app";
  let explanation_of_rules = "Currently any query or body in post or get containing 'apple' or 'potato' will win ";
  let result = { explanation_of_rules, qrcode, img, ani, success };
  if (success) {
    result.app_url = app_url;
    result.img_url = img_url;
    result.won_text = won_text;
    result.desc = desc;
  }
  result.original_request = req.body;
  return res.status(200).send(result);
}
router.get('/', (req, res) => {
  return getstuff(req, res);
})
router.post('/', (req, res) => {
  return getstuff(req, res);
})
router.get('/get-qr-code', (req, res) => {
  return getstuff(req, res);
})
router.post('/get-qr-code', (req, res) => {
  return getstuff(req, res);
})
router.post("/handle", (request, response) => {
  //code to perform particular action.
  //To access POST variable use req.body()methods.
  return getstuff(request, response);
  ///  console.log(request.body);
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/", router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})