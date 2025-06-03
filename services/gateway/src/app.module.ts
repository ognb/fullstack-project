import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { IntrospectAndCompose, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ConfigModule } from './config/config.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule,
    HealthModule,

    // GraphQL Gateway with User Service Federation
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      useFactory: () => ({
        gateway: {
          buildService: ({ url }) => new RemoteGraphQLDataSource({ url }),
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              // 👤 User Service - NOW CONNECTED!
              { name: 'users', url: 'http://localhost:4002/graphql' },
            ],
          }),
        },
        server: {
          introspection: process.env.NODE_ENV !== 'production',
          playground: process.env.NODE_ENV !== 'production',
          context: ({ req }) => ({ req }),
        },
      }),
    }),
  ],
})
export class AppModule {}
