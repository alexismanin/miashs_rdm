'use strict'

const { fetch } = require('fetch-ponyfill')()
const { stringify } = require('query-string')

const endpoint = 'https://api.flixbus.com/mobile/v1/'
const request = async (route, headers = {}, query = {}) => {
	query = stringify(query)
	const res = await fetch(`${endpoint}${route}?${query}`, { headers })
	if (!res.ok) {
		const error = new Error(res.statusText)
		error.statusCode = res.status
		throw error
	}
	return res.json()
}

module.exports = request
