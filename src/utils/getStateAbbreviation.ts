import { states } from '../constants/USStates'

export const getStateAbbreviation = (state: string) => {
	const stateAbrev = states[state as 'Florida']

	if (stateAbrev) return stateAbrev
	return state
}
