export interface ModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	onClose?: () => void;
}