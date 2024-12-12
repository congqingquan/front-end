export default interface ModalFormProps<T> {
    type: 'ADD' | 'UPDATE',
    initData?: T,
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}