import { CollectionConfig } from 'payload/types';
import admins from './access/admins';
import adminsAndUser from './access/adminsAndUser';
import { callRevalidate } from './hooks/revalidate';

export const Artigos: CollectionConfig = {
  slug: 'artigos',
  labels: {
    singular: 'Artigo',
    plural: 'Artigos',
  },
  defaultSort: 'updatedAt',
  admin: {
    useAsTitle: 'conteudo.titulo',
    defaultColumns: ['id', 'conteudo.titulo', 'updatedAt'],
  },
  hooks: {
    beforeChange: [
      async ({ req, data }) => {
        if (req.user) {
          data.lastModifiedBy = req.user.id;
          data.lastModifiedById = req.user.id;
        }
        data.lastModifiedAt = new Date().toISOString();

        if (data.lastModifiedAt) {
          const date = new Date(data.lastModifiedAt);
          const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
          data.lastModifiedDisplay = `${req.user.name} ${req.user.lastname} - ${formattedDate}`;
        }

        return data;
      },
    ],
    afterChange: [
      async ({ req, doc, operation }) => {
        doc.pagina = `/blog/${doc.slug}`;
        await callRevalidate({ req, doc });


      },
    ],
   
  },
  fields: [
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'URL amigável para o artigo.',
      },
      access: {
        update: admins,
      },
    },
    {
      name: 'publicado',
      label: 'Data de Publicação',
      type: 'date',
      required: true,
      defaultValue: new Date().toISOString(),
      admin: {
        position: 'sidebar',
        description: 'Data de publicação do artigo.',
        date: {
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },
    {
      name: 'autor',
      label: 'Autor',
      type: 'relationship',
      relationTo: 'usuarios',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Autor do artigo.',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          label: 'Tag',
          type: 'text',
        },
      ],
      required: false,
      admin: {
        position: 'sidebar',
        description: 'Tags associadas ao artigo.',
      },
    },
    {
      name: 'conteudo',
      label: 'Conteúdo',
      type: 'group',
      fields: [
        {
          name: 'titulo',
          label: 'Título',
          type: 'text',
          required: true,
          admin: {
            description: 'O título do artigo.',
          },
        },
        {
          name: 'resumo',
          label: 'Resumo',
          type: 'textarea',
          required: false,
          admin: {
            description: 'Resumo ou descrição curta do artigo.',
          },
        },

        {
          name: 'conteudo',
          label: 'Conteúdo',
          type: 'textarea',
          required: true,
          admin: {
            description:
              'Conteúdo principal do artigo, com suporte a texto formatado, imagens, etc.',
          },
        },

        {
          name: 'imagemDestacada',
          label: 'Imagem Destacada',
          type: 'upload',
          relationTo: 'imagens',
          required: true,
          admin: {
            description: 'Imagem principal destacada do artigo.',
          },
        },
        {
          name: 'categorias',
          label: 'Categorias',
          type: 'relationship',
          relationTo: 'categorias',
          hasMany: true,
          required: true,
          admin: {
            description: 'Categorias às quais o artigo pertence.',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'metaTitle',
          label: 'Meta Título',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
            description: 'Título otimizado para SEO.',
          },
        },
        {
          name: 'metaDescription',
          label: 'Meta Descrição',
          type: 'textarea',
          required: false,
          admin: {
            width: '50%',
            description: 'Descrição otimizada para SEO.',
          },
        },

        {
          name: 'ogTitle',
          label: 'Título Open Graph',
          type: 'text',
          required: false,
          admin: {
            width: '50%',
            description: 'Título para pré-visualização ao compartilhar nas redes sociais.',
          },
        },
        {
          name: 'ogDescription',
          label: 'Descrição Open Graph',
          type: 'textarea',
          required: false,
          admin: {
            width: '50%',
            description: 'Descrição para pré-visualização ao compartilhar nas redes sociais.',
          },
        },
        {
          name: 'ogImage',
          label: 'Imagem Open Graph',
          type: 'upload',
          relationTo: 'imagens',
          required: false,
          admin: {
            description: 'Imagem para pré-visualização ao compartilhar nas redes sociais.',
          },
        },
      ],
    },
    {
      name: 'lastModifiedBy',
      type: 'relationship',
      relationTo: 'usuarios',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'lastModifiedById',
      type: 'number',
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
    {
      name: 'lastModifiedAt',
      type: 'date',
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
    {
      name: 'lastModifiedDisplay',
      label: 'Última modificação',
      type: 'text',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
  access: {
    read: () => true,
    create: adminsAndUser,
    update: adminsAndUser,
    delete: adminsAndUser,
  },
};
