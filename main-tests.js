const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

describe('_OLSKWashGlobalKeys', function test__OLSKWashGlobalKeys() {

	it('returns array', function () {
		deepEqual(mod._OLSKWashGlobalKeys(), [
			'fbclid',
			'gclid',
			'igshid',
			'igsh',
			'utm_source',
		]);
	});

});

describe('_OLSKWashDomainKeys', function test__OLSKWashDomainKeys() {

	it('returns array', function () {
		deepEqual(mod._OLSKWashDomainKeys(), {
			'spotify.com': [
				'si',
			],
			'youtube.com': [
				'pp',
			],
		});
	});

});

describe('OLSKWash', function test_OLSKWash() {

	it('throws if not string', function () {
		throws(function () {
			mod.OLSKWash(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns inputData', function () {
		const item = uLink();
		deepEqual(mod.OLSKWash(item), item);
	});

	it('preserves hash', function () {
		const item = uLink() + '#alfa' + Math.random().toString();
		deepEqual(mod.OLSKWash(item), item);
	});

	context('_OLSKWashGlobalKeys', function () {
		
		mod._OLSKWashGlobalKeys().forEach(function (e) {
			
			it('scrubs ' + e, function () {
				const flag = uRandomElement(true, false)
				const item = uLink() + (flag ? '?alfa=bravo' : '');
				deepEqual(mod.OLSKWash([item, flag ? '&' : '?', e + '=', Math.random().toString()].join('')), item);
			});

		});
	
	});

	context('_OLSKWashDomainKeys', function () {
		
		Object.entries(mod._OLSKWashDomainKeys()).forEach(function ([key, value]) {
			
			it('scrubs ' + value, function () {
				const flag = uRandomElement(true, false)
				const link = `https://${ flag ? Math.random().toString() + key : 'example.com' }/playlist/1wkrgUQ6LcTCtpdCvtKjaj`;
				const item = '?' + value + '=' + Math.random().toString();
				deepEqual(mod.OLSKWash([link, item].join('')), link + (flag ? '' : item));
			});

		});
	
	});

});
