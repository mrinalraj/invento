import { useEffect, useReducer } from 'react'

export const useCustomState = initialState => {
	const [state, dispatch] = useReducer((prevState, newState) => {
		return { ...prevState, ...newState }
	}, {})

	useEffect(() => {
		dispatch(initialState)
	}, [initialState])

	return [state, dispatch]
}
