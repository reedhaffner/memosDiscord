const { memosDomain, memosKey } = require('./settings');

const axios = require('axios');
const { resolve } = require('path');

module.exports = {
  
  async getMemos() {
    const retries = 3;
    var response;
    try {
      for (var i=0; i<retries; i++){
        try {
          response = await axios.get(memosDomain+"/api/memo?openId="+memosKey)
          if(response) break;
        } catch (err) {
          console.log("Failed getting memos... retrying...")
        }
      }
    } catch (err) {
        console.log("Failed after 3 tries")
        console.log(err)
    }

    return response.data
  },

  async setArchived(id, archive) {
    const retries = 3;
    var response;
    try {
      for (var i=0; i<retries; i++){
        try {
          if(archive){
            response = await axios.patch(memosDomain+"/api/memo/"+id+"?openId="+memosKey,
            {
              "rowStatus": "ARCHIVED"
            })
          } else {
            response = await axios.patch(memosDomain+"/api/memo/"+id+"?openId="+memosKey,
            {
              "rowStatus": "NORMAL"
            })
          }
          if(response) break;
        } catch (err) {
          console.log("Failed patching memos... retrying...")
        }
        
      }
    } catch (err) {
        console.log("Failed after 3 tries")
        console.log(err)
    }
  }

}
