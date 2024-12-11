import fileExtension from "file-extension";
import multer from "multer";
import multerS3 from "multer-s3";
import s3Client from "../aws_config";
import { v4 as uuidv4 } from "uuid";

const allowedImage = ["image/png", "image/jpeg"];
const imageError = "Limited file types allowed - only .png, .jpeg";

const multerObj = multer({
	fileFilter: (req, file, cb) => {
		let { mimetype } = file;
		if (allowedImage.includes(mimetype)) {
			cb(null, true);
		} else {
			cb(new multer.MulterError(imageError));
		}
	},
	limits: {
		fileSize: 1024 * 1024 * 8, // 8mb
	},
	storage: multerS3({
		s3: s3Client,
		bucket: "edudoor-jobseeker",
		acl: "public-read",
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			const { fieldname, originalname } = file;
			const extension = fileExtension(originalname);
			cb(null, `profile/${req.id}/${Date.now().toString()}-${uuidv4()}.${extension}`);
		},
	}),
});

export default multerObj;
