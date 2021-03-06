var Stratum = require('./');

var bitcoin = {
    "name": "BitcoinTest",
    "symbol": "BTCT",
    "peerMagic": "0B110907" //optional
};

var pool = Stratum.createPool({

    "coin": bitcoin,

    "auxes":[{
        "name": "NamecoinTest",
        "symbol": "NMCT",
        "daemons": [{
            "host": "127.0.0.1",
            "port": 18336,
            "user": "namecoinrpc",
            "password": "123"
        }],
    }],

    "address": "n3dgGNBmxfxm4g9knP8AaYMfqFjfngiV93",

    "rewardRecipients": {
    },

    "blockRefreshInterval": 1000,
    "jobRebroadcastTimeout": 55,
    "connectionTimeout": 600,
    "emitInvalidBlockHashes": false,
    "tcpProxyProtocol": false,
    "banning": {
        "enabled": true,
        "time": 600,
        "invalidPercent": 50,
        "checkThreshold": 500,
        "purgeInterval": 300
    },
    "ports": {
        "3032": {
            "diff": 1024,
            "varDiff": {
                "minDiff": 1024,
                "maxDiff": 65536,
                "targetTime": 15,
                "retargetTime": 90,
                "variancePercent": 30
            }
        }
    },
    "daemons": [
        {
            "host": "127.0.0.1",
            "port": 18332,
            "user": "bitcoinrpc",
            "password": "something"
        }
    ],
    "p2p": {
        "enabled": false,
        "host": "127.0.0.1",
        "port": 8333,
        "disableTransactions": true
    }

}, function(ip, port , workerName, password, callback){
    console.log("Authorize " + workerName + ":" + password + "@" + ip);
    callback({
        error: null,
        authorized: true,
        disconnect: false
    });
});

pool.on('share', function(isValidShare, isValidBlock, data){
    if (isValidShare)
        console.log('Valid share submitted');
    else if (data.blockHash)
        console.log('We thought a block was found but it was rejected by the daemon');
    else
        console.log('Invalid share submitted')

    console.log('share data: ' + JSON.stringify(data));
});

pool.on('block', function(coin, height, blockHash, txHash, blockReward) {
    console.log('Mined block on ' + coin + ' network!');
    console.log('HEIGHT: ' + height);
    console.log('HASH: ' + blockHash);
    console.log('TX: ' + txHash);
    console.log('REWARD: ' + blockReward);
});

pool.on('auxblock', function(coin, height, blockHash, txHash) {
    console.log('Mined auxillary block on ' + coin + ' network!');
    console.log('HEIGHT: ' + height);
    console.log('HASH: ' + blockHash);
    console.log('TX: ' + txHash);
});

pool.on('log', function(severity, logText){
    console.log('[' + severity + '] ' + logText);
});


pool.start();

