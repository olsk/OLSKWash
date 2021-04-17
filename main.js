const mod = {

	_OLSKWashGlobalKeys () {
		return [
			'fbclid',
			'gclid',
			'igshid',
		];
	},

	_OLSKWashDomainKeys () {
		return {
			'spotify.com': 'si',
		};
	},

	OLSKWash (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		const url = new URL('', inputData);
		
		(function (entries) {
			if (!entries.length) {
				return;
			}

			const query = entries.filter(function ([key, value]) {
				return !mod._OLSKWashGlobalKeys().includes(key) && !Object.entries(mod._OLSKWashDomainKeys()).filter(function ([domain, param]) {
					return url.hostname.includes(domain) && (param === key);
				}).length;
			}).map(function (e) {
				return e.join('=');
			}).join('&');

			url.search = query ? '?' + query : '';
		})(Array.from((new URLSearchParams(url.search.replace(/\?/, ''))).entries()));

		return url.toString();
	},

};

Object.assign(exports, mod);
