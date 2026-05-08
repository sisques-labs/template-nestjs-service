import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_CLIENT_TOKEN } from './kafka.constants';

@Injectable()
export class KafkaProducerService {
  private readonly logger = new Logger(KafkaProducerService.name);

  constructor(
    @Inject(KAFKA_CLIENT_TOKEN) private readonly client: ClientKafka,
  ) {}

  emit<T>(topic: string, message: T): void {
    this.logger.debug(`Emitting to topic "${topic}"`);
    this.client.emit(topic, message);
  }
}
