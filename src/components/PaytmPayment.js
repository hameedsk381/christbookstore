import https from 'https';



const initiatePaytmTransaction = (orderId, amount, callbackUrl) => {
    const paytmParams = {
        body: {
            requestType: 'Payment',
            mid: 'SDiupP11536491306331',
            websiteName: 'WEBSTAGING',
            orderId: orderId,
            callbackUrl: callbackUrl,
            txnAmount: {
                value: amount,
                currency: 'INR',
            },
            userInfo: {
                custId: 'CUST_001',
            },
        },
    };

    return PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "YOUR_MERCHANT_KEY")
        .then(checksum => {
            paytmParams.head = {
                signature: checksum
            };

            const post_data = JSON.stringify(paytmParams);

            const options = {
                hostname: 'securegw-stage.paytm.in', // Use the staging URL for testing
                port: 443,
                path: '/theia/api/v1/initiateTransaction',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': post_data.length
                }
            };

            return new Promise((resolve, reject) => {
                const post_req = https.request(options, post_res => {
                    let response = '';
                    post_res.on('data', chunk => {
                        response += chunk;
                    });
                    post_res.on('end', () => {
                        resolve(response);
                    });
                });

                post_req.on('error', err => {
                    reject(err);
                });

                post_req.write(post_data);
                post_req.end();
            });
        });
};

export default initiatePaytmTransaction;
