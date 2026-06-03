const cloudinary= require("./cloudinary");

const uploadCloudDinary=(buffer,folder, publicId)=>{
    return new Promise((resolve, reject)=>{
        const uploadFile=cloudinary.UploadStream.upload_stream({
            folder:folder,
            public_id:publicId,
            trasformation:[
                {width: 500, height:500, crop:"fill", gravity: "face"}
            ]
        },
        (error, result)=>{
            if(error){
                reject(error)
            }else{
                resolve(result)
            }
        }
    )
})
}