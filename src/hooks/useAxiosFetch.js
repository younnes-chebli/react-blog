import axios from "axios"
import { useEffect, useState } from "react"

const useAxiosFetch = (dataURL) => {
    const [data, setData] = useState([])
    const [fetchError, setFetchError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let isMounted = true
        const source = axios.CancelToken.source()

        const fetchData = async (url) => {
            setIsLoading(true)
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                })
                if (isMounted) {
                    setData(response.data)
                    setFetchError(null)
                }
            } catch (error) {
                if (isMounted) {
                    setData([])
                    setFetchError(error.message)
                }
            } finally {
                isMounted && setIsLoading(false)
            }
        }

        fetchData(dataURL)

        return () => {
            isMounted = false
            source.cancel()
        }
    }, [dataURL])

    return { data, fetchError, isLoading }
}

export default useAxiosFetch