const { response } = require('express');
const redis = require('redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6379,
});

// Event listener for errors
client.on('error', (error) => {
    console.log('Redis client error occurred', error);
});

async function tesAdditionalFeatures() {
    try {
        await client.connect();

        // const subscriber = client.duplicate();
        // await subscriber.connect() // connect to redis server for the subscriber

        // await subscriber.subscribe('dummy-channel', (message, channel)=> {
        //     console.log(`Received message from ${channel}: ${message}`)
        // });

        // //publish message to the dummy channel
        // await client.publish('dummy-channel', 'Some dummy data from publisher');
        // await client.publish('dummy-channel', 'Some new message from publisher');

        // await new Promise((resolve)=> setTimeout(resolve, 1000));

        // await subscriber.unsubscribe('dummy-channel');
        // await subscriber.quit() //close the subscriber connection


        //pipelining & transactions
        const multi = client.multi();

        multi.set('key-transaction1', 'value1');
        multi.set('key-transaction2', 'value2');
        multi.get('key-transaction1');
        multi.get('key-transaction2');

        const results = await multi.exec();
        console.log(results)

        // pipelining allows you to sent multipile commands to the redis server in one
        // go without waiting for each other response
        const pipeline = client.multi();
        multi.set('key-pipeline1', 'value1');
        multi.set('key-pipeline2', 'value2');
        multi.get('key-pipeline1');
        multi.get('key-pipeline2');
        const pipelineresults = await pipeline.exec();
        console.log(pipelineresults)

    }catch(e){
        console.error(e);
    }finally {
        client.quit();
    }
}

tesAdditionalFeatures();
