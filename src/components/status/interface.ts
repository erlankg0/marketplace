export interface IStatus {
    status: 'done' | 'processing' | 'waiting' | 'send' | 'checking' | string;
}