import { Channel } from 'amqplib';

interface ConfigOptions {
    maxRetries?: number;
    delaySeconds?: number;
}

/**
 * Configures the retry options for connecting to RabbitMQ.
 * @param options - An object containing the configuration options.
 */
export function config(options?: ConfigOptions): void;

/**
 * Connects to RabbitMQ with retry logic.
 * @param url - The URL of the RabbitMQ server.
 * @returns A promise that resolves to a RabbitMQ channel.
 */
export function connectToRabbitMQ(url: string | undefined): Promise<Channel>;
