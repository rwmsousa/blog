import { CollectionConfig } from "payload/types";
import admins from './access/admins';
import { RowLabelArgs } from "payload/dist/admin/components/forms/RowLabel/types";
import adminsAndUser from "./access/adminsAndUser";

export const Seo: CollectionConfig = {
  slug: 'seo',
  labels: {
    singular: 'SEO',
    plural: 'SEO',
  },
  admin: {
    useAsTitle: 'referencia',
    defaultColumns: ['id', 'referencia', 'updatedAt'],
    group: 'Componentes',
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
  
  },
  fields: [
    {
      name: 'referencia',
      label: 'Referência',
      type: 'text',
      required: true,
      access: {
        update: admins,
      },
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
      name: 'keywords',
      label: 'Palavras-chave',
      type: 'array',
      required: false,
      admin: {
        width: '25%',
        initCollapsed: true,
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.keyword || `Keyword ${String(index).padStart(2, '0')}`;
          },
        },
      },
      fields: [
        {
          name: 'keyword',
          label: 'Palavra-chave',
          type: 'text',
        },
      ],
    },
    {
      name: 'scripts',
      label: 'Scripts',
      type: 'array',
      required: false,
      admin: {
        width: '25%',
        initCollapsed: true,
        components: {
          RowLabel: ({ data, index }: RowLabelArgs) => {
            return data?.referencia || `Script ${String(index).padStart(2, '0')}`;
          },
        },
      },
      fields: [
        { name: 'referencia', label: 'Referência', type: 'text', required: true },
        {
          name: 'script',
          label: 'Script',
          type: 'textarea',
          required: true,
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
    delete: admins,
  },
};