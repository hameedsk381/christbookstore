const PaytmChecksum = {
    generateSignature: async (params, key) => {
        const orderedParams = {};
        Object.keys(params).sort().forEach(key => {
            orderedParams[key] = params[key];
        });

        const paramString = Object.keys(orderedParams).map(key => `${key}=${orderedParams[key]}`).join('&');
        
        const encoder = new TextEncoder();
        const data = encoder.encode(paramString);
        const keyBuffer = encoder.encode(key);

        const signature = await window.crypto.subtle.importKey(
            'raw',
            keyBuffer,
            { name: 'HMAC', hash: { name: 'SHA-256' } },
            false,
            ['sign']
        ).then(key => {
            return window.crypto.subtle.sign('HMAC', key, data);
        }).then(signature => {
            return Array.from(new Uint8Array(signature)).map(byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('');
        });

        return signature;
    }
};

export default PaytmChecksum;


