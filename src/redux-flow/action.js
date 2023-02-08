export const handleLoginWithGoogle = (data) => {
    return {
        type: 'robin/gooleLogin',
        payload: data
    }
}