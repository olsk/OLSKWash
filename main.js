const mod = {

	_OLSKWashGlobalKeys () {
		return [
			'fbclid',
			'gclid',
			'twclid',
			'igshid',
			'igsh',
			'utm_source',
			'utm_medium',
			'utm_campaign',
			'mibextid',
		];
	},

	_OLSKWashDomainKeys () {
		return {
			'spotify.com': [	
				'si',
				'_branch_referrer',
				'_branch_match_id',
				'$full_url',
			],
			'twitter.com': [	
				's',
			],
			'youtube.com': [	
				'pp',
			],
		};
	},

	OLSKWash (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		const url = new URL(inputData);

		(function (entries) {
			if (!entries.length) {
				return;
			}

			const query = entries.filter(function ([key, value]) {
				return !mod._OLSKWashGlobalKeys().includes(key) && !Object.entries(mod._OLSKWashDomainKeys()).filter(function ([domain, params]) {
					return params.filter(e => url.hostname.includes(domain) && (e === key)).length;
				}).length;
			}).map(function (e) {
				return e.join('=');
			}).join('&');

			url.search = query ? '?' + query : '';
		})(Array.from(new URLSearchParams(url.search.replace(/\?/, ''))));

		return url.toString();
	},

};

Object.assign(exports, mod);
