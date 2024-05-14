import amqp from 'amqplib';

let channel;
let configOptions = {
    maxRetries: 6,
    delaySeconds: 2
};

function config(options = {}) {
    configOptions = {
        ...configOptions,
        ...options
    };
}

async function connectToRabbitMQ(url) {
    if (channel) {
        return channel;
    }

    const { maxRetries, delaySeconds } = configOptions;
    let retryCount = 0;

    while (retryCount < maxRetries) {
        console.log(`Connecting to RabbitMQ (Attempt ${retryCount + 1} of ${maxRetries})...`);

        try {
            const connection = await amqp.connect(`amqp://${url}`);
            channel = await connection.createChannel();
            console.log(`Connection to RabbitMQ established`);
            return channel;
        } catch (error) {
            console.error('Error connecting to RabbitMQ:', error);
            retryCount += 1;
            const delay = delaySeconds * retryCount;
            console.log(`Retrying in ${delay} seconds...`);
            await new Promise(resolve => setTimeout(resolve, delay * 1000));
        }
    }

    throw new Error('Failed to connect to RabbitMQ after max retry attempts.');
}

export { connectToRabbitMQ, config };
