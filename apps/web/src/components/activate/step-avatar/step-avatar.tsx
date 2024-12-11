import Avatar from "../../shared/avatar/avatar";
import Button from "../../shared/button/button";
import { FaUpload } from "react-icons/fa6";
import FormError from "../../shared/form-error/form-error";
import FormLeft from "../../shared/form-left/form-left";
import FormWrapper from "../../shared/form-wrapper/form-wrapper";
import PageLoader from "../../shared/page-loader/page-loader";
import styles from "./step-avatar.module.css";
import useAvatarStep from "../../../hooks/auth-hooks/useAvatarStep";
const StepAvatar = () => {
	// TODO: Goggle images does not works properly when authenticate using images
	const { image, captureImage, error, isLoading, update, randomAvatars, setImage, setAvatarFile } = useAvatarStep();

	if (isLoading) return <PageLoader message='Activation in progress...' />;

	return (
		<FormWrapper isLoading={isLoading}>
			<FormLeft title='Profile Picture' description='Choose a profile icon below or upload your favorite.'>
				<div className={styles.avatarContainer}>
					{randomAvatars.map((avatar, index) => (
						<Avatar
							key={index}
							className={`${styles.avatars} ${avatar !== image && styles.avatarBorder}`}
							imageUrl={avatar}
							alt='avatar'
							onClick={() => {
								setImage(avatar);
								setAvatarFile(avatar);
							}}
						/>
					))}
				</div>
			</FormLeft>
			<form className={styles.formContainer}>
				<FormError message={error?.message ?? ""} description={error?.message} />
				<input onChange={captureImage} id='avatarInput' type='file' className={styles.avatarInput} accept='image/png, image/jpeg, image/gif' />
				<label className={styles.avatarLabel} htmlFor='avatarInput'>
					<div className={styles.avatarWrapper}>
						<img className={styles.avatarImage} src={image?.toString()} alt='avatar' />
						<Button className={styles.uploadButton}>
							<span>{"Choose New"}</span>
							<FaUpload className={styles.actionIcon} />
						</Button>
					</div>
				</label>
			</form>
		</FormWrapper>
	);
};

export default StepAvatar;
