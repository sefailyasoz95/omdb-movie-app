import { toast } from "react-toastify";

type ToastParams = {
	message: string;
	type: "error" | "success" | "warning";
};
const useToast = () => {
	const showToast = ({ message, type }: ToastParams) => {
		toast[type](message);
	};

	return { showToast };
};

export default useToast;
