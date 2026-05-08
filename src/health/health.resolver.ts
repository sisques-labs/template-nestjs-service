import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HealthResolver {
  @Query(() => String, { name: 'health', description: 'Service liveness probe' })
  health(): string {
    return 'ok';
  }
}
