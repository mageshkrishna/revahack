let threads = require('../Model/threads');
let threadreply = require("../Model/threadreply");
let threadsreply = require('../Model/threadreply')
async function createthreads(req,res){
    let{category,email,landmark,image,bill,location,heading} = req.body;
    try{
        let thread = new threads({category,email,landmark,image,bill,location,heading});
        await thread.save();
        return res.status(200).json({status:"true",thread})
    }
    catch(err){
        return res.status(404).json({status:"false"});
    }
}
async function createthreadsreply(req,res){
    let{threads_id,loginuser_id,deliverystatus,deal,replymessage}= req.body;
    try{
        let newthreadreply = new threadsreply({threads_id,loginuser_id,deliverystatus,deal,replymessage})
        const savedThreadReply = await newthreadreply.save(); 
            await threads.findByIdAndUpdate(threads_id, { $push: { threadsreply: savedThreadReply._id } });

        return res.status(200).json({status:"true"})
    }
    catch(err){
        return res.status(404).json({status:"false"});
    }
}

// async function getreplydata(req, res) {
//     try {
//       const thread = await threads
//         .findOne({ _id: '6538bf78a09a77bcf3495de0' })
//         .populate('threadsreply') // assuming 'threadsreply' is the field to be populated
//         .exec();
  
//       console.log('Populated Thread Data:', thread);
//       return res.status(200).json({ status: "true" });
//     } catch (err) {
//       console.error('Error:', err);
//       return res.status(500).json({ status: "false" });
//     }
//   }

  async function getuserthreads(req,res){
    let {location,category} = req.body;
    try{
       const result = await threads.find({location:location,category:category})
       return res.status(200).send(result)
    }
    catch(err){
      return res.status(400)
    }
  }
async function getreplydata(req, res) {
    let {threads_id}=req.body;
    console.log(threads_id);
    try {
      const thread = await threads
        .findOne({ _id: threads_id })
        .populate({
          path: 'threadsreply',
          populate: [
            // { path: 'threads_id', model: 'threads' }, // assuming 'threads' is the model for threads
            { path: 'loginuser_id', model: 'userlogin' } // assuming 'loginuser' is the model for login users
          ]
        })
        .exec();
        // const threadreply = await threadsreply.find({
        //   threads_id:threads_id});
      console.log('Populated thread Data:', thread);
      return res.status(200).json({status:"true",thread});
    } catch (err) {
      console.error('Error:', err);
      return res.status(500).json({ status: "false" });
    }
  }
  
  
module.exports={createthreads,createthreadsreply,getreplydata,getuserthreads}