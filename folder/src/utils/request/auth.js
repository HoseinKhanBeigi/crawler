import { getCookie } from '../index';

export const Authorization = () => `Bearer ${getCookie('access_token')}`;
