//install an drequire cloudinary
const cloudinary = require("cloudinary");

//config
cloudinary.config({ 
	cloud_name: 'dr3go9a12', 
	api_key: '541293648117987', 
	api_secret: 'An2yGibXEserqgPK-sx4UOXD9cQ' 
  });

exports.uploadImage = async (req, res) => {
	console.log("Getting the response, HELLO World!!");

	console.log("REQ BODY FROM IMAGE", req);
	let result = await cloudinary.uploader.upload(req.body.image, {
		public_id: `${Date.now()}`, // public id is visible to public when we retrive the data
		resource_type: "auto", // auto : all file type : jpeg/png
	});

	//send response
	res.json({
		public_id: result.public_id,
		url: result.secure_url,
	});
};

//remove Image From cloudinary
exports.removeImage = async (req, res) => {
	let image_id = req.body.public_id;

	cloudinary.uploader.destroy(image_id, (err, result) => {
		if (err) return res.json({ success: false, err });
		res.send({ ok: true });
	});
};
