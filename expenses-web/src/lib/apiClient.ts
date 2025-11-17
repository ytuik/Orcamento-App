import axios, {type AxiosResponse} from "axios";

const apiClient = axios.create(
    {
        baseURL: "http://localhost:8585",
        timeout: 5000,
        headers: {
            "Content-Type": "application/json",
        },
    });

apiClient.interceptors.request.use( config => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }, error => Promise.reject(error)
);

export const apiRequest = async <T>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    data?: any
): Promise<T> => {
    const response: AxiosResponse<T> = await apiClient({
        url,
        method,
        data,
    });
    
    return response.data;
}