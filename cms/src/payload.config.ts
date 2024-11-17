import path from 'path';

import { postgresAdapter } from '@payloadcms/db-postgres';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { slateEditor } from '@payloadcms/richtext-slate';
import { buildConfig } from 'payload/config';
import {
  Artigos,
  Branding,
  Categorias,
  Contatos,
  Cores,
  Depoimentos,
  Empreendimentos,
  Imagens,
  Links,
  Listas,
  Paginas,
  Sedes,
  Seo,
  Textos,
  Usuarios,
} from './collections';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { PayloadRequest } from 'payload/types';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  collections: [
    Artigos,
    Branding,
    Categorias,
    Contatos,
    Cores,
    Depoimentos,
    Empreendimentos,
    Links,
    Listas,
    Paginas,
    Sedes,
    Seo,
    Textos,
    Imagens,
    Usuarios,
  ],
  admin: {
    bundler: webpackBundler(),
    user: Usuarios.slug,
    webpack: config => {
      if (config.module && config.module.rules) {
        config.module.rules.push({
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        });
      }
      return config;
    },
  },


  editor: slateEditor({}),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  cors: ['*'], // Permite solicitações de qualquer origem
  csrf: ['*'], // Permite solicitações de qualquer origem
  db: postgresAdapter({
    pool: {
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      ssl: process.env.POSTGRES_SSL === 'true' ? { rejectUnauthorized: false } : false,
      max: 10,
      connectionTimeoutMillis: 30000,
      idleTimeoutMillis: 10000,
    },
  }),
  localization: {
    locales: ['en', 'pt'],
    defaultLocale: 'pt',
    fallback: true,
  },
  rateLimit: {
    window: 900000, // 15 minutos
    max: Number.MAX_SAFE_INTEGER, // Define um valor muito alto para desabilitar a limitação
    skip: (req: PayloadRequest) => true, // Ignora a limitação de taxa para todas as solicitações
    trustProxy: true,
  },
});
