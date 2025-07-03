

export const useGetWaterflows = () => {
    const getWaterflows = async (user_id) => {
        if(!user_id) return;

        try {
            const response = await fetch('https://x3wq0k4r-3000.usw3.devtunnels.ms/info-waterflow', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user_id})
            });

            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return { getWaterflows }
}