export default interface Tasks {
	_id: Key | null | undefined;
	id: number;
	title: string;
	userId: number;
	status: string;
	createdAt: string;
}
