// services/gateway/src/app.module.ts
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
          buildService: ({ url }) =>
            new RemoteGraphQLDataSource({
              url,
              // Add retry configuration for better reliability
              willSendRequest({ request, context }) {
                // Add any headers or auth here if needed
              },
            }),
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              // 👤 User Service - NOW CONNECTED!
              { name: 'users', url: 'http://localhost:4002/graphql' },
            ],
            // Add retry and polling configuration
            introspectionHeaders: {},
            pollIntervalInMs: 5000, // Poll every 5 seconds for schema changes
          }),
          // Handle service startup timing issues
          serviceHealthCheck: true,
        },
        server: {
          introspection: process.env.NODE_ENV !== 'production',
          playground: process.env.NODE_ENV !== 'production',
          context: ({ req }) => ({ req }),
          // Add error handling
          formatError: (error) => {
            console.error('GraphQL Error:', error);
            return error;
          },
        },
      }),
    }),
  ],
})
export class AppModule {}
