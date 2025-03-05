const redis = require('redis');

const client = redis.createClient({
    host: 'localhost',
    port: 6379, // corrected from 'post'
});

// Event listener for errors
client.on('error', (error) => {
    console.log('Redis client error occurred', error);
});


async function redisDataStructure(){
    try{
        await client.connect();

        // Strings -> SET, GET, MSET, MGET

        await client.set('user:name', 'James');
        const name = await client.get('user:name');
        // console.log(name);

        await client.mSet(['user:email', 'james@aol.com', 'user:age', '80']);
        const [emai, age] = await client.MGET(['user:email', 'user:age']);
        // console.log(emai, age)


        ///// List -> LPUSH, RPUSH, LRAMGE, LPOP, RPOP 
        // await client.lPush('notes', ['note 1', 'note 2', 'note 3']);
        // const extractAllNotes = await client.lRange('notes', 0, -1);
        // console.log(extractAllNotes);

        // const firstNote = await client.lPop('notes');
        // console.log(firstNote);

        ///// Sets --> SADD, SMEMBERS, SISMEMBER, SREM
        // await client.sAdd('user:nickName', ['john', 'varun', 'xyz']);
        // const extractUserNick = await client.sMembers('user:nickName');
        // console.log(extractUserNick);

        // const isMember = await client.sIsMember('user:nickName', 'varun');
        // console.log(isMember);
        // const removeMember = await client.sRem('user:nickName', 'xyz');
        // const updatedNickNames = await client.sMembers('user:nickName');
        // console.log(updatedNickNames);


        //// Sorted Sets: -->>  ZADD, ZRANGE, ZRANK, ZREM
        // await client.zAdd('cart', [
        //     {
        //         score: 100, value: 'Cart 1'
        //     },
        //     {
        //         score: 150, value: 'Cart 2'
        //     },
        //     {
        //         score: 10, value: 'Cart 3'
        //     }
        // ]);
        // const getCartItems = await client.zRange('cart', 0, -1);
        // console.log(getCartItems)

        // const extractAllCartWithScore = await client.zRangeWithScores('cart', 0, -1)
        // console.log(extractAllCartWithScore)

        // const cartTwoRank = await client.zRank('cart', 'Cart 2');
        // console.log(cartTwoRank)


        /// Hashes --> HSET, HGET. HGETALL, HDEL
        await client.hSet('product:1', {
            name: 'Product 1',
            description: 'product one description',
            rating: "5",
        });

        const getProductRating = await client.hGet('product:1', 'rating');
        console.log(getProductRating);

        const getProductDetails = await client.hGetAll('product:1');
        console.log(getProductDetails)

        await client.hDel('product:1', 'rating');

        const updatedProductDetail = await client.hGetAll('product:1');
        console.log(updatedProductDetail)

    } catch(e){
        console.error(e)
    } finally {
        client.quit()
    }
}

redisDataStructure();