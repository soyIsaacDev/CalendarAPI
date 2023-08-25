const server = require("express").Router();
const sendPushNotification = require("../middleware/PushNotifications")




server.post("/send_notification", function (req, res) {
  const { title, body, data, to } = req.body
  /* if (to === "all") {
    Token.find({}, (err, allTokens) => {
      if (err) {
        res.statusCode = 500
        res.send(err)
      }

      const tokens = allTokens.map(token => {
        return token.tokenValue
      })

      sendPushNotification(tokens, title, body, data)
      res.send({ status: "success" })
    })
  } else { */
    sendPushNotification([to], title, body, data)
    res.send({ status: "success" })
  //}
})

/* server.get("/all_tokens", function (req, res) {
  Token.find({}, (err, allTokens) => {
    if (err) {
      res.statusCode = 500
      res.send(err)
    }
    res.send(
      allTokens.map(token => {
        // remove unnecessary fields
        return { value: token.tokenValue }
      })
    )
  })
}) */

module.exports = {
    NotificationRoute: server
  }
