const configurations = {
    BACKEND_BASE_URL: import.meta.env.VITE_BACKEND_BASE_URL,
    API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT)
}

export default configurations;